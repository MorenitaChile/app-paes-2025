/**
 * Progressive Exercises - Matemática M2 - Trigonometría
 * Nivel Básico: Razones trigonométricas en triángulo rectángulo
 */

import { Question } from '../../questions';

export const trigonometriaBasico: Question[] = [
    {
        id: 'm2-trig-bas-001',
        type: 'multiple-choice',
        subject: 'm2',
        axis: 'geometria',
        topic: 'trigonometria',
        difficulty: 'easy',
        difficultyLevel: 'basico',
        text: 'En un triángulo rectángulo, el seno de un ángulo agudo se define como:',
        options: ['Cateto opuesto / Hipotenusa', 'Cateto adyacente / Hipotenusa', 'Cateto opuesto / Cateto adyacente', 'Hipotenusa / Cateto opuesto'],
        correctAnswer: 0,
        solution: 'SOH: Seno = Opuesto / Hipotenusa.',
        strategy: 'Usa la mnemotecnia SOH-CAH-TOA.',
        timeRecommended: 30,
        errorAnalysis: [
            {
                commonMistake: 'Confundir con coseno',
                explanation: 'Coseno usa el adyacente (CAH).',
                preventionTip: 'Seno -> Opuesto (SOH).'
            }
        ]
    },
    {
        id: 'm2-trig-bas-002',
        type: 'multiple-choice',
        subject: 'm2',
        axis: 'geometria',
        topic: 'trigonometria',
        difficulty: 'easy',
        difficultyLevel: 'basico',
        text: 'Si en un triángulo rectángulo los catetos miden 3 y 4, ¿cuánto vale el coseno del ángulo adyacente al cateto de 3?',
        options: ['3/5', '4/5', '3/4', '5/3'],
        correctAnswer: 0,
        solution: 'Hipotenusa = √(3²+4²) = 5. Coseno = Adyacente/Hipotenusa = 3/5.',
        strategy: '1. Calcula hipotenusa (trío pitagórico 3-4-5). 2. Aplica definición de coseno.',
        timeRecommended: 60,
        errorAnalysis: [
            {
                commonMistake: 'Usar el cateto opuesto (4/5)',
                explanation: 'El ángulo es adyacente al cateto 3, por tanto ese es el "adyacente".',
                preventionTip: 'Identifica bien qué cateto toca al ángulo.'
            }
        ]
    },
    {
        id: 'm2-trig-bas-003',
        type: 'multiple-choice',
        subject: 'm2',
        axis: 'geometria',
        topic: 'trigonometria',
        difficulty: 'medium',
        difficultyLevel: 'basico',
        text: 'El valor de tan(45°) es:',
        options: ['1', '0', '√3', '1/√3'],
        correctAnswer: 0,
        solution: 'En un triángulo de 45-45-90, los catetos son iguales. tan = op/ady = x/x = 1.',
        strategy: 'Recuerda los valores notables o dibuja un cuadrado cortado por la diagonal.',
        timeRecommended: 40,
        errorAnalysis: [
            {
                commonMistake: 'Confundir con sen(45°) (√2/2)',
                explanation: 'Seno y coseno son < 1, tangente puede ser 1.',
                preventionTip: 'tan(45°) es pendiente 1.'
            }
        ]
    },
    {
        id: 'm2-trig-bas-004',
        type: 'multiple-choice',
        subject: 'm2',
        axis: 'geometria',
        topic: 'trigonometria',
        difficulty: 'medium',
        difficultyLevel: 'basico',
        text: 'Si sen(α) = 1/2 y α es agudo, entonces α mide:',
        options: ['30°', '60°', '45°', '90°'],
        correctAnswer: 0,
        solution: 'El ángulo cuyo seno es 1/2 es 30°.',
        strategy: 'Memoriza la tabla de ángulos notables (30, 45, 60).',
        timeRecommended: 40,
        errorAnalysis: [
            {
                commonMistake: 'Responder 60°',
                explanation: 'sen(60°) = √3/2. cos(60°) es 1/2.',
                preventionTip: 'Seno crece con el ángulo: 30° es pequeño -> 1/2.'
            }
        ]
    },
    {
        id: 'm2-trig-bas-005',
        type: 'multiple-choice',
        subject: 'm2',
        axis: 'geometria',
        topic: 'trigonometria',
        difficulty: 'hard',
        difficultyLevel: 'basico',
        text: '¿Cuál relación es siempre verdadera para cualquier ángulo agudo x?',
        options: ['sen²x + cos²x = 1', 'sen x + cos x = 1', 'tan x = cos x / sen x', 'sen x = 1/cos x'],
        correctAnswer: 0,
        solution: 'Es la identidad trigonométrica fundamental.',
        strategy: 'Pitágoras en el círculo unitario: x² + y² = 1 -> cos² + sen² = 1.',
        timeRecommended: 45,
        errorAnalysis: [
            {
                commonMistake: 'tan x = cos/sen',
                explanation: 'Es al revés: tan = sen/cos.',
                preventionTip: 'SOH-CAH-TOA: O/A = (O/H)/(A/H) = sen/cos.'
            }
        ]
    }
];
