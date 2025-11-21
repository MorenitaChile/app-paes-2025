/**
 * Progressive Practice Demo Page
 * Demonstrates the progressive exercise system with sample questions
 */

'use client';

import { useState } from 'react';
import ProgressiveExercise from '@/components/ProgressiveExercise';
import FeedbackDashboard from '@/components/FeedbackDashboard';
import { ecuacionesBasico, ecuacionesIntermedio, localizarBasico, interpretarBasico, logaritmosBasico, celulasBasico } from '@/data/progressiveQuestions';
import { generateFeedback, QuestionResult } from '@/lib/feedbackGenerator';
import { calculatePAESScore } from '@/lib/scoreCalculator';
import styles from './page.module.css';

export default function ProgressivePracticePage() {
    const [selectedSet, setSelectedSet] = useState<string>('m1-ecuaciones-basico');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [results, setResults] = useState<QuestionResult[]>([]);
    const [showFeedback, setShowFeedback] = useState(false);

    // Question sets
    const questionSets: Record<string, any[]> = {
        'm1-ecuaciones-basico': ecuacionesBasico,
        'm1-ecuaciones-intermedio': ecuacionesIntermedio,
        'lectora-localizar-basico': localizarBasico,
        'lectora-interpretar-basico': interpretarBasico,
        'm2-logaritmos-basico': logaritmosBasico,
        'ciencias-celulas-basico': celulasBasico
    };

    const currentQuestions = questionSets[selectedSet] || [];
    const currentQuestion = currentQuestions[currentQuestionIndex];

    const handleAnswer = (isCorrect: boolean, timeSpent: number) => {
        const result: QuestionResult = {
            question: currentQuestion,
            isCorrect,
            timeSpent
        };

        const newResults = [...results, result];
        setResults(newResults);

        // Move to next question or show feedback
        if (currentQuestionIndex < currentQuestions.length - 1) {
            setTimeout(() => {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            }, 2000);
        } else {
            setTimeout(() => {
                setShowFeedback(true);
            }, 2000);
        }
    };

    const handleReset = () => {
        setCurrentQuestionIndex(0);
        setResults([]);
        setShowFeedback(false);
    };

    const handleChangeSet = (setId: string) => {
        setSelectedSet(setId);
        handleReset();
    };

    // Calculate PAES score if applicable
    const getSubjectFromSet = (setId: string): 'lectora' | 'm1' | 'm2' | 'ciencias' => {
        if (setId.startsWith('lectora')) return 'lectora';
        if (setId.startsWith('m1')) return 'm1';
        if (setId.startsWith('m2')) return 'm2';
        return 'ciencias';
    };

    const subject = getSubjectFromSet(selectedSet);
    const correctCount = results.filter(r => r.isCorrect).length;
    const paesScore = results.length > 0 ? calculatePAESScore(correctCount, subject) : undefined;

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>🎯 Práctica Progresiva PAES</h1>
                <p>Sistema de ejercicios con análisis de errores y retroalimentación automática</p>
            </header>

            {/* Question Set Selector */}
            <div className={styles.selector}>
                <label htmlFor="questionSet">Selecciona un conjunto de ejercicios:</label>
                <select
                    id="questionSet"
                    value={selectedSet}
                    onChange={(e) => handleChangeSet(e.target.value)}
                    className={styles.select}
                >
                    <optgroup label="Matemática M1">
                        <option value="m1-ecuaciones-basico">Ecuaciones - Nivel Básico (5 ejercicios)</option>
                        <option value="m1-ecuaciones-intermedio">Ecuaciones - Nivel Intermedio (5 ejercicios)</option>
                    </optgroup>
                    <optgroup label="Matemática M2">
                        <option value="m2-logaritmos-basico">Logaritmos - Nivel Básico (5 ejercicios)</option>
                    </optgroup>
                    <optgroup label="Competencia Lectora">
                        <option value="lectora-localizar-basico">Localizar - Nivel Básico (5 ejercicios)</option>
                        <option value="lectora-interpretar-basico">Interpretar - Nivel Básico (5 ejercicios)</option>
                    </optgroup>
                    <optgroup label="Ciencias">
                        <option value="ciencias-celulas-basico">Biología Celular - Nivel Básico (5 ejercicios)</option>
                    </optgroup>
                </select>
            </div>

            {/* Progress Indicator */}
            {!showFeedback && (
                <div className={styles.progress}>
                    <div className={styles.progressBar}>
                        <div
                            className={styles.progressFill}
                            style={{ width: `${((currentQuestionIndex + 1) / currentQuestions.length) * 100}%` }}
                        />
                    </div>
                    <div className={styles.progressText}>
                        Pregunta {currentQuestionIndex + 1} de {currentQuestions.length}
                    </div>
                </div>
            )}

            {/* Question Display */}
            {!showFeedback && currentQuestion && (
                <ProgressiveExercise
                    question={currentQuestion}
                    onAnswer={handleAnswer}
                    showStrategy={true}
                />
            )}

            {/* Feedback Display */}
            {showFeedback && results.length > 0 && (
                <div>
                    <FeedbackDashboard
                        feedback={generateFeedback(results, subject)}
                        subject={subject}
                        paesScore={paesScore}
                    />
                    <div className={styles.actions}>
                        <button onClick={handleReset} className={styles.resetButton}>
                            🔄 Reintentar este conjunto
                        </button>
                        <button
                            onClick={() => {
                                const sets = Object.keys(questionSets);
                                const currentIndex = sets.indexOf(selectedSet);
                                const nextIndex = (currentIndex + 1) % sets.length;
                                handleChangeSet(sets[nextIndex]);
                            }}
                            className={styles.nextButton}
                        >
                            ➡️ Siguiente conjunto
                        </button>
                    </div>
                </div>
            )}

            {/* Info Panel */}
            <div className={styles.infoPanel}>
                <h3>💡 Características del Sistema</h3>
                <ul>
                    <li>✅ <strong>Ejercicios Progresivos:</strong> Básico → Intermedio → Avanzado</li>
                    <li>✅ <strong>Análisis de Errores:</strong> Explicación detallada de errores comunes</li>
                    <li>✅ <strong>Estrategias de Resolución:</strong> Tips probados para cada tipo de problema</li>
                    <li>✅ <strong>Timer Integrado:</strong> Tiempo recomendado por ejercicio</li>
                    <li>✅ <strong>Retroalimentación Automática:</strong> Análisis de desempeño y recomendaciones</li>
                    <li>✅ <strong>Cálculo de Puntaje PAES:</strong> Estimación basada en tablas oficiales DEMRE</li>
                </ul>
            </div>
        </div>
    );
}
