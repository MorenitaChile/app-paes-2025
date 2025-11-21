/**
 * ProgressiveExercise Component
 * Displays a single exercise with timer, strategy hints, and error analysis
 */

'use client';

import { useState, useEffect } from 'react';
import { Question } from '@/data/questions';
import styles from './ProgressiveExercise.module.css';

type Props = {
    question: Question;
    onAnswer: (isCorrect: boolean, timeSpent: number) => void;
    showStrategy?: boolean;
};

export default function ProgressiveExercise({ question, onAnswer, showStrategy = false }: Props) {
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [hasAnswered, setHasAnswered] = useState(false);
    const [timeSpent, setTimeSpent] = useState(0);
    const [showStrategyHint, setShowStrategyHint] = useState(false);
    const [showErrorAnalysis, setShowErrorAnalysis] = useState(false);

    // Timer
    useEffect(() => {
        if (!hasAnswered) {
            const interval = setInterval(() => {
                setTimeSpent(prev => prev + 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [hasAnswered]);

    const handleSubmit = () => {
        if (selectedOption === null) return;

        const isCorrect = selectedOption === question.correctAnswer;
        setHasAnswered(true);

        if (!isCorrect) {
            setShowErrorAnalysis(true);
        }

        onAnswer(isCorrect, timeSpent);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const getDifficultyColor = (level?: string) => {
        switch (level) {
            case 'basico': return '#4CAF50';
            case 'intermedio': return '#FF9800';
            case 'avanzado': return '#F44336';
            default: return '#757575';
        }
    };

    const getDifficultyLabel = (level?: string) => {
        switch (level) {
            case 'basico': return 'Básico';
            case 'intermedio': return 'Intermedio';
            case 'avanzado': return 'Avanzado';
            default: return '';
        }
    };

    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.metadata}>
                    {question.difficultyLevel && (
                        <span
                            className={styles.difficulty}
                            style={{ backgroundColor: getDifficultyColor(question.difficultyLevel) }}
                        >
                            {getDifficultyLabel(question.difficultyLevel)}
                        </span>
                    )}
                    <span className={styles.timer}>⏱️ {formatTime(timeSpent)}</span>
                    {question.timeRecommended && (
                        <span className={styles.recommended}>
                            Tiempo recomendado: {Math.floor(question.timeRecommended / 60)}:{(question.timeRecommended % 60).toString().padStart(2, '0')}
                        </span>
                    )}
                </div>
            </div>

            {/* Question */}
            <div className={styles.questionText}>
                {question.text.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                ))}
            </div>

            {/* Options */}
            <div className={styles.options}>
                {question.options?.map((option, index) => (
                    <button
                        key={index}
                        className={`${styles.option} ${selectedOption === index ? styles.selected : ''
                            } ${hasAnswered && index === question.correctAnswer ? styles.correct : ''
                            } ${hasAnswered && selectedOption === index && index !== question.correctAnswer ? styles.incorrect : ''
                            }`}
                        onClick={() => !hasAnswered && setSelectedOption(index)}
                        disabled={hasAnswered}
                    >
                        <span className={styles.optionLetter}>{String.fromCharCode(65 + index)}</span>
                        <span className={styles.optionText}>{option}</span>
                    </button>
                ))}
            </div>

            {/* Strategy Button */}
            {showStrategy && question.strategy && !hasAnswered && (
                <div className={styles.strategySection}>
                    <button
                        className={styles.strategyButton}
                        onClick={() => setShowStrategyHint(!showStrategyHint)}
                    >
                        💡 {showStrategyHint ? 'Ocultar' : 'Ver'} Estrategia
                    </button>
                    {showStrategyHint && (
                        <div className={styles.strategyHint}>
                            <strong>💡 Estrategia:</strong> {question.strategy}
                        </div>
                    )}
                </div>
            )}

            {/* Submit Button */}
            {!hasAnswered && (
                <button
                    className={styles.submitButton}
                    onClick={handleSubmit}
                    disabled={selectedOption === null}
                >
                    Responder
                </button>
            )}

            {/* Solution */}
            {hasAnswered && question.solution && (
                <div className={styles.solution}>
                    <h4>✅ Solución:</h4>
                    <p>{question.solution}</p>
                </div>
            )}

            {/* Error Analysis */}
            {hasAnswered && showErrorAnalysis && question.errorAnalysis && question.errorAnalysis.length > 0 && (
                <div className={styles.errorAnalysis}>
                    <h4>⚠️ Análisis de Error</h4>
                    {question.errorAnalysis.map((error, index) => (
                        <div key={index} className={styles.errorItem}>
                            <div className={styles.errorTitle}>
                                <strong>Error Común:</strong> {error.commonMistake}
                            </div>
                            <div className={styles.errorExplanation}>
                                <strong>📖 Explicación:</strong> {error.explanation}
                            </div>
                            <div className={styles.errorPrevention}>
                                <strong>💡 Tip de Prevención:</strong> {error.preventionTip}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
