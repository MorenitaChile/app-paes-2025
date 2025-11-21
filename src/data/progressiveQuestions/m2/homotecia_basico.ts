/**
 * Progressive Exercises - Matemática M2 - Homotecia
 * Nivel Básico: Concepto y propiedades
 */

import { Question } from '../../questions';

export const homoteciaBasico: Question[] = [
    {
        id: 'm2-hom-bas-001',
        type: 'multiple-choice',
        subject: 'm2',
        axis: 'geometria',
        topic: 'homotecia',
        difficulty: 'easy',
        difficultyLevel: 'basico',
        text: 'Si a un triángulo se le aplica una homotecia de razón k = 2, sus lados:',
        options: ['Se duplican', 'Se mantienen igual', 'Se reducen a la mitad', 'Se cuadruplican'],
        correctAnswer: 0,
        solution: 'En una homotecia de razón k, las longitudes se multiplican por |k|. Aquí k=2, por lo que se duplican.',
        strategy: 'Recuerda: la razón de homotecia k afecta linealmente a las longitudes.',
        timeRecommended: 45,
        errorAnalysis: [
            {
                commonMistake: 'Pensar en el área',
                explanation: 'El área se multiplica por k², pero los lados solo por k.',
                preventionTip: 'Lados -> k, Áreas -> k².'
            }
        ]
    },
    {
        id: 'm2-hom-bas-002',
        type: 'multiple-choice',
        subject: 'm2',
        axis: 'geometria',
        topic: 'homotecia',
        difficulty: 'easy',
        difficultyLevel: 'basico',
        text: 'Una homotecia con razón k = -1 es equivalente a una:',
        options: ['Rotación de 180°', 'Traslación', 'Reflexión axial', 'Identidad'],
        correctAnswer: 0,
        solution: 'Una homotecia con k = -1 invierte la figura respecto al centro, lo que equivale a una rotación de 180° (simetría central).',
        strategy: 'Visualiza la figura invertida al otro lado del centro de homotecia.',
        timeRecommended: 50,
        errorAnalysis: [
            {
                commonMistake: 'Confundir con reflexión',
                explanation: 'La reflexión requiere un eje, la homotecia k=-1 es respecto a un punto.',
                preventionTip: 'k negativo invierte la figura "cruzando" el centro.'
            }
        ]
    },
    {
        id: 'm2-hom-bas-003',
        type: 'multiple-choice',
        subject: 'm2',
        axis: 'geometria',
        topic: 'homotecia',
        difficulty: 'medium',
        difficultyLevel: 'basico',
        text: 'Si el área de una figura es 10 cm² y se aplica una homotecia de k = 3, el área nueva es:',
        options: ['30 cm²', '90 cm²', '100 cm²', '13 cm²'],
        correctAnswer: 1,
        solution: 'La razón de las áreas es k². Área final = 10 * 3² = 10 * 9 = 90.',
        strategy: 'Usa la fórmula: Área final = Área inicial * k².',
        timeRecommended: 60,
        errorAnalysis: [
            {
                commonMistake: 'Multiplicar por k (30 cm²)',
                explanation: 'El área crece cuadráticamente, no linealmente.',
                preventionTip: 'Área va con cuadrado (cm² -> k²).'
            }
        ]
    },
    {
        id: 'm2-hom-bas-004',
        type: 'multiple-choice',
        subject: 'm2',
        axis: 'geometria',
        topic: 'homotecia',
        difficulty: 'easy',
        difficultyLevel: 'basico',
        text: 'En una homotecia, si el centro O, un punto A y su homólogo A\' están alineados, y OA\' = 3OA, entonces k es:',
        options: ['3', '1/3', '-3', '9'],
        correctAnswer: 0,
        solution: 'La razón k es la proporción de las distancias al centro: OA\'/OA = 3.',
        strategy: 'k = Distancia imagen / Distancia original.',
        timeRecommended: 50,
        errorAnalysis: [
            {
                commonMistake: 'Invertir la razón (1/3)',
                explanation: 'k es Imagen/Original, no al revés.',
                preventionTip: 'Si la imagen está más lejos, k > 1 (o k < -1).'
            }
        ]
    },
    {
        id: 'm2-hom-bas-005',
        type: 'multiple-choice',
        subject: 'm2',
        axis: 'geometria',
        topic: 'homotecia',
        difficulty: 'medium',
        difficultyLevel: 'basico',
        text: 'Si k = 0.5, la figura resultante es:',
        options: ['Más pequeña y derecha', 'Más grande y derecha', 'Más pequeña e invertida', 'Más grande e invertida'],
        correctAnswer: 0,
        solution: '0 < k < 1 reduce la figura y mantiene la orientación (derecha).',
        strategy: 'Analiza el valor de k: |k|<1 reduce, k>0 mantiene orientación.',
        timeRecommended: 50,
        errorAnalysis: [
            {
                commonMistake: 'Pensar que se invierte',
                explanation: 'Solo se invierte si k es negativo.',
                preventionTip: 'Signo indica orientación, valor absoluto indica tamaño.'
            }
        ]
    }
];
