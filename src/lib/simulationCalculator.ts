/**
 * Simulation Calculator
 * Helper functions for simulation scoring and analysis
 */

import { Question } from '@/data/questions';
import { calculatePAESScore, getPercentile, getPerformanceLevel } from './scoreCalculator';

export type SimulationAnswer = {
    questionId: string;
    questionIndex: number;
    selectedAnswer: number | null;
    isCorrect: boolean;
    isPilot: boolean;
    timeSpent: number; // seconds
};

export type SimulationResult = {
    simulationId: string;
    subject: string;
    totalQuestions: number;
    validQuestions: number;
    answeredQuestions: number;
    correctAnswers: number; // Only valid questions
    incorrectAnswers: number; // Only valid questions
    unanswered: number;
    timeSpent: number; // Total seconds
    timeLimit: number; // Minutes
    paesScore: number; // Scale 100-1000
    percentile: number;
    performanceLevel: string;
    answers: SimulationAnswer[];
};

/**
 * Calculate simulation results
 */
export function calculateSimulationResult(
    simulationId: string,
    subject: 'lectora' | 'm1' | 'm2' | 'ciencias' | 'historia',
    questions: Question[],
    pilotIndices: number[],
    userAnswers: (number | null)[],
    timeSpent: number, // seconds
    timeLimit: number // minutes
): SimulationResult {
    const answers: SimulationAnswer[] = questions.map((question, index) => {
        const isPilot = pilotIndices.includes(index);
        const selectedAnswer = userAnswers[index];
        const isCorrect = selectedAnswer !== null && selectedAnswer === question.correctAnswer;

        return {
            questionId: question.id,
            questionIndex: index,
            selectedAnswer,
            isCorrect,
            isPilot,
            timeSpent: 0 // Individual time tracking can be added later
        };
    });

    // Count only valid (non-pilot) questions
    const validAnswers = answers.filter(a => !a.isPilot);
    const correctAnswers = validAnswers.filter(a => a.isCorrect).length;
    const incorrectAnswers = validAnswers.filter(a => !a.isCorrect && a.selectedAnswer !== null).length;
    const unanswered = validAnswers.filter(a => a.selectedAnswer === null).length;
    const answeredQuestions = validAnswers.filter(a => a.selectedAnswer !== null).length;

    // Calculate PAES score based on correct valid answers
    const paesScore = calculatePAESScore(correctAnswers, subject);
    const percentile = getPercentile(paesScore);
    const performanceLevel = getPerformanceLevel(paesScore);

    return {
        simulationId,
        subject,
        totalQuestions: questions.length,
        validQuestions: questions.length - pilotIndices.length,
        answeredQuestions,
        correctAnswers,
        incorrectAnswers,
        unanswered,
        timeSpent,
        timeLimit,
        paesScore,
        percentile,
        performanceLevel,
        answers
    };
}

/**
 * Format time in HH:MM:SS
 */
export function formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Get time warning level
 */
export function getTimeWarningLevel(remainingSeconds: number, totalMinutes: number): 'normal' | 'warning' | 'critical' {
    const totalSeconds = totalMinutes * 60;
    const percentRemaining = (remainingSeconds / totalSeconds) * 100;

    if (percentRemaining <= 5) return 'critical'; // Less than 5%
    if (percentRemaining <= 20) return 'warning'; // Less than 20%
    return 'normal';
}

/**
 * Calculate completion percentage
 */
export function calculateCompletionPercentage(answered: number, total: number): number {
    return Math.round((answered / total) * 100);
}
