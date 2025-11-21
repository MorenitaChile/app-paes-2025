// Tiempo por pregunta según especificaciones PAES (en minutos)
const TIME_PER_QUESTION: Record<string, number> = {
    lectora: 2.5,    // 2h 30min / 60 preguntas = 2.5 min/pregunta
    ciencias: 2.1,   // 2h 40min / 75 preguntas = 2.13 min/pregunta
    m1: 2.3,         // 2h 20min / 60 preguntas = 2.33 min/pregunta
    m2: 2.8          // 2h 20min / 50 preguntas = 2.8 min/pregunta
};

// Tiempos oficiales PAES para simulacros completos (en minutos)
const OFFICIAL_PAES_TIMES: Record<string, number> = {
    lectora: 150,  // 2h 30min
    ciencias: 160, // 2h 40min
    m1: 140,       // 2h 20min
    m2: 140        // 2h 20min
};

export type EssayType = 'practice' | 'full_simulation';

/**
 * Calcula el tiempo asignado para un ensayo según su tipo y cantidad de preguntas
 * @param subject - Materia del ensayo (lectora, ciencias, m1, m2)
 * @param questionCount - Número de preguntas del ensayo
 * @param type - Tipo de ensayo: 'practice' (práctica progresiva) o 'full_simulation' (simulacro completo)
 * @returns Tiempo en minutos
 */
export function calculateEssayTime(
    subject: string,
    questionCount: number,
    type: EssayType
): number {
    if (type === 'full_simulation') {
        // Simulacro completo: usar tiempo oficial PAES
        return OFFICIAL_PAES_TIMES[subject] || 120;
    }

    // Práctica progresiva: tiempo proporcional según cantidad de preguntas
    const timePerQuestion = TIME_PER_QUESTION[subject] || 2.5;
    return Math.ceil(questionCount * timePerQuestion);
}

/**
 * Formatea minutos a formato "Xh Ymin"
 * @param minutes - Tiempo en minutos
 * @returns String formateado (ej: "2h 30min", "45min")
 */
export function formatTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours === 0) {
        return `${mins}min`;
    }

    if (mins === 0) {
        return `${hours}h`;
    }

    return `${hours}h ${mins}min`;
}
