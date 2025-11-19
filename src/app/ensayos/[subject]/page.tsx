"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ESSAY_BANK } from "@/data/questions";
import { scoreOpenEndedResponse, scoreProblemSolving, convertToPAESScale } from "@/lib/scoring";
import styles from "./page.module.css";

export default function EssayRunner() {
    const params = useParams();
    const router = useRouter();
    const subject = params.subject as string;

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [results, setResults] = useState<any>(null);
    const [timeRemaining, setTimeRemaining] = useState(0);

    const essays = ESSAY_BANK[subject] || [];
    const currentEssay = essays[0]; // For now, use first essay

    useEffect(() => {
        if (currentEssay) {
            setTimeRemaining(currentEssay.timeLimit * 60); // Convert to seconds
        }
    }, [currentEssay]);

    useEffect(() => {
        if (timeRemaining > 0 && !isSubmitted) {
            const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [timeRemaining, isSubmitted]);

    if (!currentEssay) {
        return (
            <div className={styles.container}>
                <p>No hay ensayos disponibles para este temario.</p>
            </div>
        );
    }

    const currentQuestion = currentEssay.questions[currentQuestionIndex];
    const totalQuestions = currentEssay.questions.length;

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleAnswerChange = (value: string) => {
        setAnswers({ ...answers, [currentQuestionIndex]: value });
    };

    const handleNext = () => {
        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSubmit = () => {
        // Score all answers
        const questionResults = currentEssay.questions.map((question, index) => {
            const userAnswer = answers[index] || '';

            if (question.type === 'open-ended') {
                return scoreOpenEndedResponse(question, userAnswer);
            } else if (question.type === 'problem-solving') {
                return scoreProblemSolving(question, userAnswer);
            }

            return null;
        });

        const totalScore = questionResults.reduce((sum, r) => sum + (r?.score || 0), 0);
        const totalMax = questionResults.reduce((sum, r) => sum + (r?.maxScore || 0), 0);
        const paesScore = convertToPAESScale(totalScore, totalMax);

        const resultData = {
            questionResults,
            totalScore,
            totalMax,
            paesScore,
            percentage: (totalScore / totalMax) * 100
        };

        setResults(resultData);
        setIsSubmitted(true);

        // Save to backend
        fetch('/api/essays/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                essayId: currentEssay.id,
                subject: currentEssay.subject,
                score: paesScore,
                correctAnswers: questionResults.filter(r => r && r.score === r.maxScore).length,
                totalQuestions: totalQuestions,
                answers: answers
            })
        }).catch(err => console.error('Failed to save results:', err));
    };

    if (isSubmitted && results) {
        return (
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Resultados del Ensayo</h1>
                </header>

                <div className={styles.resultsCard}>
                    <div className={styles.scoreDisplay}>
                        <h2>Puntaje PAES</h2>
                        <div className={styles.bigScore}>{results.paesScore}</div>
                        <p>{results.totalScore} / {results.totalMax} puntos ({Math.round(results.percentage)}%)</p>
                    </div>

                    {results.questionResults.map((result: any, index: number) => (
                        result && (
                            <div key={index} className={styles.questionResult}>
                                <h3>Pregunta {index + 1}</h3>
                                <p className={styles.questionScore}>
                                    {result.score} / {result.maxScore} puntos
                                </p>
                                <p className={styles.feedback}>{result.overallFeedback}</p>

                                {result.strengths.length > 0 && (
                                    <div className={styles.strengths}>
                                        <strong>Fortalezas:</strong>
                                        <ul>
                                            {result.strengths.map((s: string, i: number) => (
                                                <li key={i}>{s}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {result.improvements.length > 0 && (
                                    <div className={styles.improvements}>
                                        <strong>Áreas de mejora:</strong>
                                        <ul>
                                            {result.improvements.map((imp: string, i: number) => (
                                                <li key={i}>{imp}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )
                    ))}

                    <div className={styles.actions}>
                        <button className="btn" onClick={() => router.push('/ensayos')}>
                            Volver a Ensayos
                        </button>
                        <button className="btn btn-primary" onClick={() => window.location.reload()}>
                            Intentar de Nuevo
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>{currentEssay.title}</h1>
                <div className={styles.timer} style={{ color: timeRemaining < 300 ? 'var(--error)' : undefined }}>
                    {formatTime(timeRemaining)}
                </div>
            </header>

            <div className={styles.progress}>
                Pregunta {currentQuestionIndex + 1} de {totalQuestions}
            </div>

            <div className={styles.questionCard}>
                <div className={styles.questionText}>
                    <strong>Pregunta {currentQuestionIndex + 1}:</strong>
                    <p style={{ whiteSpace: 'pre-wrap' }}>{currentQuestion.text}</p>
                    {currentQuestion.hints && currentQuestion.hints.length > 0 && (
                        <details className={styles.hints}>
                            <summary>💡 Ver pistas</summary>
                            <ul>
                                {currentQuestion.hints.map((hint, i) => (
                                    <li key={i}>{hint}</li>
                                ))}
                            </ul>
                        </details>
                    )}
                </div>

                <textarea
                    className={styles.inputArea}
                    placeholder="Escribe tu desarrollo y respuesta aquí..."
                    value={answers[currentQuestionIndex] || ''}
                    onChange={(e) => handleAnswerChange(e.target.value)}
                />

                <div className={styles.actions}>
                    <button
                        className="btn"
                        onClick={handlePrevious}
                        disabled={currentQuestionIndex === 0}
                    >
                        ← Anterior
                    </button>

                    {currentQuestionIndex < totalQuestions - 1 ? (
                        <button className="btn btn-primary" onClick={handleNext}>
                            Siguiente →
                        </button>
                    ) : (
                        <button className="btn btn-primary" onClick={handleSubmit}>
                            Finalizar Ensayo
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
