/**
 * Simulation Engine Component
 * Main component that manages the entire simulation flow
 */

'use client';

import { useState, useEffect } from 'react';
import { Simulation, Question } from '@/data/questions';
import { calculateSimulationResult, SimulationResult } from '@/lib/simulationCalculator';
import SimulationTimer from './SimulationTimer';
import QuestionNavigator from './QuestionNavigator';
import SimulationResults from './SimulationResults';
import styles from './SimulationEngine.module.css';

type SimulationEngineProps = {
    simulation: Simulation;
    onExit?: () => void;
};

export default function SimulationEngine({ simulation, onExit }: SimulationEngineProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<(number | null)[]>(
        new Array(simulation.questions.length).fill(null)
    );
    const [markedQuestions, setMarkedQuestions] = useState<Set<number>>(new Set());
    const [showResults, setShowResults] = useState(false);
    const [result, setResult] = useState<SimulationResult | null>(null);
    const [startTime] = useState(Date.now());
    const [showNavigator, setShowNavigator] = useState(false);
    const [showConfirmFinish, setShowConfirmFinish] = useState(false);

    const currentQuestion = simulation.questions[currentQuestionIndex];
    const answeredQuestions = new Set(
        userAnswers.map((answer, index) => answer !== null ? index : -1).filter(i => i !== -1)
    );

    const handleAnswer = (optionIndex: number) => {
        const newAnswers = [...userAnswers];
        newAnswers[currentQuestionIndex] = optionIndex;
        setUserAnswers(newAnswers);
    };

    const handleNext = () => {
        if (currentQuestionIndex < simulation.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleNavigate = (index: number) => {
        setCurrentQuestionIndex(index);
        setShowNavigator(false);
    };

    const toggleMark = () => {
        const newMarked = new Set(markedQuestions);
        if (newMarked.has(currentQuestionIndex)) {
            newMarked.delete(currentQuestionIndex);
        } else {
            newMarked.add(currentQuestionIndex);
        }
        setMarkedQuestions(newMarked);
    };

    const handleFinish = () => {
        const timeSpent = Math.floor((Date.now() - startTime) / 1000);
        const calculatedResult = calculateSimulationResult(
            simulation.id,
            simulation.subject,
            simulation.questions,
            simulation.pilotIndices,
            userAnswers,
            timeSpent,
            simulation.timeLimit
        );
        setResult(calculatedResult);
        setShowResults(true);
        setShowConfirmFinish(false);
    };

    const handleTimeUp = () => {
        handleFinish();
    };

    const handleRetry = () => {
        setCurrentQuestionIndex(0);
        setUserAnswers(new Array(simulation.questions.length).fill(null));
        setMarkedQuestions(new Set());
        setShowResults(false);
        setResult(null);
    };

    // Show results view
    if (showResults && result) {
        return (
            <SimulationResults
                result={result}
                onRetry={handleRetry}
                onReview={() => {
                    setShowResults(false);
                    setCurrentQuestionIndex(0);
                }}
            />
        );
    }

    return (
        <div className={styles.container}>
            {/* Header with timer and controls */}
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <h1 className={styles.title}>{simulation.title}</h1>
                    <div className={styles.subtitle}>
                        Pregunta {currentQuestionIndex + 1} de {simulation.totalQuestions}
                    </div>
                </div>
                <div className={styles.headerRight}>
                    <SimulationTimer
                        totalMinutes={simulation.timeLimit}
                        onTimeUp={handleTimeUp}
                    />
                </div>
            </div>

            {/* Main content area */}
            <div className={styles.mainContent}>
                {/* Question display */}
                <div className={styles.questionArea}>
                    <div className={styles.questionHeader}>
                        <div className={styles.questionNumber}>
                            Pregunta {currentQuestionIndex + 1}
                        </div>
                        <button
                            onClick={toggleMark}
                            className={`${styles.markButton} ${markedQuestions.has(currentQuestionIndex) ? styles.marked : ''}`}
                        >
                            {markedQuestions.has(currentQuestionIndex) ? '🏴 Marcada' : '🏳️ Marcar'}
                        </button>
                    </div>

                    <div className={styles.questionText}>
                        {currentQuestion.text}
                    </div>

                    <div className={styles.options}>
                        {currentQuestion.options?.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswer(index)}
                                className={`${styles.option} ${userAnswers[currentQuestionIndex] === index ? styles.selected : ''}`}
                            >
                                <span className={styles.optionLetter}>
                                    {String.fromCharCode(65 + index)}
                                </span>
                                <span className={styles.optionText}>{option}</span>
                            </button>
                        ))}
                    </div>

                    {/* Navigation buttons */}
                    <div className={styles.navigation}>
                        <button
                            onClick={handlePrevious}
                            disabled={currentQuestionIndex === 0}
                            className={styles.navButton}
                        >
                            ← Anterior
                        </button>
                        <button
                            onClick={() => setShowNavigator(!showNavigator)}
                            className={styles.navButton}
                        >
                            📍 Navegador
                        </button>
                        {currentQuestionIndex < simulation.questions.length - 1 ? (
                            <button
                                onClick={handleNext}
                                className={styles.navButton}
                            >
                                Siguiente →
                            </button>
                        ) : (
                            <button
                                onClick={() => setShowConfirmFinish(true)}
                                className={styles.finishButton}
                            >
                                ✓ Finalizar
                            </button>
                        )}
                    </div>
                </div>

                {/* Navigator sidebar (toggle) */}
                {showNavigator && (
                    <div className={styles.navigatorSidebar}>
                        <QuestionNavigator
                            totalQuestions={simulation.totalQuestions}
                            currentQuestion={currentQuestionIndex}
                            answeredQuestions={answeredQuestions}
                            markedQuestions={markedQuestions}
                            onNavigate={handleNavigate}
                        />
                    </div>
                )}
            </div>

            {/* Confirm finish modal */}
            {showConfirmFinish && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h3>¿Finalizar Simulacro?</h3>
                        <p>
                            Has respondido <strong>{answeredQuestions.size}</strong> de <strong>{simulation.validQuestions}</strong> preguntas válidas.
                        </p>
                        {answeredQuestions.size < simulation.validQuestions && (
                            <p className={styles.warning}>
                                ⚠️ Tienes <strong>{simulation.validQuestions - answeredQuestions.size}</strong> preguntas sin responder.
                            </p>
                        )}
                        <div className={styles.modalActions}>
                            <button
                                onClick={() => setShowConfirmFinish(false)}
                                className={styles.cancelButton}
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleFinish}
                                className={styles.confirmButton}
                            >
                                Sí, Finalizar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
