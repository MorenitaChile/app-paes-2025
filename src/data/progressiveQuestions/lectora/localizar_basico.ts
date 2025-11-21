/**
 * Progressive Exercises - Competencia Lectora - Localizar
 * Nivel Básico: Extracción de información explícita
 */

import { Question } from '../questions';

export const localizarBasico: Question[] = [
    {
        id: 'lec-localizar-bas-001',
        type: 'multiple-choice',
        subject: 'lectora',
        axis: 'comprension',
        topic: 'localizar',
        difficulty: 'easy',
        difficultyLevel: 'basico',
        text: 'Lee el siguiente texto:\n\n"El 12 de octubre de 1492, Cristóbal Colón llegó a América. Este acontecimiento marcó el inicio de la colonización europea del continente."\n\n¿En qué fecha llegó Colón a América?',
        options: [
            '12 de octubre de 1492',
            '12 de diciembre de 1492',
            '10 de octubre de 1492',
            '12 de octubre de 1482'
        ],
        correctAnswer: 0,
        solution: 'La información está explícita en la primera oración: "El 12 de octubre de 1492".',
        strategy: 'Busca la coincidencia literal entre la pregunta y el texto. La información está escrita directamente.',
        timeRecommended: 45,
        errorAnalysis: [
            {
                commonMistake: 'Confundir el mes (octubre/diciembre)',
                explanation: 'Leer rápidamente puede hacer que confundas "octubre" con "diciembre".',
                preventionTip: 'Lee con atención cada palabra clave. Subraya la fecha en el texto antes de responder.'
            },
            {
                commonMistake: 'Confundir el año (1492/1482)',
                explanation: 'Los números similares pueden confundirse al leer rápido.',
                preventionTip: 'Verifica cada dígito del año. 1492 es la fecha correcta.'
            }
        ]
    },
    {
        id: 'lec-localizar-bas-002',
        type: 'multiple-choice',
        subject: 'lectora',
        axis: 'comprension',
        topic: 'localizar',
        difficulty: 'easy',
        difficultyLevel: 'basico',
        text: 'Lee el siguiente texto:\n\n"La fotosíntesis es el proceso mediante el cual las plantas verdes transforman la energía solar en energía química. Este proceso ocurre principalmente en las hojas."\n\n¿Dónde ocurre principalmente la fotosíntesis?',
        options: [
            'En las raíces',
            'En el tallo',
            'En las hojas',
            'En las flores'
        ],
        correctAnswer: 2,
        solution: 'El texto dice explícitamente: "Este proceso ocurre principalmente en las hojas".',
        strategy: 'Identifica la palabra clave de la pregunta ("dónde") y búscala en el texto.',
        timeRecommended: 50,
        errorAnalysis: [
            {
                commonMistake: 'Responder con conocimiento previo en lugar del texto',
                explanation: 'Aunque sepas que las raíces absorben agua, la pregunta pide información DEL TEXTO.',
                preventionTip: 'Siempre vuelve al texto. No respondas con lo que sabes, sino con lo que dice el texto.'
            }
        ]
    },
    {
        id: 'lec-localizar-bas-003',
        type: 'multiple-choice',
        subject: 'lectora',
        axis: 'comprension',
        topic: 'localizar',
        difficulty: 'easy',
        difficultyLevel: 'basico',
        text: 'Lee el siguiente fragmento:\n\n"Gabriel García Márquez, escritor colombiano, ganó el Premio Nobel de Literatura en 1982. Su obra más famosa es Cien años de soledad."\n\n¿Qué nacionalidad tenía Gabriel García Márquez?',
        options: [
            'Mexicana',
            'Colombiana',
            'Argentina',
            'Española'
        ],
        correctAnswer: 1,
        solution: 'El texto indica claramente: "escritor colombiano".',
        strategy: 'Busca el dato específico solicitado. Está escrito de forma literal.',
        timeRecommended: 40,
        errorAnalysis: [
            {
                commonMistake: 'Confundir con otros autores latinoamericanos',
                explanation: 'Si conoces otros autores, podrías confundir nacionalidades.',
                preventionTip: 'Lee el texto completo antes de responder. La respuesta siempre está en el texto.'
            }
        ]
    },
    {
        id: 'lec-localizar-bas-004',
        type: 'multiple-choice',
        subject: 'lectora',
        axis: 'comprension',
        topic: 'localizar',
        difficulty: 'easy',
        difficultyLevel: 'basico',
        text: 'Lee el siguiente texto:\n\n"El agua hierve a 100 grados Celsius al nivel del mar. A mayor altitud, el punto de ebullición disminuye debido a la menor presión atmosférica."\n\n¿A qué temperatura hierve el agua al nivel del mar?',
        options: [
            '0 grados Celsius',
            '50 grados Celsius',
            '100 grados Celsius',
            '212 grados Celsius'
        ],
        correctAnswer: 2,
        solution: 'La primera oración lo dice explícitamente: "El agua hierve a 100 grados Celsius al nivel del mar".',
        strategy: 'Identifica las palabras clave: "temperatura", "hierve", "nivel del mar". Busca esa combinación en el texto.',
        timeRecommended: 45,
        errorAnalysis: [
            {
                commonMistake: 'Confundir con la escala Fahrenheit (212°F)',
                explanation: 'El texto especifica "grados Celsius", no Fahrenheit.',
                preventionTip: 'Lee la unidad de medida. El texto dice "Celsius", no "Fahrenheit".'
            }
        ]
    },
    {
        id: 'lec-localizar-bas-005',
        type: 'multiple-choice',
        subject: 'lectora',
        axis: 'comprension',
        topic: 'localizar',
        difficulty: 'easy',
        difficultyLevel: 'basico',
        text: 'Lee el siguiente texto:\n\n"La Revolución Francesa comenzó en 1789 con la toma de la Bastilla. Este evento simbolizó el fin del absolutismo monárquico en Francia."\n\n¿Qué evento marcó el inicio de la Revolución Francesa?',
        options: [
            'La coronación del rey',
            'La toma de la Bastilla',
            'La Declaración de Independencia',
            'La firma de un tratado'
        ],
        correctAnswer: 1,
        solution: 'El texto dice: "La Revolución Francesa comenzó en 1789 con la toma de la Bastilla".',
        strategy: 'Busca sinónimos o paráfrasis. "Comenzó" = "marcó el inicio". "Con la toma de la Bastilla" es la respuesta.',
        timeRecommended: 50,
        errorAnalysis: [
            {
                commonMistake: 'No identificar la paráfrasis',
                explanation: 'La pregunta dice "marcó el inicio" y el texto dice "comenzó". Son sinónimos.',
                preventionTip: 'Busca palabras con significado similar, no solo coincidencias exactas.'
            }
        ]
    }
];
