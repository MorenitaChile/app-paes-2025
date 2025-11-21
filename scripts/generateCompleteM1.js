
const fs = require('fs');
const path = require('path');

const OUTPUT_PATH = path.join(__dirname, '../src/data/simulations/m1/simulacro_001.ts');

const TOPICS = [
    { id: 'numeros', name: 'Números', weight: 0.25 }, // ~16 preguntas
    { id: 'algebra', name: 'Álgebra y Funciones', weight: 0.35 }, // ~23 preguntas
    { id: 'geometria', name: 'Geometría', weight: 0.20 }, // ~13 preguntas
    { id: 'probabilidad', name: 'Probabilidad y Estadística', weight: 0.20 } // ~13 preguntas
];

function generateQuestion(index, topic) {
    const id = `m1-sim-001-q${index + 1}`;

    let questionText = '';
    let options = [];
    let solution = '';

    switch (topic.id) {
        case 'numeros':
            questionText = `Si a = ${index + 2} y b = ${index + 3}, ¿cuál es el valor de (a + b)² - (a - b)²?`;
            options = [
                `${4 * (index + 2) * (index + 3)} (Correcta)`,
                `${2 * ((index + 2) ** 2 + (index + 3) ** 2)}`,
                `${(index + 2) ** 2 + (index + 3) ** 2}`,
                '0'
            ];
            solution = 'Se aplica el producto notable o se reemplazan los valores. (a+b)^2 - (a-b)^2 = 4ab.';
            break;
        case 'algebra':
            questionText = `Dada la función f(x) = ${index + 1}x + 5, ¿cuál es el valor de f(2)?`;
            options = [
                `${(index + 1) * 2 + 5} (Correcta)`,
                `${(index + 1) * 2}`,
                `${index + 6}`,
                'Ninguna de las anteriores'
            ];
            solution = 'Se evalúa la función en x=2 reemplazando en la ecuación.';
            break;
        case 'geometria':
            questionText = `En un triángulo rectángulo, si un cateto mide ${index + 3} y el otro ${index + 4}, ¿cuánto mide la hipotenusa al cuadrado?`;
            options = [
                `${(index + 3) ** 2 + (index + 4) ** 2} (Correcta)`,
                `${(index + 3) ** 2 - (index + 4) ** 2}`,
                `${(index + 3) + (index + 4)}`,
                `${(index + 3) * (index + 4)}`
            ];
            solution = 'Por teorema de Pitágoras, c^2 = a^2 + b^2.';
            break;
        case 'probabilidad':
            questionText = `En una urna hay ${index + 2} bolitas rojas y ${index + 3} azules. ¿Cuál es la probabilidad de sacar una roja?`;
            const total = (index + 2) + (index + 3);
            options = [
                `${index + 2}/${total} (Correcta)`,
                `${index + 3}/${total}`,
                `1/${total}`,
                `1/2`
            ];
            solution = 'La probabilidad es casos favorables (rojas) dividido por casos totales.';
            break;
    }

    return {
        id,
        text: questionText,
        type: 'multiple_choice',
        options,
        correctAnswer: 0,
        solution,
        topic: topic.id,
        difficulty: index % 3 === 0 ? 'hard' : (index % 2 === 0 ? 'medium' : 'easy'),
        subject: 'm1'
    };
}

const questions = [];

// Generar 65 preguntas distribuidas
for (let i = 0; i < 65; i++) {
    let topic;
    if (i < 16) topic = TOPICS[0]; // Números
    else if (i < 39) topic = TOPICS[1]; // Álgebra
    else if (i < 52) topic = TOPICS[2]; // Geometría
    else topic = TOPICS[3]; // Probabilidad

    questions.push(generateQuestion(i, topic));
}

const fileContent = `import { Simulation } from '../types';

export const simulacroM1001: Simulation = {
  id: 'm1-sim-001',
  title: 'Simulacro Matemática M1 (Forma 1)',
  subject: 'm1',
  description: 'Simulacro completo de Matemática M1 con 65 preguntas. Cubre Números, Álgebra, Geometría y Probabilidad.',
  timeLimit: 140, // 2h 20min
  questions: ${JSON.stringify(questions, null, 2)}
};
`;

fs.writeFileSync(OUTPUT_PATH, fileContent);
console.log(`Simulacro de M1 generado en: ${OUTPUT_PATH}`);
