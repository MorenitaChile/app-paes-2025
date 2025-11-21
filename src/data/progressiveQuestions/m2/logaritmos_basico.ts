/**
 * Progressive Exercises - Matemática M2 - Logaritmos
 * Nivel Básico: Definición y propiedades básicas de logaritmos
 */

import { Question } from '../questions';

export const logaritmosBasico: Question[] = [
    {
        id: 'm2-log-bas-001',
        type: 'multiple-choice',
        subject: 'm2',
        axis: 'algebra',
        topic: 'logaritmos',
        difficulty: 'easy',
        difficultyLevel: 'basico',
        text: 'Calcula: log₂(8)',
        options: ['2', '3', '4', '8'],
        correctAnswer: 1,
        solution: 'log₂(8) pregunta: ¿2 elevado a qué potencia da 8? Como 2³ = 8, entonces log₂(8) = 3.',
        strategy: 'Pregúntate: ¿la base elevada a qué número da el argumento? 2^? = 8',
        timeRecommended: 60,
        errorAnalysis: [
            {
                commonMistake: 'Dividir el argumento por la base (8/2 = 4)',
                explanation: 'El logaritmo NO es una división. Es una pregunta sobre potencias.',
                preventionTip: 'Recuerda: log₂(8) significa "¿2 elevado a qué da 8?", no "8 dividido 2".'
            },
            {
                commonMistake: 'Multiplicar base por argumento',
                explanation: 'log₂(8) ≠ 2 × 8. El logaritmo es el exponente, no una multiplicación.',
                preventionTip: 'Piensa en potencias: 2^x = 8, entonces x = 3.'
            }
        ]
    },
    {
        id: 'm2-log-bas-002',
        type: 'multiple-choice',
        subject: 'm2',
        axis: 'algebra',
        topic: 'logaritmos',
        difficulty: 'easy',
        difficultyLevel: 'basico',
        text: 'Calcula: log₁₀(100)',
        options: ['1', '2', '10', '100'],
        correctAnswer: 1,
        solution: '10² = 100, por lo tanto log₁₀(100) = 2.',
        strategy: 'Base 10: piensa en potencias de 10. 10¹ = 10, 10² = 100, 10³ = 1000.',
        timeRecommended: 50,
        errorAnalysis: [
            {
                commonMistake: 'Confundir con log₁₀(10)',
                explanation: 'log₁₀(10) = 1, pero log₁₀(100) = 2 porque 100 = 10².',
                preventionTip: 'Cuenta los ceros en potencias de 10: 100 tiene 2 ceros → log₁₀(100) = 2.'
            }
        ]
    },
    {
        id: 'm2-log-bas-003',
        type: 'multiple-choice',
        subject: 'm2',
        axis: 'algebra',
        topic: 'logaritmos',
        difficulty: 'easy',
        difficultyLevel: 'basico',
        text: 'Calcula: log₅(25)',
        options: ['2', '5', '10', '25'],
        correctAnswer: 0,
        solution: '5² = 25, por lo tanto log₅(25) = 2.',
        strategy: 'Pregunta: ¿5 elevado a qué da 25? Como 5² = 25, la respuesta es 2.',
        timeRecommended: 60,
        errorAnalysis: [
            {
                commonMistake: 'Dividir 25/5 = 5',
                explanation: 'Nuevamente, logaritmo NO es división.',
                preventionTip: 'Siempre piensa en potencias: 5^? = 25 → 5² = 25 → respuesta: 2.'
            }
        ]
    },
    {
        id: 'm2-log-bas-004',
        type: 'multiple-choice',
        subject: 'm2',
        axis: 'algebra',
        topic: 'logaritmos',
        difficulty: 'easy',
        difficultyLevel: 'basico',
        text: 'Calcula: log₃(1)',
        options: ['0', '1', '3', 'No existe'],
        correctAnswer: 0,
        solution: 'Cualquier número elevado a 0 da 1. Como 3⁰ = 1, entonces log₃(1) = 0.',
        strategy: 'Propiedad importante: log_a(1) = 0 para cualquier base a, porque a⁰ = 1.',
        timeRecommended: 50,
        errorAnalysis: [
            {
                commonMistake: 'Responder 1',
                explanation: 'log₃(3) = 1, pero log₃(1) = 0.',
                preventionTip: 'Recuerda: cualquier número elevado a 0 es 1, entonces log_a(1) siempre es 0.'
            }
        ]
    },
    {
        id: 'm2-log-bas-005',
        type: 'multiple-choice',
        subject: 'm2',
        axis: 'algebra',
        topic: 'logaritmos',
        difficulty: 'easy',
        difficultyLevel: 'basico',
        text: 'Si log₂(x) = 4, ¿cuál es el valor de x?',
        options: ['2', '4', '8', '16'],
        correctAnswer: 3,
        solution: 'log₂(x) = 4 significa 2⁴ = x. Como 2⁴ = 16, entonces x = 16.',
        strategy: 'Convierte el logaritmo a forma exponencial: log_a(x) = b → a^b = x.',
        timeRecommended: 70,
        errorAnalysis: [
            {
                commonMistake: 'Multiplicar 2 × 4 = 8',
                explanation: 'No es multiplicación, es potencia: 2⁴ = 2×2×2×2 = 16.',
                preventionTip: 'log₂(x) = 4 se lee: "2 elevado a 4 es x" → 2⁴ = 16.'
            }
        ]
    }
];
