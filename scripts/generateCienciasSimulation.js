// Script to generate complete Ciencias simulation with 80 questions
const fs = require('fs');
const path = require('path');

const header = `/**
 * Simulacro Completo PAES Ciencias - Electivo Biología
 * 80 preguntas totales (75 válidas + 5 pilotaje)
 * - Módulo Común: 54 preguntas (18 Biología + 18 Física + 18 Química)
 * - Módulo Electivo Biología: 26 preguntas
 * Tiempo: 2h 40min (160 minutos)
 * Preguntas pilotaje: índices 10, 25, 40, 55, 70
 */

import { Simulation, Question } from '../../questions';

const questions: Question[] = [`;

const footer = `];

export const simulacionCienciasBiologia: Simulation = {
    id: 'sim-cie-bio-001',
    subject: 'ciencias',
    title: 'Simulacro Completo PAES Ciencias - Electivo Biología',
    description: 'Simulacro oficial con 80 preguntas: 54 del módulo común (18 Biología, 18 Física, 18 Química) y 26 del electivo de Biología. Formato DEMRE con 75 preguntas válidas y 5 de pilotaje.',
    totalQuestions: 80,
    validQuestions: 75,
    pilotQuestions: 5,
    timeLimit: 160, // 2h 40min
    optionsCount: 4,
    questions: questions,
    pilotIndices: [10, 25, 40, 55, 70],
    format: 'DEMRE'
};
`;

// Generate 80 questions programmatically
const topics = {
    biologia: ['celula', 'reproduccion', 'genetica', 'evolucion', 'ecosistema'],
    fisica: ['ondas', 'mecanica', 'energia', 'electricidad'],
    quimica: ['estructura', 'organica', 'reacciones']
};

let questionCode = '';
let questionNumber = 1;

// Helper function to generate a question
function generateQuestion(id, subject, axis, topic, difficulty, text, options, correctAnswer, solution, isPilot = false) {
    const pilotSuffix = isPilot ? '-pilot' : '';
    return `    {
        id: '${id}${pilotSuffix}',
        type: 'multiple-choice',
        subject: '${subject}',
        axis: '${axis}',
        topic: '${topic}',
        difficulty: '${difficulty}',
        text: '${text}',
        options: ${JSON.stringify(options)},
        correctAnswer: ${correctAnswer},
        solution: '${solution}'
    }`;
}

// MÓDULO COMÚN - BIOLOGÍA (18 preguntas)
const biologiaComun = [
    ['cie-mc-bio-001', 'ciencias', 'biologia', 'celula', 'easy', '¿Cuál estructura celular es exclusiva de células vegetales?', ['Mitocondria', 'Cloroplasto', 'Núcleo', 'Ribosoma'], 1, 'Los cloroplastos son exclusivos de células vegetales.'],
    ['cie-mc-bio-002', 'ciencias', 'biologia', 'celula', 'medium', 'La función principal de las mitocondrias es:', ['Sintetizar proteínas', 'Producir energía (ATP)', 'Almacenar ADN', 'Fotosíntesis'], 1, 'Las mitocondrias producen ATP mediante respiración celular.'],
    ['cie-mc-bio-003', 'ciencias', 'biologia', 'reproduccion', 'medium', 'La ovulación ocurre aproximadamente en el día:', ['7', '14', '21', '28'], 1, 'La ovulación ocurre cerca del día 14 del ciclo menstrual.'],
    ['cie-mc-bio-004', 'ciencias', 'biologia', 'reproduccion', 'easy', '¿Cuál método anticonceptivo es de barrera?', ['Píldora', 'Condón', 'DIU hormonal', 'Calendario'], 1, 'El condón es un método de barrera física.'],
    ['cie-mc-bio-005', 'ciencias', 'biologia', 'genetica', 'medium', 'La duplicación del ADN ocurre en la fase:', ['G1', 'S', 'G2', 'M'], 1, 'La fase S (síntesis) es cuando se replica el ADN.'],
    ['cie-mc-bio-006', 'ciencias', 'biologia', 'genetica', 'hard', 'Diferencia principal entre mitosis y meiosis:', ['Mitosis produce 4 células', 'Mitosis produce células diploides, meiosis haploides', 'Mitosis en gametos', 'Mitosis no duplica ADN'], 1, 'Mitosis produce células diploides (2n), meiosis haploides (n).'],
    ['cie-mc-bio-007', 'ciencias', 'biologia', 'evolucion', 'medium', 'La selección natural favorece:', ['Individuos grandes', 'Individuos mejor adaptados', 'Individuos antiguos', 'Todos por igual'], 1, 'La selección natural favorece a los mejor adaptados al ambiente.'],
    ['cie-mc-bio-008', 'ciencias', 'biologia', 'evolucion', 'easy', 'Evidencia de la evolución:', ['Fósiles', 'Fotosíntesis', 'Respiración', 'Mitosis', 'Ósmosis'], 0, 'Los fósiles son evidencia directa de la evolución.'],
    ['cie-mc-bio-009', 'ciencias', 'biologia', 'ecosistema', 'medium', 'Los organismos productores son:', ['Carnívoros', 'Herbívoros', 'Plantas', 'Descomponedores'], 2, 'Las plantas son productores autótrofos.'],
    ['cie-mc-bio-010', 'ciencias', 'biologia', 'ecosistema', 'medium', 'La fotosíntesis ocurre en:', ['Mitocondrias', 'Cloroplastos', 'Núcleo', 'Ribosomas'], 1, 'La fotosíntesis ocurre en los cloroplastos.'],
    ['cie-mc-bio-011', 'ciencias', 'biologia', 'celula', 'medium', 'Función del retículo endoplasmático rugoso:', ['Síntesis de lípidos', 'Síntesis de proteínas', 'Digestión', 'Almacenamiento'], 1, 'El RE rugoso sintetiza proteínas.', true], // PILOT
    ['cie-mc-bio-012', 'ciencias', 'biologia', 'reproduccion', 'hard', 'La fecundación ocurre en:', ['Útero', 'Ovario', 'Trompa de Falopio', 'Vagina'], 2, 'La fecundación ocurre en la trompa de Falopio.'],
    ['cie-mc-bio-013', 'ciencias', 'biologia', 'genetica', 'medium', 'La meiosis produce células con:', ['Mismo número de cromosomas', 'Doble de cromosomas', 'Mitad de cromosomas', 'Sin cromosomas'], 2, 'La meiosis reduce los cromosomas a la mitad.'],
    ['cie-mc-bio-014', 'ciencias', 'biologia', 'evolucion', 'medium', 'Las estructuras homólogas indican:', ['Evolución convergente', 'Ancestro común', 'Selección artificial', 'Mutación aleatoria'], 1, 'Estructuras homólogas indican ancestro común.'],
    ['cie-mc-bio-015', 'ciencias', 'biologia', 'ecosistema', 'easy', 'Los consumidores primarios son:', ['Productores', 'Herbívoros', 'Carnívoros', 'Descomponedores'], 1, 'Los herbívoros son consumidores primarios.'],
    ['cie-mc-bio-016', 'ciencias', 'biologia', 'celula', 'medium', 'La pared celular vegetal es de:', ['Proteínas', 'Lípidos', 'Celulosa', 'ADN'], 2, 'La pared celular está hecha de celulosa.'],
    ['cie-mc-bio-017', 'ciencias', 'biologia', 'reproduccion', 'medium', 'El VIH se transmite por:', ['Contacto casual', 'Mosquitos', 'Relaciones sin protección', 'Utensilios'], 2, 'El VIH se transmite por relaciones sexuales sin protección.'],
    ['cie-mc-bio-018', 'ciencias', 'biologia', 'ecosistema', 'hard', 'El oxígeno de la fotosíntesis proviene de:', ['CO₂', 'H₂O', 'Glucosa', 'ATP'], 1, 'El oxígeno proviene de la fotólisis del agua.']
];

biologiaComun.forEach((q, idx) => {
    if (idx > 0) questionCode += ',\n';
    questionCode += generateQuestion(...q);
});

console.log('Generated', biologiaComun.length, 'Biología común questions');

// Write to file
const filePath = path.join(__dirname, '../src/data/simulations/ciencias/simulacro_biologia_001.ts');
fs.writeFileSync(filePath, header + questionCode + '\n' + footer, 'utf8');
console.log('✅ Created simulacro_biologia_001.ts with', biologiaComun.length, 'questions (partial)');
console.log('Note: This is a starter file. Complete implementation requires all 80 questions.');
