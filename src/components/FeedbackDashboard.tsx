/**
 * FeedbackDashboard Component
 * Displays comprehensive feedback with performance analysis and recommendations
 */

'use client';

import { Feedback } from '@/lib/feedbackGenerator';
import styles from './FeedbackDashboard.module.css';
import Link from 'next/link';

type Props = {
    feedback: Feedback;
    subject: string;
    paesScore?: number;
};

export default function FeedbackDashboard({ feedback, subject, paesScore }: Props) {
    const getPerformanceColor = (percentage: number) => {
        if (percentage >= 85) return '#4CAF50';
        if (percentage >= 70) return '#8BC34A';
        if (percentage >= 50) return '#FF9800';
        return '#F44336';
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'alta': return '#F44336';
            case 'media': return '#FF9800';
            case 'baja': return '#2196F3';
            default: return '#757575';
        }
    };

    return (
        <div className={styles.container}>
            {/* Overall Score */}
            <div className={styles.overallSection}>
                <h2>📊 Resumen General</h2>
                <div className={styles.scoreGrid}>
                    <div className={styles.scoreCard}>
                        <div className={styles.scoreLabel}>Puntaje</div>
                        <div className={styles.scoreValue} style={{ color: getPerformanceColor(feedback.overallScore) }}>
                            {feedback.overallScore}%
                        </div>
                        <div className={styles.scoreSubtext}>
                            {feedback.correctAnswers} / {feedback.totalQuestions} correctas
                        </div>
                    </div>
                    {paesScore && (
                        <div className={styles.scoreCard}>
                            <div className={styles.scoreLabel}>Puntaje PAES Estimado</div>
                            <div className={styles.scoreValue} style={{ color: '#2196F3' }}>
                                {paesScore}
                            </div>
                            <div className={styles.scoreSubtext}>
                                Escala 100-1000
                            </div>
                        </div>
                    )}
                    {feedback.averageTimePerQuestion && (
                        <div className={styles.scoreCard}>
                            <div className={styles.scoreLabel}>Tiempo Promedio</div>
                            <div className={styles.scoreValue}>
                                {Math.floor(feedback.averageTimePerQuestion / 60)}:{(feedback.averageTimePerQuestion % 60).toString().padStart(2, '0')}
                            </div>
                            <div className={styles.scoreSubtext}>
                                por pregunta
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Strengths */}
            {feedback.strengthAreas.length > 0 && (
                <div className={styles.section}>
                    <h3>✅ Fortalezas</h3>
                    <div className={styles.areasList}>
                        {feedback.strengthAreas.map((area, index) => (
                            <div key={index} className={styles.areaCard} style={{ borderColor: getPerformanceColor(area.percentage) }}>
                                <div className={styles.areaHeader}>
                                    <span className={styles.areaTitle}>{area.axisTitle}</span>
                                    <span className={styles.areaPercentage} style={{ color: getPerformanceColor(area.percentage) }}>
                                        {area.percentage}%
                                    </span>
                                </div>
                                <div className={styles.areaProgress}>
                                    <div
                                        className={styles.areaProgressBar}
                                        style={{
                                            width: `${area.percentage}%`,
                                            backgroundColor: getPerformanceColor(area.percentage)
                                        }}
                                    />
                                </div>
                                <div className={styles.areaSubtext}>
                                    {area.correctAnswers} / {area.totalQuestions} correctas
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Weaknesses */}
            {feedback.weaknessAreas.length > 0 && (
                <div className={styles.section}>
                    <h3>⚠️ Áreas de Mejora</h3>
                    <div className={styles.areasList}>
                        {feedback.weaknessAreas.map((area, index) => (
                            <div key={index} className={styles.areaCard} style={{ borderColor: getPerformanceColor(area.percentage) }}>
                                <div className={styles.areaHeader}>
                                    <span className={styles.areaTitle}>{area.axisTitle}</span>
                                    <span className={styles.areaPercentage} style={{ color: getPerformanceColor(area.percentage) }}>
                                        {area.percentage}%
                                    </span>
                                </div>
                                <div className={styles.areaProgress}>
                                    <div
                                        className={styles.areaProgressBar}
                                        style={{
                                            width: `${area.percentage}%`,
                                            backgroundColor: getPerformanceColor(area.percentage)
                                        }}
                                    />
                                </div>
                                <div className={styles.areaSubtext}>
                                    {area.correctAnswers} / {area.totalQuestions} correctas
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Difficulty Analysis */}
            {feedback.difficultyAnalysis.length > 0 && (
                <div className={styles.section}>
                    <h3>📈 Análisis por Dificultad</h3>
                    <div className={styles.difficultyGrid}>
                        {feedback.difficultyAnalysis.map((diff, index) => (
                            <div key={index} className={styles.difficultyCard}>
                                <div className={styles.difficultyLabel}>
                                    {diff.level === 'basico' ? '🟢 Básico' : diff.level === 'intermedio' ? '🟡 Intermedio' : '🔴 Avanzado'}
                                </div>
                                <div className={styles.difficultyPercentage} style={{ color: getPerformanceColor(diff.percentage) }}>
                                    {diff.percentage}%
                                </div>
                                <div className={styles.difficultySubtext}>
                                    {diff.correctAnswers} / {diff.totalQuestions}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Common Errors */}
            {feedback.commonErrors.length > 0 && (
                <div className={styles.section}>
                    <h3>❌ Errores Comunes Detectados</h3>
                    <ul className={styles.errorsList}>
                        {feedback.commonErrors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Recommendations */}
            {feedback.recommendations.length > 0 && (
                <div className={styles.section}>
                    <h3>📚 Recomendaciones</h3>
                    <div className={styles.recommendationsList}>
                        {feedback.recommendations.map((rec, index) => (
                            <div key={index} className={styles.recommendationCard}>
                                <div className={styles.recommendationHeader}>
                                    <span
                                        className={styles.priority}
                                        style={{ backgroundColor: getPriorityColor(rec.priority) }}
                                    >
                                        Prioridad {rec.priority.toUpperCase()}
                                    </span>
                                    <span className={styles.recommendationArea}>{rec.area}</span>
                                </div>
                                <div className={styles.recommendationAction}>
                                    {rec.action}
                                </div>
                                {rec.resources.length > 0 && (
                                    <div className={styles.recommendationResources}>
                                        {rec.resources.map((resource, idx) => (
                                            <Link key={idx} href={resource} className={styles.resourceLink}>
                                                Ir al material →
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Study Plan */}
            {feedback.studyPlan.length > 0 && (
                <div className={styles.section}>
                    <h3>📅 Plan de Estudio Sugerido</h3>
                    <ol className={styles.studyPlanList}>
                        {feedback.studyPlan.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ol>
                </div>
            )}
        </div>
    );
}
