
const fs = require('fs');
const path = require('path');

const OUTPUT_PATH = path.join(__dirname, '../src/data/simulations/lectora/simulacro_001.ts');

const SKILLS = [
    { id: 'localizar', name: 'Localizar Información', weight: 0.25 }, // ~16 preguntas
    { id: 'interpretar', name: 'Interpretar y Relacionar', weight: 0.50 }, // ~33 preguntas
    { id: 'evaluar', name: 'Evaluar y Reflexionar', weight: 0.25 } // ~16 preguntas
];

const TEXT_TYPES = [
    'Narrativo (Cuento)',
    'Narrativo (Novela)',
    'Informativo (Artículo)',
    'Informativo (Infografía)',
    'Argumentativo (Ensayo)',
    'Argumentativo (Columna de opinión)',
    'Dramático (Obra de teatro)',
    'Medios Masivos (Noticia)'
];

function generateQuestion(index, skill, textType) {
    const id = `lec-sim-001-q${index + 1}`;

    let questionText = '';
    let options = [];
    let correct = 0;
    let solution = '';

    switch (skill.id) {
        case 'localizar':
            questionText = `En el texto ${textType} leído, ¿qué se afirma sobre el personaje/tema principal en el segundo párrafo?`;
            options = [
                'Afirmación explícita A (Correcta)',
                'Afirmación falsa B',
                'Afirmación no mencionada C',
                'Afirmación de otro párrafo D'
            ];
            solution = 'Esta pregunta evalúa la capacidad de extraer información explícita. La opción A corresponde textualmente a lo mencionado en el párrafo 2.';
            break;
        case 'interpretar':
            questionText = `A partir de la lectura del ${textType}, ¿cuál es la relación entre el título y el desenlace?`;
            options = [
                'Relación metafórica A (Correcta)',
                'Relación contradictoria B',
                'Sin relación aparente C',
                'Relación causal directa D'
            ];
            solution = 'Esta pregunta requiere relacionar elementos del texto. La opción A sintetiza correctamente el sentido global del texto.';
            break;
        case 'evaluar':
            questionText = `¿Cuál es el propósito comunicativo del autor en este ${textType}?`;
            options = [
                'Convencer al lector sobre X (Correcta)',
                'Informar objetivamente sobre Y',
                'Entretener con una historia Z',
                'Describir un proceso W'
            ];
            solution = 'Evaluar el propósito requiere analizar la estructura y tono global. El autor utiliza argumentos para persuadir, por lo que su propósito es convencer.';
            break;
    }

    return {
        id,
        text: questionText,
        type: 'multiple_choice',
        options,
        correctAnswer: 0,
        solution,
        topic: skill.id,
        difficulty: index % 3 === 0 ? 'hard' : (index % 2 === 0 ? 'medium' : 'easy'),
        subject: 'lectora'
    };
}

const questions = [];
let currentSkillIndex = 0;
let currentTextTypeIndex = 0;

// Generar 65 preguntas
for (let i = 0; i < 65; i++) {
    // Rotar habilidades según peso aproximado o simplemente rotar
    // Para simplificar y asegurar distribución:
    // 0-15: Localizar
    // 16-48: Interpretar
    // 49-64: Evaluar

    let skill;
    if (i < 16) skill = SKILLS[0];
    else if (i < 49) skill = SKILLS[1];
    else skill = SKILLS[2];

    // Cambiar tipo de texto cada 5-8 preguntas para simular bloques de lectura
    if (i % 7 === 0) {
        currentTextTypeIndex = (currentTextTypeIndex + 1) % TEXT_TYPES.length;
    }

    questions.push(generateQuestion(i, skill, TEXT_TYPES[currentTextTypeIndex]));
}

const fileContent = `import { Simulation } from '../types';

export const simulacroLectora001: Simulation = {
  id: 'lec-sim-001',
  title: 'Simulacro Competencia Lectora (Forma 1)',
  subject: 'lectora',
  description: 'Simulacro completo de Competencia Lectora con 65 preguntas. Incluye textos narrativos, informativos y argumentativos.',
  timeLimit: 150, // 2h 30min
  questions: ${JSON.stringify(questions, null, 2)}
};
`;

fs.writeFileSync(OUTPUT_PATH, fileContent);
console.log(`Simulacro de Lectora generado en: ${OUTPUT_PATH}`);
