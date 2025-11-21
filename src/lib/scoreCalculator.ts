/**
 * PAES Score Calculator
 * Converts number of correct answers to PAES score (100-1000 scale)
 * Based on official transformation tables from DEMRE
 */

type Subject = 'lectora' | 'm1' | 'm2' | 'ciencias' | 'historia';

// Transformation tables from guia-completa-ia-paes.md
const TRANSFORMATION_TABLES: Record<Subject, Record<number, number>> = {
    lectora: {
        0: 100, 1: 186, 2: 210, 3: 232, 4: 253, 5: 271,
        6: 288, 7: 304, 8: 322, 9: 339, 10: 356,
        15: 443, 20: 524, 25: 589, 30: 656, 35: 723,
        40: 783, 45: 854, 50: 920, 55: 964, 60: 1000
    },
    m1: {
        0: 100, 1: 173, 2: 199, 3: 222, 4: 244, 5: 265,
        6: 284, 7: 301, 8: 316, 9: 331, 10: 347,
        15: 413, 20: 478, 25: 521, 30: 583, 35: 623,
        40: 684, 42: 700, 45: 738, 50: 802, 55: 886, 60: 1000
    },
    m2: {
        0: 100, 5: 278, 10: 362, 15: 438, 20: 513,
        25: 573, 30: 649, 35: 722, 40: 811, 45: 906, 50: 1000
    },
    ciencias: {
        // Using M1 table as approximation (official Ciencias table not provided)
        0: 100, 5: 265, 10: 347, 15: 413, 20: 478,
        25: 521, 30: 583, 35: 623, 40: 684, 45: 738,
        50: 802, 55: 886, 60: 920, 65: 950, 70: 975, 75: 1000
    },
    historia: {
        // Using Ciencias table as approximation (official Historia table not provided)
        0: 100, 5: 265, 10: 347, 15: 413, 20: 478,
        25: 521, 30: 583, 35: 623, 40: 684, 45: 738,
        50: 802, 55: 886, 60: 920, 65: 950, 70: 975, 75: 1000
    }
};


/**
 * Linear interpolation between two points
 */
function interpolate(x: number, x1: number, y1: number, x2: number, y2: number): number {
    return Math.round(y1 + ((x - x1) * (y2 - y1)) / (x2 - x1));
}

/**
 * Calculate PAES score from number of correct answers
 * @param correctAnswers - Number of correct answers (0 to max valid questions)
 * @param subject - Subject of the test
 * @returns PAES score in 100-1000 scale
 */
export function calculatePAESScore(correctAnswers: number, subject: Subject): number {
    const table = TRANSFORMATION_TABLES[subject];
    const sortedKeys = Object.keys(table).map(Number).sort((a, b) => a - b);

    // Exact match in table
    if (table[correctAnswers] !== undefined) {
        return table[correctAnswers];
    }

    // Find surrounding values for interpolation
    let lowerKey = sortedKeys[0];
    let upperKey = sortedKeys[sortedKeys.length - 1];

    for (let i = 0; i < sortedKeys.length - 1; i++) {
        if (correctAnswers > sortedKeys[i] && correctAnswers < sortedKeys[i + 1]) {
            lowerKey = sortedKeys[i];
            upperKey = sortedKeys[i + 1];
            break;
        }
    }

    // Interpolate
    return interpolate(
        correctAnswers,
        lowerKey,
        table[lowerKey],
        upperKey,
        table[upperKey]
    );
}

/**
 * Get percentile approximation based on normal distribution
 * Mean = 500, SD = 110
 */
export function getPercentile(paesScore: number): number {
    const mean = 500;
    const sd = 110;
    const z = (paesScore - mean) / sd;

    // Approximate percentile using error function
    // This is a simplified approximation
    const percentile = 50 * (1 + erf(z / Math.sqrt(2)));
    return Math.round(percentile * 10) / 10; // Round to 1 decimal
}

/**
 * Error function approximation for percentile calculation
 */
function erf(x: number): number {
    // Abramowitz and Stegun approximation
    const sign = x >= 0 ? 1 : -1;
    x = Math.abs(x);

    const a1 = 0.254829592;
    const a2 = -0.284496736;
    const a3 = 1.421413741;
    const a4 = -1.453152027;
    const a5 = 1.061405429;
    const p = 0.3275911;

    const t = 1.0 / (1.0 + p * x);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

    return sign * y;
}

/**
 * Get performance level description
 */
export function getPerformanceLevel(paesScore: number): string {
    if (paesScore >= 800) return 'Excelente';
    if (paesScore >= 700) return 'Muy Bueno';
    if (paesScore >= 600) return 'Bueno';
    if (paesScore >= 500) return 'Promedio';
    if (paesScore >= 400) return 'Bajo el Promedio';
    return 'Necesita Refuerzo';
}

/**
 * Calculate weighted score for university admission
 * @param scores - Object with all test scores
 * @param weights - Ponderaciones (must sum to 1.0)
 */
export function calculateWeightedScore(
    scores: {
        nem?: number;
        ranking?: number;
        lectora?: number;
        m1?: number;
        m2?: number;
        ciencias?: number;
        historia?: number;
    },
    weights: {
        nem?: number;
        ranking?: number;
        lectora?: number;
        m1?: number;
        m2?: number;
        ciencias?: number;
        historia?: number;
    }
): number {
    let weightedSum = 0;
    let totalWeight = 0;

    for (const key in scores) {
        const score = scores[key as keyof typeof scores];
        const weight = weights[key as keyof typeof weights];
        if (score !== undefined && weight !== undefined) {
            weightedSum += score * weight;
            totalWeight += weight;
        }
    }

    return Math.round(weightedSum * 10) / 10; // Round to 1 decimal
}
