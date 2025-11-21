/**
 * Progressive Exercises - Matemática M1 - Ecuaciones
 * Nivel Intermedio: Ecuaciones con paréntesis y fracciones
 */

import { Question } from '../questions';

export const ecuacionesIntermedio: Question[] = [
    {
        id: 'm1-ecuaciones-int-001',
        type: 'multiple-choice',
        subject: 'm1',
        axis: 'algebra',
        topic: 'ecuaciones',
        difficulty: 'medium',
        difficultyLevel: 'intermedio',
        text: 'Resuelve la ecuación: 2(x + 3) = 14',
        options: ['x = 4', 'x = 5', 'x = 7', 'x = 10'],
        correctAnswer: 0,
        solution: 'Paso 1: Distribuir el 2: 2x + 6 = 14. Paso 2: Restar 6: 2x = 8. Paso 3: Dividir por 2: x = 4.',
        strategy: 'Primero distribuye (multiplica el paréntesis), luego despeja como ecuación simple.',
        timeRecommended: 90,
        errorAnalysis: [
            {
                commonMistake: 'No distribuir correctamente',
                explanation: 'Algunos olvidan multiplicar el 3 por 2, obteniendo 2x + 3 = 14.',
                preventionTip: 'Recuerda: 2(x + 3) significa 2·x + 2·3 = 2x + 6'
            },
            {
                commonMistake: 'Dividir antes de despejar el término independiente',
                explanation: 'Dividir (2x + 6)/2 = 14/2 complica innecesariamente.',
                preventionTip: 'Primero despeja los números, luego la incógnita.'
            }
        ]
    },
    {
        id: 'm1-ecuaciones-int-002',
        type: 'multiple-choice',
        subject: 'm1',
        axis: 'algebra',
        topic: 'ecuaciones',
        difficulty: 'medium',
        difficultyLevel: 'intermedio',
        text: 'Resuelve la ecuación: 3x - 5 = x + 7',
        options: ['x = 2', 'x = 6', 'x = 12', 'x = -1'],
        correctAnswer: 1,
        solution: 'Paso 1: Agrupar términos con x a la izquierda: 3x - x = 7 + 5. Paso 2: Simplificar: 2x = 12. Paso 3: Dividir: x = 6.',
        strategy: 'Agrupa todos los términos con x a un lado y los números al otro.',
        timeRecommended: 100,
        errorAnalysis: [
            {
                commonMistake: 'Error de signos al pasar términos',
                explanation: 'Al pasar x al otro lado, debe ser -x, no +x. Al pasar -5, debe ser +5.',
                preventionTip: 'Si pasa al otro lado, cambia el signo: +x pasa como -x, -5 pasa como +5.'
            }
        ]
    },
    {
        id: 'm1-ecuaciones-int-003',
        type: 'multiple-choice',
        subject: 'm1',
        axis: 'algebra',
        topic: 'ecuaciones',
        difficulty: 'medium',
        difficultyLevel: 'intermedio',
        text: 'Resuelve la ecuación: (x/2) + 3 = 7',
        options: ['x = 2', 'x = 4', 'x = 8', 'x = 10'],
        correctAnswer: 2,
        solution: 'Paso 1: Restar 3: x/2 = 4. Paso 2: Multiplicar por 2: x = 8.',
        strategy: 'Despeja primero los términos independientes, luego multiplica para eliminar el denominador.',
        timeRecommended: 90,
        errorAnalysis: [
            {
                commonMistake: 'Multiplicar solo el numerador',
                explanation: 'Algunos hacen (x/2) × 2 = x, pero olvidan multiplicar el 3 también.',
                preventionTip: 'Despeja primero el 3, luego multiplica. O multiplica TODA la ecuación por 2.'
            }
        ]
    },
    {
        id: 'm1-ecuaciones-int-004',
        type: 'multiple-choice',
        subject: 'm1',
        axis: 'algebra',
        topic: 'ecuaciones',
        difficulty: 'medium',
        difficultyLevel: 'intermedio',
        text: 'Resuelve la ecuación: 5(x - 2) + 3 = 18',
        options: ['x = 3', 'x = 5', 'x = 7', 'x = 9'],
        correctAnswer: 1,
        solution: 'Paso 1: Distribuir: 5x - 10 + 3 = 18. Paso 2: Simplificar: 5x - 7 = 18. Paso 3: Sumar 7: 5x = 25. Paso 4: Dividir: x = 5.',
        strategy: 'Distribuye, simplifica términos semejantes, luego despeja.',
        timeRecommended: 120,
        errorAnalysis: [
            {
                commonMistake: 'Error al simplificar -10 + 3',
                explanation: 'Algunos obtienen -10 + 3 = -13 o -7 incorrectamente.',
                preventionTip: 'Usa la recta numérica: -10 + 3 = -7 (avanzas 3 desde -10).'
            }
        ]
    },
    {
        id: 'm1-ecuaciones-int-005',
        type: 'multiple-choice',
        subject: 'm1',
        axis: 'algebra',
        topic: 'ecuaciones',
        difficulty: 'medium',
        difficultyLevel: 'intermedio',
        text: 'María tiene el triple de la edad de su hermano Pedro. Si dentro de 5 años María tendrá 20 años, ¿cuántos años tiene Pedro ahora?',
        options: ['5 años', '10 años', '15 años', '20 años'],
        correctAnswer: 0,
        solution: 'Si x es la edad de Pedro ahora, María tiene 3x. Dentro de 5 años María tendrá 3x + 5 = 20. Entonces 3x = 15, x = 5 años.',
        strategy: 'Define la incógnita (edad de Pedro), expresa la edad de María en función de x, plantea la ecuación según el enunciado.',
        timeRecommended: 150,
        errorAnalysis: [
            {
                commonMistake: 'Confundir "dentro de 5 años" con "hace 5 años"',
                explanation: 'Algunos restan 5 en lugar de sumar.',
                preventionTip: '"Dentro de" significa futuro, se suma. "Hace" significa pasado, se resta.'
            },
            {
                commonMistake: 'Plantear la ecuación con la edad actual de María',
                explanation: 'Usar 3x = 20 ignora los 5 años futuros.',
                preventionTip: 'Lee cuidadosamente: "dentro de 5 años tendrá 20" → 3x + 5 = 20'
            }
        ]
    }
];
