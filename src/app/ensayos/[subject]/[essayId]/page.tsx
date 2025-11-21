"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ESSAY_BANK } from "@/data/questions";
import { TOPIC_CONTENT } from "@/data/content";
import { scoreMultipleChoice, calculatePAESScore } from "@/lib/scoring";
import styles from "./page.module.css";

export default function EssayRunner() {
    const params = useParams();
    const router = useRouter();
    const subject = params.subject as string;
    const essayId = params.essayId as string;

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [results, setResults] = useState<any>(null);
    const [timeRemaining, setTimeRemaining] = useState(0);

    const essays = ESSAY_BANK[subject] || [];
    const currentEssay = essays.find(e => e.id === essayId);

    useEffect(() => {
        if (currentEssay) {
            setTimeRemaining(currentEssay.timeLimit * 60);
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
                <p>No se encontró el ensayo solicitado.</p>
            </div>
        );
    }

    const currentQuestion = currentEssay.questions[currentQuestionIndex];
    const topicContent = TOPIC_CONTENT[currentQuestion.topic];
    const totalQuestions = currentEssay.questions.length;

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleAnswerChange = (optionIndex: number) => {
        setAnswers({ ...answers, [currentQuestionIndex]: optionIndex });
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
        let correctCount = 0;
        const questionResults = currentEssay.questions.map((question, index) => {
            const userAnswer = answers[index];
            const safeUserAnswer = userAnswer !== undefined ? userAnswer : -1;
            const safeCorrectAnswer = typeof question.correctAnswer === 'number' ? question.correctAnswer : -1;

            const score = scoreMultipleChoice(safeUserAnswer, safeCorrectAnswer);
            if (score === 1) correctCount++;

            return {
                questionId: question.id,
                isCorrect: score === 1,
                userAnswer: safeUserAnswer,
                correctAnswer: safeCorrectAnswer,
                solution: question.solution
            };
        });

        const paesScore = calculatePAESScore(subject, correctCount);

        const resultData = {
            questionResults,
            correctCount,
            totalQuestions,
            paesScore
        };

        setResults(resultData);
        setIsSubmitted(true);

        fetch('/api/essays/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                essayId: currentEssay.id,
                subject: currentEssay.subject,
                score: paesScore,
                correctAnswers: correctCount,
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
                        <p>{results.correctCount} correctas de {results.totalQuestions} preguntas</p>
                    </div>

                    <div className={styles.questionsList}>
                        {results.questionResults.map((result: any, index: number) => (
                            <div key={index} className={`${styles.questionResult} ${result.isCorrect ? styles.correct : styles.incorrect}`}>
                                <h3>Pregunta {index + 1}</h3>
                                <p>
                                    <strong>Tu respuesta:</strong> {currentEssay.questions[index].options?.[result.userAnswer] || 'Sin responder'}
                                </p>
                                {!result.isCorrect && (
                                    <p>
                                        <strong>Respuesta correcta:</strong> {currentEssay.questions[index].options?.[result.correctAnswer]}
                                    </p>
                                )}
                                <p className={styles.solution}>
                                    <strong>Explicación:</strong> {result.solution}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className={styles.actions}>
                        <button className="btn" onClick={() => router.push(`/ensayos/${subject}`)}>
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

                    {topicContent && (topicContent.strategies || topicContent.commonErrors) && (
                        <details className={styles.strategies}>
                            <summary>🧠 Estrategias y Errores Comunes</summary>
                            <div className={styles.strategyContent}>
                                {topicContent.strategies && (
                                    <div className={styles.strategyBlock}>
                                        <strong>Estrategias:</strong>
                                        <ul>
                                            {topicContent.strategies.map((s, i) => <li key={i}>{s}</li>)}
                                        </ul>
                                    </div>
                                )}
                                {topicContent.commonErrors && (
                                    <div className={styles.strategyBlock}>
                                        <strong>Errores Comunes:</strong>
                                        <ul>
                                            {topicContent.commonErrors.map((e, i) => <li key={i}>{e}</li>)}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </details>
                    )}
                </div>

                <div className={styles.optionsList}>
                    {currentQuestion.options?.map((option, index) => (
                        <label key={index} className={styles.optionLabel}>
                            <input
                                type="radio"
                                name={`question-${currentQuestionIndex}`}
                                value={index}
                                checked={answers[currentQuestionIndex] === index}
                                onChange={() => handleAnswerChange(index)}
                            />
                            <span className={styles.optionText}>{option}</span>
                        </label>
                    ))}
                </div>

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
