/**
 * Question Navigator Component
 * Visual map of all questions with navigation
 */

'use client';

import styles from './QuestionNavigator.module.css';

type QuestionStatus = 'unanswered' | 'answered' | 'current' | 'marked';

type QuestionNavigatorProps = {
    totalQuestions: number;
    currentQuestion: number;
    answeredQuestions: Set<number>;
    markedQuestions: Set<number>;
    onNavigate: (index: number) => void;
};

export default function QuestionNavigator({
    totalQuestions,
    currentQuestion,
    answeredQuestions,
    markedQuestions,
    onNavigate
}: QuestionNavigatorProps) {
    const getQuestionStatus = (index: number): QuestionStatus => {
        if (index === currentQuestion) return 'current';
        if (markedQuestions.has(index)) return 'marked';
        if (answeredQuestions.has(index)) return 'answered';
        return 'unanswered';
    };

    const answeredCount = answeredQuestions.size;
    const unansweredCount = totalQuestions - answeredCount;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3>Navegación de Preguntas</h3>
                <div className={styles.stats}>
                    <div className={styles.stat}>
                        <span className={styles.statValue}>{answeredCount}</span>
                        <span className={styles.statLabel}>Respondidas</span>
                    </div>
                    <div className={styles.stat}>
                        <span className={styles.statValue}>{unansweredCount}</span>
                        <span className={styles.statLabel}>Sin responder</span>
                    </div>
                </div>
            </div>

            <div className={styles.grid}>
                {Array.from({ length: totalQuestions }, (_, index) => {
                    const status = getQuestionStatus(index);
                    return (
                        <button
                            key={index}
                            className={`${styles.questionButton} ${styles[status]}`}
                            onClick={() => onNavigate(index)}
                            aria-label={`Pregunta ${index + 1}`}
                        >
                            {index + 1}
                        </button>
                    );
                })}
            </div>

            <div className={styles.legend}>
                <div className={styles.legendItem}>
                    <div className={`${styles.legendBox} ${styles.current}`}></div>
                    <span>Actual</span>
                </div>
                <div className={styles.legendItem}>
                    <div className={`${styles.legendBox} ${styles.answered}`}></div>
                    <span>Respondida</span>
                </div>
                <div className={styles.legendItem}>
                    <div className={`${styles.legendBox} ${styles.unanswered}`}></div>
                    <span>Sin responder</span>
                </div>
                <div className={styles.legendItem}>
                    <div className={`${styles.legendBox} ${styles.marked}`}></div>
                    <span>Marcada</span>
                </div>
            </div>
        </div>
    );
}
