import { Question } from '@/data/questions';

export type ScoringResult = {
    score: number; // 0-100
    maxScore: number;
    criteriaScores: {
        criteria: string;
        score: number;
        maxScore: number;
        feedback: string;
    }[];
    overallFeedback: string;
    strengths: string[];
    improvements: string[];
};

/**
 * Evaluates an open-ended response using a rubric-based approach
 * This is a simplified version - in production, this would integrate with AI (Gemini/Claude)
 */
export function scoreOpenEndedResponse(
    question: Question,
    userResponse: string
): ScoringResult {
    if (!question.rubric) {
        return {
            score: 0,
            maxScore: 100,
            criteriaScores: [],
            overallFeedback: 'No hay rúbrica disponible para esta pregunta.',
            strengths: [],
            improvements: []
        };
    }

    const criteriaScores = question.rubric.map(criterion => {
        // Simple heuristic scoring (would be replaced with AI in production)
        const responseLength = userResponse.length;
        const hasKeywords = checkKeywords(userResponse, question.solution || '');
        const hasStructure = checkStructure(userResponse);

        let score = 0;
        const maxScore = criterion.weight * 100;

        // Basic scoring logic
        if (criterion.criteria.toLowerCase().includes('pertinencia')) {
            score = hasKeywords ? maxScore * 0.8 : maxScore * 0.4;
        } else if (criterion.criteria.toLowerCase().includes('profundidad')) {
            score = responseLength > 200 ? maxScore * 0.7 : maxScore * 0.4;
        } else if (criterion.criteria.toLowerCase().includes('claridad')) {
            score = hasStructure ? maxScore * 0.75 : maxScore * 0.5;
        } else if (criterion.criteria.toLowerCase().includes('evidencia')) {
            score = userResponse.includes('"') || userResponse.includes('según') ? maxScore * 0.8 : maxScore * 0.3;
        } else {
            score = maxScore * 0.6; // Default
        }

        return {
            criteria: criterion.criteria,
            score: Math.round(score),
            maxScore: Math.round(maxScore),
            feedback: generateCriteriaFeedback(criterion.criteria, score, maxScore)
        };
    });

    const totalScore = criteriaScores.reduce((sum, c) => sum + c.score, 0);
    const totalMax = criteriaScores.reduce((sum, c) => sum + c.maxScore, 0);

    const strengths: string[] = [];
    const improvements: string[] = [];

    criteriaScores.forEach(c => {
        const percentage = (c.score / c.maxScore) * 100;
        if (percentage >= 70) {
            strengths.push(`Buen desempeño en ${c.criteria.toLowerCase()}`);
        } else {
            improvements.push(`Reforzar ${c.criteria.toLowerCase()}`);
        }
    });

    return {
        score: Math.round(totalScore),
        maxScore: totalMax,
        criteriaScores,
        overallFeedback: generateOverallFeedback(totalScore, totalMax),
        strengths,
        improvements
    };
}

/**
 * Scores a problem-solving question (math/science)
 */
export function scoreProblemSolving(
    question: Question,
    userResponse: string
): ScoringResult {
    if (!question.rubric || !question.solution) {
        return {
            score: 0,
            maxScore: 100,
            criteriaScores: [],
            overallFeedback: 'No hay solución de referencia disponible.',
            strengths: [],
            improvements: []
        };
    }

    const criteriaScores = question.rubric.map(criterion => {
        const maxScore = criterion.weight * 100;
        let score = 0;

        if (criterion.criteria.toLowerCase().includes('concepto')) {
            score = checkMathConcepts(userResponse, question.solution!) ? maxScore * 0.75 : maxScore * 0.3;
        } else if (criterion.criteria.toLowerCase().includes('procedimiento')) {
            score = checkProcedure(userResponse) ? maxScore * 0.7 : maxScore * 0.35;
        } else if (criterion.criteria.toLowerCase().includes('respuesta')) {
            score = checkFinalAnswer(userResponse, question.solution!) ? maxScore : maxScore * 0.2;
        } else {
            score = maxScore * 0.5;
        }

        return {
            criteria: criterion.criteria,
            score: Math.round(score),
            maxScore: Math.round(maxScore),
            feedback: generateCriteriaFeedback(criterion.criteria, score, maxScore)
        };
    });

    const totalScore = criteriaScores.reduce((sum, c) => sum + c.score, 0);
    const totalMax = criteriaScores.reduce((sum, c) => sum + c.maxScore, 0);

    return {
        score: Math.round(totalScore),
        maxScore: totalMax,
        criteriaScores,
        overallFeedback: generateOverallFeedback(totalScore, totalMax),
        strengths: criteriaScores.filter(c => c.score / c.maxScore >= 0.7).map(c => `Correcto en ${c.criteria.toLowerCase()}`),
        improvements: criteriaScores.filter(c => c.score / c.maxScore < 0.7).map(c => `Revisar ${c.criteria.toLowerCase()}`)
    };
}

// Helper functions
function checkKeywords(response: string, solution: string): boolean {
    const solutionWords = solution.toLowerCase().split(/\s+/).filter(w => w.length > 4);
    const responseWords = response.toLowerCase().split(/\s+/);
    const matches = solutionWords.filter(word => responseWords.includes(word));
    return matches.length >= Math.min(3, solutionWords.length * 0.3);
}

function checkStructure(response: string): boolean {
    const hasParagraphs = response.split('\n').length > 1;
    const hasMinLength = response.length > 150;
    return hasParagraphs && hasMinLength;
}

function checkMathConcepts(response: string, solution: string): boolean {
    const mathTerms = ['=', '+', '-', '*', '/', 'sen', 'cos', 'tan', '²', '³'];
    return mathTerms.some(term => response.includes(term));
}

function checkProcedure(response: string): boolean {
    const steps = response.split('\n').filter(line => line.trim().length > 0);
    return steps.length >= 2;
}

function checkFinalAnswer(response: string, solution: string): boolean {
    // Extract numbers from both
    const responseNumbers = response.match(/\d+\.?\d*/g) || [];
    const solutionNumbers = solution.match(/\d+\.?\d*/g) || [];

    if (responseNumbers.length === 0 || solutionNumbers.length === 0) return false;

    // Check if any response number is close to any solution number
    return responseNumbers.some(rNum =>
        solutionNumbers.some(sNum =>
            Math.abs(parseFloat(rNum) - parseFloat(sNum)) < 0.1
        )
    );
}

function generateCriteriaFeedback(criteria: string, score: number, maxScore: number): string {
    const percentage = (score / maxScore) * 100;

    if (percentage >= 80) return `Excelente en ${criteria.toLowerCase()}`;
    if (percentage >= 60) return `Buen nivel en ${criteria.toLowerCase()}`;
    if (percentage >= 40) return `Nivel aceptable en ${criteria.toLowerCase()}, puede mejorar`;
    return `Necesita reforzar ${criteria.toLowerCase()}`;
}

function generateOverallFeedback(score: number, maxScore: number): string {
    const percentage = (score / maxScore) * 100;

    if (percentage >= 85) return 'Excelente desempeño. Dominas bien este tema.';
    if (percentage >= 70) return 'Buen trabajo. Continúa practicando para perfeccionar.';
    if (percentage >= 50) return 'Nivel aceptable. Revisa los conceptos clave y practica más.';
    return 'Necesitas reforzar este tema. Revisa el material didáctico y vuelve a intentar.';
}

/**
 * Converts a 0-100 score to PAES scale (100-1000)
 */
export function convertToPAESScale(score: number, maxScore: number = 100): number {
    const percentage = score / maxScore;
    // PAES scale: 100-1000, with 500 as average
    const paesScore = 100 + (percentage * 900);
    return Math.round(paesScore);
}
