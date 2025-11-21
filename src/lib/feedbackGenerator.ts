/**
 * Feedback Generator
 * Analyzes test results and generates personalized feedback and study recommendations
 */

import { Question } from '@/data/questions';

export type QuestionResult = {
    question: Question;
    userAnswer?: number | string;
    isCorrect: boolean;
    timeSpent?: number; // seconds
};

export type AxisPerformance = {
    axis: string;
    axisTitle: string;
    totalQuestions: number;
    correctAnswers: number;
    percentage: number;
    level: 'excelente' | 'bueno' | 'regular' | 'necesita_refuerzo';
};

export type DifficultyPerformance = {
    level: 'basico' | 'intermedio' | 'avanzado';
    totalQuestions: number;
    correctAnswers: number;
    percentage: number;
};

export type Recommendation = {
    priority: 'alta' | 'media' | 'baja';
    area: string;
    action: string;
    resources: string[];
};

export type Feedback = {
    overallScore: number; // Percentage
    totalQuestions: number;
    correctAnswers: number;
    strengthAreas: AxisPerformance[];
    weaknessAreas: AxisPerformance[];
    difficultyAnalysis: DifficultyPerformance[];
    commonErrors: string[];
    recommendations: Recommendation[];
    studyPlan: string[];
    averageTimePerQuestion?: number;
};

/**
 * Generate comprehensive feedback from test results
 */
export function generateFeedback(results: QuestionResult[], subject: string): Feedback {
    const totalQuestions = results.length;
    const correctAnswers = results.filter(r => r.isCorrect).length;
    const overallScore = Math.round((correctAnswers / totalQuestions) * 100);

    const axisPerfomance = analyzeByAxis(results);
    const difficultyAnalysis = analyzeByDifficulty(results);
    const commonErrors = extractCommonErrors(results);

    const strengthAreas = axisPerfomance.filter(a => a.percentage >= 70);
    const weaknessAreas = axisPerfomance.filter(a => a.percentage < 70).sort((a, b) => a.percentage - b.percentage);

    const recommendations = generateRecommendations(weaknessAreas, difficultyAnalysis, subject);
    const studyPlan = generateStudyPlan(weaknessAreas, difficultyAnalysis);

    const averageTimePerQuestion = calculateAverageTime(results);

    return {
        overallScore,
        totalQuestions,
        correctAnswers,
        strengthAreas,
        weaknessAreas,
        difficultyAnalysis,
        commonErrors,
        recommendations,
        studyPlan,
        averageTimePerQuestion
    };
}

/**
 * Analyze performance by axis/topic
 */
function analyzeByAxis(results: QuestionResult[]): AxisPerformance[] {
    const axisMap = new Map<string, { total: number; correct: number; title: string }>();

    results.forEach(result => {
        const axis = result.question.axis;
        if (!axisMap.has(axis)) {
            axisMap.set(axis, { total: 0, correct: 0, title: getAxisTitle(axis) });
        }
        const data = axisMap.get(axis)!;
        data.total++;
        if (result.isCorrect) data.correct++;
    });

    return Array.from(axisMap.entries()).map(([axis, data]) => {
        const percentage = Math.round((data.correct / data.total) * 100);
        return {
            axis,
            axisTitle: data.title,
            totalQuestions: data.total,
            correctAnswers: data.correct,
            percentage,
            level: getPerformanceLevel(percentage)
        };
    });
}

/**
 * Analyze performance by difficulty level
 */
function analyzeByDifficulty(results: QuestionResult[]): DifficultyPerformance[] {
    const levels: ('basico' | 'intermedio' | 'avanzado')[] = ['basico', 'intermedio', 'avanzado'];

    return levels.map(level => {
        const filtered = results.filter(r => r.question.difficultyLevel === level);
        const total = filtered.length;
        const correct = filtered.filter(r => r.isCorrect).length;
        const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

        return { level, totalQuestions: total, correctAnswers: correct, percentage };
    }).filter(d => d.totalQuestions > 0);
}

/**
 * Extract common errors from incorrect answers
 */
function extractCommonErrors(results: QuestionResult[]): string[] {
    const errors: string[] = [];
    const errorSet = new Set<string>();

    results.forEach(result => {
        if (!result.isCorrect && result.question.errorAnalysis) {
            result.question.errorAnalysis.forEach(error => {
                if (!errorSet.has(error.commonMistake)) {
                    errors.push(error.commonMistake);
                    errorSet.add(error.commonMistake);
                }
            });
        }
    });

    return errors.slice(0, 5); // Top 5 most common
}

/**
 * Generate personalized recommendations
 */
function generateRecommendations(
    weaknesses: AxisPerformance[],
    difficultyAnalysis: DifficultyPerformance[],
    subject: string
): Recommendation[] {
    const recommendations: Recommendation[] = [];

    // Recommendations based on weak areas
    weaknesses.forEach((weakness, index) => {
        if (index < 3) { // Top 3 weaknesses
            const priority = weakness.percentage < 50 ? 'alta' : weakness.percentage < 60 ? 'media' : 'baja';
            recommendations.push({
                priority,
                area: weakness.axisTitle,
                action: `Revisar material de ${weakness.axisTitle}`,
                resources: [
                    `/material/${subject}/${weakness.axis}`,
                    `/practica/${subject}/${weakness.axis}`
                ]
            });
        }
    });

    // Recommendations based on difficulty
    const basicPerf = difficultyAnalysis.find(d => d.level === 'basico');
    const intermediatePerf = difficultyAnalysis.find(d => d.level === 'intermedio');
    const advancedPerf = difficultyAnalysis.find(d => d.level === 'avanzado');

    if (basicPerf && basicPerf.percentage < 80) {
        recommendations.push({
            priority: 'alta',
            area: 'Conceptos Básicos',
            action: 'Reforzar fundamentos con ejercicios de nivel básico',
            resources: [`/practica/${subject}`]
        });
    }

    if (intermediatePerf && intermediatePerf.percentage < 70 && basicPerf && basicPerf.percentage >= 80) {
        recommendations.push({
            priority: 'media',
            area: 'Nivel Intermedio',
            action: 'Practicar ejercicios de nivel intermedio',
            resources: [`/practica/${subject}`]
        });
    }

    if (advancedPerf && advancedPerf.percentage < 60) {
        recommendations.push({
            priority: 'baja',
            area: 'Nivel Avanzado',
            action: 'Desafiar con ejercicios avanzados una vez dominados los niveles anteriores',
            resources: [`/practica/${subject}`]
        });
    }

    return recommendations;
}

/**
 * Generate personalized study plan
 */
function generateStudyPlan(
    weaknesses: AxisPerformance[],
    difficultyAnalysis: DifficultyPerformance[]
): string[] {
    const plan: string[] = [];

    // Week-by-week plan based on weaknesses
    weaknesses.slice(0, 3).forEach((weakness, index) => {
        const weekNum = index + 1;
        const sessions = weakness.percentage < 50 ? 4 : weakness.percentage < 60 ? 3 : 2;
        plan.push(`Semana ${weekNum}: ${weakness.axisTitle} - ${sessions} sesiones de práctica`);
    });

    // Add simulation recommendation
    const basicPerf = difficultyAnalysis.find(d => d.level === 'basico');
    if (basicPerf && basicPerf.percentage >= 80) {
        plan.push(`Semana ${plan.length + 1}: Simulacro completo formato DEMRE`);
    }

    return plan;
}

/**
 * Calculate average time per question
 */
function calculateAverageTime(results: QuestionResult[]): number | undefined {
    const timesRecorded = results.filter(r => r.timeSpent !== undefined);
    if (timesRecorded.length === 0) return undefined;

    const totalTime = timesRecorded.reduce((sum, r) => sum + (r.timeSpent || 0), 0);
    return Math.round(totalTime / timesRecorded.length);
}

/**
 * Get performance level from percentage
 */
function getPerformanceLevel(percentage: number): 'excelente' | 'bueno' | 'regular' | 'necesita_refuerzo' {
    if (percentage >= 85) return 'excelente';
    if (percentage >= 70) return 'bueno';
    if (percentage >= 50) return 'regular';
    return 'necesita_refuerzo';
}

/**
 * Get human-readable axis title
 */
function getAxisTitle(axis: string): string {
    const titles: Record<string, string> = {
        // Lectora
        'comprension': 'Comprensión Lectora',
        'localizar': 'Localizar Información',
        'interpretar': 'Interpretar',
        'evaluar': 'Evaluar',

        // M1 & M2
        'numeros': 'Números',
        'algebra': 'Álgebra y Funciones',
        'algebra_funciones': 'Álgebra y Funciones',
        'geometria': 'Geometría',
        'probabilidad': 'Probabilidad y Estadística',
        'trigonometria': 'Trigonometría',

        // Ciencias
        'biologia': 'Biología',
        'fisica': 'Física',
        'quimica': 'Química'
    };

    return titles[axis] || axis;
}
