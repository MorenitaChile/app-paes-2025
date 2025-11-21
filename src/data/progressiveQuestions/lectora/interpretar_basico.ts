/**
 * Progressive Exercises - Competencia Lectora - Interpretar
 * Nivel Básico: Inferencias simples basadas en el texto
 */

import { Question } from '../../questions';

export const interpretarBasico: Question[] = [
    {
        id: 'lec-interpretar-bas-001',
        type: 'multiple-choice',
        subject: 'lectora',
        axis: 'comprension',
        topic: 'interpretar',
        difficulty: 'easy',
        difficultyLevel: 'basico',
        text: 'Lee el siguiente texto:\n\n"Ana llegó tarde a la reunión. Cuando entró, todos la miraron en silencio. Ella bajó la cabeza y se sentó rápidamente en la última fila."\n\n¿Cómo se sentía probablemente Ana?',
        options: [
            'Orgullosa',
            'Avergonzada',
            'Enojada',
            'Alegre'
        ],
        correctAnswer: 1,
        solution: 'Las pistas textuales ("bajó la cabeza", "se sentó rápidamente en la última fila") indican vergüenza o incomodidad.',
        strategy: 'Busca pistas en las acciones y descripciones. "Bajar la cabeza" es señal de vergüenza.',
        timeRecommended: 60,
        errorAnalysis: [
            {
                commonMistake: 'Responder con conocimiento previo en lugar de inferir del texto',
                explanation: 'Algunos piensan "yo me enojaría" en lugar de interpretar las señales del texto.',
                preventionTip: 'Basa tu respuesta en LAS ACCIONES descritas en el texto, no en tu experiencia personal.'
            }
        ]
    },
    {
        id: 'lec-interpretar-bas-002',
        type: 'multiple-choice',
        subject: 'lectora',
        axis: 'comprension',
        topic: 'interpretar',
        difficulty: 'easy',
        difficultyLevel: 'basico',
        text: 'Lee el siguiente texto:\n\n"El cielo se oscureció rápidamente. Las nubes grises cubrieron el sol. La gente comenzó a correr buscando refugio."\n\n¿Qué evento se puede inferir que está por ocurrir?',
        options: [
            'Un terremoto',
            'Una lluvia o tormenta',
            'Un eclipse',
            'La noche'
        ],
        correctAnswer: 1,
        solution: 'Las pistas "cielo oscurecido", "nubes grises", "gente buscando refugio" indican que va a llover o habrá tormenta.',
        strategy: 'Relaciona las pistas: cielo oscuro + nubes grises + gente corriendo = lluvia inminente.',
        timeRecommended: 70,
        errorAnalysis: [
            {
                commonMistake: 'Confundir con la llegada de la noche',
                explanation: 'La noche no hace que la gente corra a refugiarse, ni se menciona la hora.',
                preventionTip: 'Pregúntate: ¿por qué la gente busca refugio? Por lluvia, no por la noche.'
            }
        ]
    },
    {
        id: 'lec-interpretar-bas-003',
        type: 'multiple-choice',
        subject: 'lectora',
        axis: 'comprension',
        topic: 'interpretar',
        difficulty: 'easy',
        difficultyLevel: 'basico',
        text: 'Lee el siguiente texto:\n\n"Pedro estudió toda la noche para el examen. Al día siguiente, cuando recibió su prueba, sonrió ampliamente y guardó el papel en su mochila con cuidado."\n\n¿Qué se puede inferir sobre el resultado del examen de Pedro?',
        options: [
            'Le fue mal',
            'Le fue bien',
            'No terminó el examen',
            'Perdió el examen'
        ],
        correctAnswer: 1,
        solution: 'La sonrisa amplia y el cuidado al guardar el papel indican satisfacción con el resultado.',
        strategy: 'Las emociones y acciones revelan resultados. Sonreír ampliamente = satisfacción = buen resultado.',
        timeRecommended: 65,
        errorAnalysis: [
            {
                commonMistake: 'Pensar que estudiar toda la noche significa cansancio y mal resultado',
                explanation: 'El texto no menciona cansancio, solo la sonrisa al recibir la nota.',
                preventionTip: 'Enfócate en las acciones DESPUÉS del examen: sonrió ampliamente.'
            }
        ]
    },
    {
        id: 'lec-interpretar-bas-004',
        type: 'multiple-choice',
        subject: 'lectora',
        axis: 'comprension',
        topic: 'interpretar',
        difficulty: 'easy',
        difficultyLevel: 'basico',
        text: 'Lee el siguiente texto:\n\n"La tienda estaba vacía. Las estanterías no tenían productos. Un cartel en la puerta decía \'Gracias por 20 años\'."\n\n¿Qué se puede inferir sobre la tienda?',
        options: [
            'Está en remodelación',
            'Acaba de abrir',
            'Cerró definitivamente',
            'Está celebrando un aniversario'
        ],
        correctAnswer: 2,
        solution: 'Tienda vacía + estanterías sin productos + cartel de despedida = cierre definitivo.',
        strategy: 'Combina todas las pistas. "Gracias por 20 años" es un mensaje de despedida, no de celebración.',
        timeRecommended: 70,
        errorAnalysis: [
            {
                commonMistake: 'Pensar que "20 años" significa celebración',
                explanation: 'El contexto (vacía, sin productos) indica cierre, no fiesta.',
                preventionTip: 'Lee TODAS las pistas juntas. Vacía + sin productos + "gracias" = despedida.'
            }
        ]
    },
    {
        id: 'lec-interpretar-bas-005',
        type: 'multiple-choice',
        subject: 'lectora',
        axis: 'comprension',
        topic: 'interpretar',
        difficulty: 'easy',
        difficultyLevel: 'basico',
        text: 'Lee el siguiente texto:\n\n"Sofía miró su reloj por quinta vez en diez minutos. Caminaba de un lado a otro frente a la puerta del cine. Cada vez que alguien se acercaba, levantaba la vista esperanzada."\n\n¿Qué se puede inferir sobre Sofía?',
        options: [
            'Está perdida',
            'Está esperando a alguien',
            'Llegó muy temprano al cine',
            'No quiere entrar al cine'
        ],
        correctAnswer: 1,
        solution: 'Mirar el reloj repetidamente + caminar nerviosamente + mirar esperanzada a quien se acerca = espera a alguien.',
        strategy: 'Identifica el patrón de comportamiento. Mirar el reloj + esperar = está esperando a alguien.',
        timeRecommended: 75,
        errorAnalysis: [
            {
                commonMistake: 'Pensar que solo llegó temprano',
                explanation: 'Llegar temprano no explica por qué mira esperanzada a cada persona.',
                preventionTip: 'La clave es "levantaba la vista esperanzada" cada vez que alguien se acercaba.'
            }
        ]
    }
];
