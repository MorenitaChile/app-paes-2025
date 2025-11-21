/**
 * Simulation Results Component
 * Displays comprehensive results after completing a simulation
 */

'use client';

import { SimulationResult } from '@/lib/simulationCalculator';
import { formatTime } from '@/lib/simulationCalculator';
import styles from './SimulationResults.module.css';

type SimulationResultsProps = {
    result: SimulationResult;
    onReview?: () => void;
    onRetry?: () => void;
};

export default function SimulationResults({ result, onReview, onRetry }: SimulationResultsProps) {
    const accuracyPercentage = Math.round((result.correctAnswers / result.validQuestions) * 100);
    const completionPercentage = Math.round((result.answeredQuestions / result.validQuestions) * 100);

    const timeUsedPercentage = Math.round((result.timeSpent / (result.timeLimit * 60)) * 100);

    return (
        <div className={styles.container}>
            {/* Header with main score */}
            <div className={styles.header}>
                <div className={styles.scoreCircle}>
                    <div className={styles.scoreValue}>{result.paesScore}</div>
                    <div className={styles.scoreLabel}>Puntaje PAES</div>
                </div>
                <div className={styles.headerInfo}>
                    <h2>¡Simulacro Completado!</h2>
                    <div className={styles.performanceLevel}>
                        Nivel: <strong>{result.performanceLevel}</strong>
                    </div>
                    <div className={styles.percentile}>
                        Percentil estimado: <strong>{result.percentile}</strong>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className={styles.quickStats}>
                <div className={styles.statCard}>
                    <div className={styles.statIcon}>✅</div>
                    <div className={styles.statValue}>{result.correctAnswers}</div>
                    <div className={styles.statLabel}>Correctas</div>
                    <div className={styles.statSubtext}>de {result.validQuestions} válidas</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIcon}>❌</div>
                    <div className={styles.statValue}>{result.incorrectAnswers}</div>
                    <div className={styles.statLabel}>Incorrectas</div>
                    <div className={styles.statSubtext}>{accuracyPercentage}% precisión</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIcon}>⏱️</div>
                    <div className={styles.statValue}>{formatTime(result.timeSpent)}</div>
                    <div className={styles.statLabel}>Tiempo Total</div>
                    <div className={styles.statSubtext}>{timeUsedPercentage}% del límite</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIcon}>📝</div>
                    <div className={styles.statValue}>{result.answeredQuestions}</div>
                    <div className={styles.statLabel}>Respondidas</div>
                    <div className={styles.statSubtext}>{completionPercentage}% completado</div>
                </div>
            </div>

            {/* Detailed Analysis */}
            <div className={styles.analysis}>
                <h3>Análisis Detallado</h3>

                <div className={styles.analysisSection}>
                    <div className={styles.analysisHeader}>
                        <span>Precisión General</span>
                        <span className={styles.percentage}>{accuracyPercentage}%</span>
                    </div>
                    <div className={styles.progressBar}>
                        <div
                            className={styles.progressFill}
                            style={{ width: `${accuracyPercentage}%` }}
                        />
                    </div>
                </div>

                <div className={styles.analysisSection}>
                    <div className={styles.analysisHeader}>
                        <span>Completitud</span>
                        <span className={styles.percentage}>{completionPercentage}%</span>
                    </div>
                    <div className={styles.progressBar}>
                        <div
                            className={styles.progressFill}
                            style={{ width: `${completionPercentage}%` }}
                        />
                    </div>
                    {result.unanswered > 0 && (
                        <div className={styles.warning}>
                            ⚠️ {result.unanswered} preguntas sin responder
                        </div>
                    )}
                </div>

                <div className={styles.analysisSection}>
                    <div className={styles.analysisHeader}>
                        <span>Uso del Tiempo</span>
                        <span className={styles.percentage}>{timeUsedPercentage}%</span>
                    </div>
                    <div className={styles.progressBar}>
                        <div
                            className={styles.progressFill}
                            style={{ width: `${timeUsedPercentage}%` }}
                        />
                    </div>
                    <div className={styles.timeDetails}>
                        Tiempo promedio por pregunta: {formatTime(Math.floor(result.timeSpent / result.answeredQuestions))}
                    </div>
                </div>
            </div>

            {/* Score Interpretation */}
            <div className={styles.interpretation}>
                <h3>Interpretación del Puntaje</h3>
                <div className={styles.interpretationContent}>
                    <p>
                        Tu puntaje de <strong>{result.paesScore} puntos</strong> te ubica en el percentil <strong>{result.percentile}</strong>,
                        lo que significa que superaste aproximadamente al <strong>{result.percentile}%</strong> de los estudiantes.
                    </p>
                    {result.paesScore >= 700 && (
                        <div className={styles.successMessage}>
                            🎉 ¡Excelente resultado! Este puntaje es competitivo para la mayoría de las carreras universitarias.
                        </div>
                    )}
                    {result.paesScore >= 500 && result.paesScore < 700 && (
                        <div className={styles.infoMessage}>
                            👍 Buen resultado. Con más práctica puedes mejorar aún más tu puntaje.
                        </div>
                    )}
                    {result.paesScore < 500 && (
                        <div className={styles.warningMessage}>
                            💪 Hay espacio para mejorar. Revisa tus errores y practica los temas más débiles.
                        </div>
                    )}
                </div>
            </div>

            {/* Action Buttons */}
            <div className={styles.actions}>
                {onReview && (
                    <button onClick={onReview} className={styles.reviewButton}>
                        📋 Revisar Respuestas
                    </button>
                )}
                {onRetry && (
                    <button onClick={onRetry} className={styles.retryButton}>
                        🔄 Reintentar Simulacro
                    </button>
                )}
            </div>

            {/* Note about pilot questions */}
            <div className={styles.note}>
                <strong>Nota:</strong> Este simulacro incluye {result.totalQuestions - result.validQuestions} preguntas de pilotaje
                que NO cuentan para el puntaje, simulando el formato oficial DEMRE.
            </div>
        </div>
    );
}
