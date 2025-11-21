/**
 * Progressive Exercises - Matemática M1 - Ecuaciones
 * Nivel Básico: Ecuaciones lineales simples
 */

import { Question } from '../../questions';

export const ecuacionesBasico: Question[] = [
    {
        id: 'm1-ecuaciones-bas-001',
        type: 'multiple-choice',
        subject: 'm1',
        axis: 'algebra',
        topic: 'ecuaciones',
        difficulty: 'easy',
        difficultyLevel: 'basico',
        text: 'Resuelve la ecuación: x + 5 = 12',
        options: ['x = 5', 'x = 7', 'x = 17', 'x = -7'],
        correctAnswer: 1,
        solution: 'Para despejar x, restamos 5 de ambos lados: x + 5 - 5 = 12 - 5, por lo tanto x = 7.',
        strategy: 'Despeja la incógnita pasando el número al otro lado con la operación inversa (si suma, pasa restando).',
        timeRecommended: 60,
        errorAnalysis: [
            {
                commonMistake: 'Sumar 5 en lugar de restar',
                explanation: 'Algunos estudiantes suman 5 a 12, obteniendo x = 17. Esto es incorrecto porque para despejar x debemos hacer la operación inversa.',
                preventionTip: 'Recuerda: si un número está sumando, pasa al otro lado restando. Si está restando, pasa sumando.'
            },
            {
                commonMistake: 'Cambiar el signo incorrectamente',
                explanation: 'Obtener x = -7 indica confusión con los signos.',
                preventionTip: 'Verifica cada paso: x + 5 = 12 → x = 12 - 5 → x = 7'
            }
        ]
    },
    {
        id: 'm1-ecuaciones-bas-002',
        type: 'multiple-choice',
        subject: 'm1',
        axis: 'algebra',
        topic: 'ecuaciones',
        difficulty: 'easy',
        difficultyLevel: 'basico',
        text: 'Resuelve la ecuación: 3x = 15',
        options: ['x = 3', 'x = 5', 'x = 12', 'x = 45'],
        correctAnswer: 1,
        solution: 'Para despejar x, dividimos ambos lados por 3: 3x/3 = 15/3, por lo tanto x = 5.',
        strategy: 'Cuando la incógnita está multiplicada, divide ambos lados por ese número.',
        timeRecommended: 60,
        errorAnalysis: [
            {
                commonMistake: 'Restar 3 en lugar de dividir',
                explanation: 'Obtener x = 12 indica que restaste 3 a 15. Pero 3 está multiplicando a x, no sumando.',
                preventionTip: 'Identifica la operación: ¿está sumando, restando, multiplicando o dividiendo? Aquí 3 multiplica a x.'
            },
            {
                commonMistake: 'Multiplicar en lugar de dividir',
                explanation: 'Obtener x = 45 indica que multiplicaste 3 × 15. La operación inversa de multiplicar es dividir.',
                preventionTip: 'Si multiplica, pasa dividiendo. Si divide, pasa multiplicando.'
            }
        ]
    },
    {
        id: 'm1-ecuaciones-bas-003',
        type: 'multiple-choice',
        subject: 'm1',
        axis: 'algebra',
        topic: 'ecuaciones',
        difficulty: 'easy',
        difficultyLevel: 'basico',
        text: 'Resuelve la ecuación: x - 8 = 3',
        options: ['x = 5', 'x = -5', 'x = 11', 'x = -11'],
        correctAnswer: 2,
        solution: 'Para despejar x, sumamos 8 a ambos lados: x - 8 + 8 = 3 + 8, por lo tanto x = 11.',
        strategy: 'Si un número está restando, pasa al otro lado sumando.',
        timeRecommended: 60,
        errorAnalysis: [
            {
                commonMistake: 'Restar 8 en lugar de sumar',
                explanation: 'Obtener x = -5 indica que restaste 8 a 3. Pero -8 ya está restando, debe pasar sumando.',
                preventionTip: 'Operación inversa de restar es sumar: x - 8 = 3 → x = 3 + 8'
            }
        ]
    },
    {
        id: 'm1-ecuaciones-bas-004',
        type: 'multiple-choice',
        subject: 'm1',
        axis: 'algebra',
        topic: 'ecuaciones',
        difficulty: 'easy',
        difficultyLevel: 'basico',
        text: 'Resuelve la ecuación: 2x + 4 = 10',
        options: ['x = 2', 'x = 3', 'x = 7', 'x = 14'],
        correctAnswer: 1,
        solution: 'Paso 1: Restamos 4 de ambos lados: 2x = 10 - 4 = 6. Paso 2: Dividimos por 2: x = 6/2 = 3.',
        strategy: 'Primero despeja los términos independientes, luego despeja la incógnita.',
        timeRecommended: 90,
        errorAnalysis: [
            {
                commonMistake: 'Dividir todo por 2 sin despejar primero',
                explanation: 'Algunos dividen (2x + 4)/2 = 10/2, obteniendo x + 2 = 5, lo cual complica innecesariamente.',
                preventionTip: 'Sigue el orden: primero mueve los números, luego despeja la x.'
            }
        ]
    },
    {
        id: 'm1-ecuaciones-bas-005',
        type: 'multiple-choice',
        subject: 'm1',
        axis: 'algebra',
        topic: 'ecuaciones',
        difficulty: 'easy',
        difficultyLevel: 'basico',
        text: 'Juan tiene el doble de la edad de María. Si Juan tiene 14 años, ¿cuántos años tiene María?',
        options: ['28 años', '12 años', '7 años', '6 años'],
        correctAnswer: 2,
        solution: 'Si x es la edad de María, entonces Juan tiene 2x. Como Juan tiene 14: 2x = 14 → x = 14/2 = 7 años.',
        strategy: 'Define la incógnita, plantea la ecuación según el enunciado, y resuelve.',
        timeRecommended: 120,
        errorAnalysis: [
            {
                commonMistake: 'Duplicar la edad de Juan',
                explanation: 'Obtener 28 indica que duplicaste 14. Pero Juan YA tiene el doble, debemos dividir.',
                preventionTip: 'Lee cuidadosamente: "Juan tiene el DOBLE" significa Juan = 2 × María, no María = 2 × Juan.'
            }
        ]
    }
];
