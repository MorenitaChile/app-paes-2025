
// PAES Scoring System Implementation
// Based on the official 100-1.000 point scale and transformation tables.

// Reference points for transformation tables (Correct Answers -> Score)
// Source: Guía Completa IA PAES (Part 3)

const SCORING_TABLES: Record<string, [number, number][]> = {
    'm1': [
        [0, 100], [1, 173], [2, 199], [3, 222], [4, 244], [5, 265], [6, 284], [7, 301], [8, 316], [9, 331], [10, 347],
        [15, 413], [20, 478], [25, 521], [30, 583], [35, 623], [40, 684], [42, 700], [45, 738], [50, 802], [55, 886], [60, 1000]
    ],
    'lectora': [
        [0, 100], [1, 186], [2, 210], [3, 232], [4, 253], [5, 271], [6, 288], [7, 304], [8, 322], [9, 339], [10, 356],
        [15, 443], [20, 524], [25, 589], [30, 656], [35, 723], [40, 783], [45, 854], [50, 920], [55, 964], [60, 1000]
    ],
    'm2': [
        [0, 100], [5, 278], [10, 362], [15, 438], [20, 513], [25, 573], [30, 649], [35, 722], [40, 811], [45, 906], [50, 1000]
    ]
};

// Configuration for each subject
const SUBJECT_CONFIG: Record<string, { totalQuestions: number; validQuestions: number }> = {
    'lectora': { totalQuestions: 65, validQuestions: 60 },
    'm1': { totalQuestions: 65, validQuestions: 60 },
    'm2': { totalQuestions: 55, validQuestions: 50 },
    'ciencias': { totalQuestions: 80, validQuestions: 75 },
    'historia': { totalQuestions: 65, validQuestions: 60 },
};

/**
 * Interpolates the score based on the reference table.
 * @param scaledCorrect The number of correct answers.
 * @param table The reference table to use.
 */
function interpolateScore(scaledCorrect: number, table: [number, number][]): number {
    // Find the interval [p1, p2] that contains scaledCorrect
    for (let i = 0; i < table.length - 1; i++) {
        const [x1, y1] = table[i];
        const [x2, y2] = table[i + 1];

        if (scaledCorrect >= x1 && scaledCorrect <= x2) {
            // Linear interpolation
            if (x2 === x1) return y1;
            const t = (scaledCorrect - x1) / (x2 - x1);
            return Math.round(y1 + t * (y2 - y1));
        }
    }
    return table[table.length - 1][1];
}

/**
 * Calculates the PAES score for a given subject and number of correct answers.
 * @param subject The subject identifier (e.g., 'm1', 'lectora').
 * @param correctCount The number of correct answers obtained by the student.
 * @returns The calculated PAES score (100-1000).
 */
export function calculatePAESScore(subject: string, correctCount: number): number {
    const subjectKey = subject.toLowerCase();
    const config = SUBJECT_CONFIG[subjectKey] || SUBJECT_CONFIG['m1'];

    // Ensure correctCount is within valid bounds
    const validCorrect = Math.min(correctCount, config.validQuestions);

    // Select the appropriate table
    // Use M1 table as fallback for sciences/history if specific table not available, 
    // but scaling the input to match the table's range (usually 60 questions)
    let table = SCORING_TABLES[subjectKey];
    let scaledCorrect = validCorrect;

    if (!table) {
        // Fallback to M1 table, scaling the score
        table = SCORING_TABLES['m1'];
        // Scale: (validCorrect / subjectValidQuestions) * 60
        scaledCorrect = (validCorrect / config.validQuestions) * 60;
    }

    return interpolateScore(scaledCorrect, table);
}

/**
 * Scores a multiple-choice question.
 * @param userAnswer The index of the option selected by the user.
 * @param correctAnswer The index of the correct option.
 * @returns 1 if correct, 0 otherwise.
 */
export function scoreMultipleChoice(userAnswer: number, correctAnswer: number): number {
    return userAnswer === correctAnswer ? 1 : 0;
}

// Legacy functions kept for compatibility if needed, but should be phased out
export function scoreOpenEndedResponse(response: string, rubric: any[]): number {
    return 0; // Deprecated
}

export function scoreProblemSolving(response: string, solution: string, rubric: any[]): number {
    return 0; // Deprecated
}
