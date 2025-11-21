/**
 * Progressive Exercises - Ciencias - Biología Celular
 * Nivel Básico: Estructura y función de organelos
 */

import { Question } from '../questions';

export const celulasBasico: Question[] = [
    {
        id: 'cie-cel-bas-001',
        type: 'multiple-choice',
        subject: 'ciencias',
        axis: 'biologia',
        topic: 'celula',
        difficulty: 'easy',
        difficultyLevel: 'basico',
        text: '¿Cuál es la función principal de las mitocondrias?',
        options: [
            'Realizar la fotosíntesis',
            'Producir energía (ATP)',
            'Sintetizar proteínas',
            'Almacenar información genética'
        ],
        correctAnswer: 1,
        solution: 'Las mitocondrias son las "centrales energéticas" de la célula. Producen ATP mediante la respiración celular.',
        strategy: 'Asocia cada organelo con su función principal. Mitocondrias = energía.',
        timeRecommended: 50,
        errorAnalysis: [
            {
                commonMistake: 'Confundir con cloroplastos (fotosíntesis)',
                explanation: 'Los cloroplastos realizan fotosíntesis en células vegetales. Las mitocondrias producen energía en todas las células.',
                preventionTip: 'Cloroplastos = plantas + luz → fotosíntesis. Mitocondrias = todas las células → energía.'
            },
            {
                commonMistake: 'Confundir con ribosomas (síntesis de proteínas)',
                explanation: 'Los ribosomas sintetizan proteínas, no las mitocondrias.',
                preventionTip: 'Ribosomas = proteínas. Mitocondrias = energía (ATP).'
            }
        ]
    },
    {
        id: 'cie-cel-bas-002',
        type: 'multiple-choice',
        subject: 'ciencias',
        axis: 'biologia',
        topic: 'celula',
        difficulty: 'easy',
        difficultyLevel: 'basico',
        text: '¿Qué estructura celular controla el paso de sustancias hacia dentro y fuera de la célula?',
        options: [
            'Núcleo',
            'Membrana plasmática',
            'Pared celular',
            'Citoplasma'
        ],
        correctAnswer: 1,
        solution: 'La membrana plasmática es selectivamente permeable, controlando qué entra y sale de la célula.',
        strategy: 'Membrana = barrera selectiva. Controla el intercambio con el exterior.',
        timeRecommended: 50,
        errorAnalysis: [
            {
                commonMistake: 'Confundir con pared celular',
                explanation: 'La pared celular da soporte estructural, pero no controla selectivamente el paso de sustancias.',
                preventionTip: 'Pared celular = soporte (solo en plantas). Membrana plasmática = control selectivo (todas las células).'
            }
        ]
    },
    {
        id: 'cie-cel-bas-003',
        type: 'multiple-choice',
        subject: 'ciencias',
        axis: 'biologia',
        topic: 'celula',
        difficulty: 'easy',
        difficultyLevel: 'basico',
        text: '¿Dónde se encuentra el material genético (ADN) en una célula eucariota?',
        options: [
            'En el citoplasma',
            'En las mitocondrias',
            'En el núcleo',
            'En los ribosomas'
        ],
        correctAnswer: 2,
        solution: 'En células eucariotas, el ADN está protegido dentro del núcleo.',
        strategy: 'Núcleo = centro de control = ADN. Es la característica principal de células eucariotas.',
        timeRecommended: 45,
        errorAnalysis: [
            {
                commonMistake: 'Pensar que está en el citoplasma',
                explanation: 'En células procariotas (bacterias) el ADN está en el citoplasma, pero en eucariotas está en el núcleo.',
                preventionTip: 'Eucariotas = núcleo con ADN. Procariotas = sin núcleo, ADN en citoplasma.'
            }
        ]
    },
    {
        id: 'cie-cel-bas-004',
        type: 'multiple-choice',
        subject: 'ciencias',
        axis: 'biologia',
        topic: 'celula',
        difficulty: 'easy',
        difficultyLevel: 'basico',
        text: '¿Cuál de las siguientes estructuras está presente SOLO en células vegetales?',
        options: [
            'Mitocondrias',
            'Ribosomas',
            'Cloroplastos',
            'Núcleo'
        ],
        correctAnswer: 2,
        solution: 'Los cloroplastos realizan la fotosíntesis y solo están presentes en células vegetales.',
        strategy: 'Cloroplastos = verde = plantas. Es exclusivo de células vegetales.',
        timeRecommended: 50,
        errorAnalysis: [
            {
                commonMistake: 'Pensar que las mitocondrias son exclusivas de plantas',
                explanation: 'Las mitocondrias están en TODAS las células eucariotas (animales y vegetales).',
                preventionTip: 'Mitocondrias = todas las células. Cloroplastos = solo plantas.'
            }
        ]
    },
    {
        id: 'cie-cel-bas-005',
        type: 'multiple-choice',
        subject: 'ciencias',
        axis: 'biologia',
        topic: 'celula',
        difficulty: 'easy',
        difficultyLevel: 'basico',
        text: '¿Qué organelo es responsable de la síntesis de proteínas?',
        options: [
            'Aparato de Golgi',
            'Ribosomas',
            'Lisosomas',
            'Retículo endoplasmático'
        ],
        correctAnswer: 1,
        solution: 'Los ribosomas son los organelos donde se sintetizan las proteínas a partir del ARN mensajero.',
        strategy: 'Ribosomas = fábricas de proteínas. Están libres en el citoplasma o adheridos al retículo.',
        timeRecommended: 55,
        errorAnalysis: [
            {
                commonMistake: 'Confundir con el retículo endoplasmático',
                explanation: 'El retículo endoplasmático TRANSPORTA proteínas, pero quien las SINTETIZA son los ribosomas.',
                preventionTip: 'Ribosomas = fabrican proteínas. Retículo = transporta y modifica proteínas.'
            }
        ]
    }
];
