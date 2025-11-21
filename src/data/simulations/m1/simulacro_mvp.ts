/**
 * MVP Simulation - Matemática M1
 * 20 questions (15 valid + 5 pilot) for testing the simulation system
 * Pilot questions: indices 4, 8, 12, 16, 19
 */

import { Simulation, Question } from '../../questions';

const questions: Question[] = [
    // Question 1 - Números
    {
        id: 'sim-m1-001',
        type: 'multiple-choice',
        subject: 'm1',
        axis: 'numeros',
        topic: 'enteros',
        difficulty: 'easy',
        text: '¿Cuál es el resultado de: (-8) + 5?',
        options: ['-13', '-3', '3', '13'],
        correctAnswer: 1,
        solution: '(-8) + 5 = -3. Cuando sumamos números de distinto signo, restamos y conservamos el signo del mayor.'
    },
    // Question 2 - Álgebra
    {
        id: 'sim-m1-002',
        type: 'multiple-choice',
        subject: 'm1',
        axis: 'algebra',
        topic: 'ecuaciones',
        difficulty: 'easy',
        text: 'Resuelve: 3x + 7 = 22',
        options: ['x = 3', 'x = 5', 'x = 7', 'x = 15'],
        correctAnswer: 1,
        solution: '3x + 7 = 22 → 3x = 15 → x = 5'
    },
    // Question 3 - Porcentajes
    {
        id: 'sim-m1-003',
        type: 'multiple-choice',
        subject: 'm1',
        axis: 'numeros',
        topic: 'porcentajes',
        difficulty: 'easy',
        text: 'El 25% de 80 es:',
        options: ['10', '20', '25', '40'],
        correctAnswer: 1,
        solution: '25% de 80 = 0.25 × 80 = 20'
    },
    // Question 4 - Geometría
    {
        id: 'sim-m1-004',
        type: 'multiple-choice',
        subject: 'm1',
        axis: 'geometria',
        topic: 'figuras',
        difficulty: 'easy',
        text: 'El perímetro de un cuadrado de lado 6 cm es:',
        options: ['12 cm', '18 cm', '24 cm', '36 cm'],
        correctAnswer: 2,
        solution: 'Perímetro = 4 × lado = 4 × 6 = 24 cm'
    },
    // Question 5 - PILOT QUESTION
    {
        id: 'sim-m1-005-pilot',
        type: 'multiple-choice',
        subject: 'm1',
        axis: 'numeros',
        topic: 'fracciones',
        difficulty: 'medium',
        text: '¿Cuál es la fracción equivalente a 0.75?',
        options: ['1/4', '2/3', '3/4', '4/5'],
        correctAnswer: 2,
        solution: '0.75 = 75/100 = 3/4'
    },
    // Question 6 - Ecuaciones
    {
        id: 'sim-m1-006',
        type: 'multiple-choice',
        subject: 'm1',
        axis: 'algebra',
        topic: 'ecuaciones',
        difficulty: 'medium',
        text: 'Resuelve: 2(x - 3) = 10',
        options: ['x = 5', 'x = 6', 'x = 7', 'x = 8'],
        correctAnswer: 3,
        solution: '2(x - 3) = 10 → 2x - 6 = 10 → 2x = 16 → x = 8'
    },
    // Question 7 - Razones
    {
        id: 'sim-m1-007',
        type: 'multiple-choice',
        subject: 'm1',
        axis: 'numeros',
        topic: 'razones',
        difficulty: 'medium',
        text: 'Si 3 lápices cuestan $1.500, ¿cuánto costarán 7 lápices?',
        options: ['$3.000', '$3.500', '$4.000', '$4.500'],
        correctAnswer: 1,
        solution: 'Precio por lápiz: 1500/3 = 500. Entonces 7 lápices: 7 × 500 = 3.500'
    },
    // Question 8 - Área
    {
        id: 'sim-m1-008',
        type: 'multiple-choice',
        subject: 'm1',
        axis: 'geometria',
        topic: 'figuras',
        difficulty: 'medium',
        text: 'El área de un rectángulo de base 8 cm y altura 5 cm es:',
        options: ['13 cm²', '26 cm²', '40 cm²', '80 cm²'],
        correctAnswer: 2,
        solution: 'Área = base × altura = 8 × 5 = 40 cm²'
    },
    // Question 9 - PILOT QUESTION
    {
        id: 'sim-m1-009-pilot',
        type: 'multiple-choice',
        subject: 'm1',
        axis: 'algebra',
        topic: 'expresiones',
        difficulty: 'medium',
        text: 'Simplifica: 3a + 5a - 2a',
        options: ['5a', '6a', '8a', '10a'],
        correctAnswer: 1,
        solution: '3a + 5a - 2a = (3 + 5 - 2)a = 6a'
    },
    // Question 10 - Función lineal
    {
        id: 'sim-m1-010',
        type: 'multiple-choice',
        subject: 'm1',
        axis: 'algebra',
        topic: 'lineal',
        difficulty: 'medium',
        text: 'Si f(x) = 2x + 3, ¿cuál es f(4)?',
        options: ['8', '9', '10', '11'],
        correctAnswer: 3,
        solution: 'f(4) = 2(4) + 3 = 8 + 3 = 11'
    },
    // Question 11 - Potencias
    {
        id: 'sim-m1-011',
        type: 'multiple-choice',
        subject: 'm1',
        axis: 'numeros',
        topic: 'potencias',
        difficulty: 'easy',
        text: '¿Cuál es el valor de 2⁴?',
        options: ['8', '12', '16', '20'],
        correctAnswer: 2,
        solution: '2⁴ = 2 × 2 × 2 × 2 = 16'
    },
    // Question 12 - Ángulos
    {
        id: 'sim-m1-012',
        type: 'multiple-choice',
        subject: 'm1',
        axis: 'geometria',
        topic: 'angulos',
        difficulty: 'medium',
        text: 'Dos ángulos complementarios suman:',
        options: ['45°', '90°', '180°', '360°'],
        correctAnswer: 1,
        solution: 'Por definición, ángulos complementarios suman 90°'
    },
    // Question 13 - PILOT QUESTION
    {
        id: 'sim-m1-013-pilot',
        type: 'multiple-choice',
        subject: 'm1',
        axis: 'probabilidad',
        topic: 'probabilidad',
        difficulty: 'medium',
        text: 'Al lanzar un dado, ¿cuál es la probabilidad de obtener un número par?',
        options: ['1/6', '1/3', '1/2', '2/3'],
        correctAnswer: 2,
        solution: 'Números pares: 2, 4, 6 (3 casos favorables de 6 posibles) = 3/6 = 1/2'
    },
    // Question 14 - Estadística
    {
        id: 'sim-m1-014',
        type: 'multiple-choice',
        subject: 'm1',
        axis: 'estadistica',
        topic: 'medidas',
        difficulty: 'easy',
        text: 'La media de los números 4, 6, 8, 10 es:',
        options: ['6', '7', '8', '9'],
        correctAnswer: 1,
        solution: 'Media = (4 + 6 + 8 + 10) / 4 = 28 / 4 = 7'
    },
    // Question 15 - Ecuaciones
    {
        id: 'sim-m1-015',
        type: 'multiple-choice',
        subject: 'm1',
        axis: 'algebra',
        topic: 'ecuaciones',
        difficulty: 'medium',
        text: 'Resuelve: x/3 + 2 = 5',
        options: ['x = 3', 'x = 6', 'x = 9', 'x = 15'],
        correctAnswer: 2,
        solution: 'x/3 + 2 = 5 → x/3 = 3 → x = 9'
    },
    // Question 16 - Triángulos
    {
        id: 'sim-m1-016',
        type: 'multiple-choice',
        subject: 'm1',
        axis: 'geometria',
        topic: 'triangulos',
        difficulty: 'medium',
        text: 'La suma de los ángulos internos de un triángulo es:',
        options: ['90°', '180°', '270°', '360°'],
        correctAnswer: 1,
        solution: 'Por el teorema fundamental, la suma de ángulos internos de un triángulo siempre es 180°'
    },
    // Question 17 - PILOT QUESTION
    {
        id: 'sim-m1-017-pilot',
        type: 'multiple-choice',
        subject: 'm1',
        axis: 'algebra',
        topic: 'cuadratica',
        difficulty: 'hard',
        text: '¿Cuál es la solución positiva de x² = 25?',
        options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
        correctAnswer: 2,
        solution: 'x² = 25 → x = ±5, la solución positiva es x = 5'
    },
    // Question 18 - Porcentajes
    {
        id: 'sim-m1-018',
        type: 'multiple-choice',
        subject: 'm1',
        axis: 'numeros',
        topic: 'porcentajes',
        difficulty: 'medium',
        text: 'Un producto costaba $10.000 y subió 20%. Su nuevo precio es:',
        options: ['$10.200', '$11.000', '$12.000', '$14.000'],
        correctAnswer: 2,
        solution: 'Aumento: 10000 × 0.20 = 2000. Nuevo precio: 10000 + 2000 = 12.000'
    },
    // Question 19 - Volumen
    {
        id: 'sim-m1-019',
        type: 'multiple-choice',
        subject: 'm1',
        axis: 'geometria',
        topic: 'cuerpos',
        difficulty: 'medium',
        text: 'El volumen de un cubo de arista 3 cm es:',
        options: ['9 cm³', '18 cm³', '27 cm³', '36 cm³'],
        correctAnswer: 2,
        solution: 'Volumen = arista³ = 3³ = 27 cm³'
    },
    // Question 20 - PILOT QUESTION
    {
        id: 'sim-m1-020-pilot',
        type: 'multiple-choice',
        subject: 'm1',
        axis: 'estadistica',
        topic: 'graficos',
        difficulty: 'medium',
        text: 'En un gráfico de barras, la altura de cada barra representa:',
        options: ['La categoría', 'La frecuencia', 'El promedio', 'La mediana'],
        correctAnswer: 1,
        solution: 'En un gráfico de barras, la altura representa la frecuencia o cantidad de cada categoría'
    }
];

export const simulacionM1MVP: Simulation = {
    id: 'sim-m1-mvp-001',
    subject: 'm1',
    title: 'Simulacro PAES M1 - MVP (20 preguntas)',
    description: 'Simulacro de prueba en formato DEMRE con 15 preguntas válidas y 5 de pilotaje para validar el sistema.',
    totalQuestions: 20,
    validQuestions: 15,
    pilotQuestions: 5,
    timeLimit: 40, // 40 minutes for MVP
    optionsCount: 4,
    questions: questions,
    pilotIndices: [4, 8, 12, 16, 19], // Indices 4, 8, 12, 16, 19 are pilot questions
    format: 'DEMRE'
};
