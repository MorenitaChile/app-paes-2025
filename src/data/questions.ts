export type Question = {
    id: string;
    type: 'multiple-choice' | 'open-ended' | 'problem-solving';
    subject: string;
    axis: string;
    topic: string;
    difficulty: 'easy' | 'medium' | 'hard';
    difficultyLevel?: 'basico' | 'intermedio' | 'avanzado'; // Progressive difficulty
    text: string;
    options?: string[];
    correctAnswer?: number | string;
    rubric?: {
        criteria: string;
        weight: number;
        description: string;
    }[];
    hints?: string[];
    solution?: string;
    errorAnalysis?: { // Common mistakes and explanations
        commonMistake: string;
        explanation: string;
        preventionTip: string;
    }[];
    strategy?: string; // Resolution strategy for this question
    timeRecommended?: number; // Recommended time in seconds
};

export type Essay = {
    id: string;
    subject: string;
    title: string;
    description: string;
    timeLimit: number; // minutes
    questions: Question[];
};

export type Simulation = {
    id: string;
    subject: 'lectora' | 'm1' | 'm2' | 'ciencias' | 'historia';
    title: string;
    description: string;
    totalQuestions: number; // Total including pilot questions
    validQuestions: number; // Questions that count for score
    pilotQuestions: number; // Questions for research (not scored)
    timeLimit: number; // minutes
    optionsCount: 4 | 5; // Number of options per question
    questions: Question[];
    format: 'DEMRE'; // Official DEMRE format
};

// Sample Essays for each subject
export const ESSAY_BANK: Record<string, Essay[]> = {
    lectora: [
        {
            id: 'lec-001',
            subject: 'lectora',
            title: 'Análisis de Textos Argumentativos',
            description: 'Ensayo enfocado en la comprensión y análisis de argumentación',
            timeLimit: 45,
            questions: [
                {
                    id: 'lec-001-q1',
                    type: 'multiple-choice',
                    subject: 'lectora',
                    axis: 'comprension',
                    topic: 'evaluar',
                    difficulty: 'medium',
                    text: 'Lee el siguiente fragmento: "El cambio climático representa uno de los desafíos más urgentes de nuestra era. Los datos científicos muestran un aumento sostenido de la temperatura global, directamente relacionado con las emisiones de gases de efecto invernadero. Es imperativo que los gobiernos implementen políticas ambientales más estrictas."\n\n¿Cuál es la tesis central del autor?',
                    options: [
                        "El cambio climático es un fenómeno natural cíclico.",
                        "La temperatura global ha aumentado levemente.",
                        "Los gobiernos deben actuar urgentemente ante el cambio climático.",
                        "La ciencia no tiene datos concluyentes sobre el clima."
                    ],
                    correctAnswer: 2,
                    solution: 'La tesis es la postura principal que defiende el autor: "Es imperativo que los gobiernos implementen políticas...".'
                }
            ]
        },
        {
            id: 'lec-002',
            subject: 'lectora',
            title: 'Interpretación de Infografías',
            description: 'Análisis de textos discontinuos y gráficos',
            timeLimit: 40,
            questions: [
                {
                    id: 'lec-002-q1',
                    type: 'multiple-choice',
                    subject: 'lectora',
                    axis: 'interpretar',
                    topic: 'interpretar',
                    difficulty: 'easy',
                    text: 'Observa la infografía sobre "El Ciclo del Agua" (evaporación -> condensación -> precipitación). Según el ciclo, ¿qué proceso ocurre inmediatamente después de la condensación?',
                    options: [
                        "Evaporación",
                        "Precipitación",
                        "Infiltración",
                        "Transpiración"
                    ],
                    correctAnswer: 1,
                    solution: 'En el ciclo del agua, una vez que el vapor se condensa en nubes, el agua cae nuevamente a la tierra mediante la precipitación.'
                }
            ]
        },
        {
            id: 'lec-003',
            subject: 'lectora',
            title: 'Vocabulario Contextual',
            description: 'Ejercicios de léxico en contexto',
            timeLimit: 30,
            questions: [
                {
                    id: 'lec-003-q1',
                    type: 'multiple-choice',
                    subject: 'lectora',
                    axis: 'comprension',
                    topic: 'interpretar',
                    difficulty: 'medium',
                    text: 'En la frase: "Su actitud *displicente* molestó a los presentes", ¿cuál es el mejor sinónimo para la palabra destacada?',
                    options: [
                        "Amable",
                        "Indiferente",
                        "Entusiasta",
                        "Agresiva"
                    ],
                    correctAnswer: 1,
                    solution: 'Displicente se refiere a una actitud de desgano o indiferencia, lo cual encaja con el contexto de causar molestia.'
                }
            ]
        },
        {
            id: 'lec-004',
            subject: 'lectora',
            title: 'Textos Literarios: Narrativa',
            description: 'Análisis de elementos narrativos y conflicto',
            timeLimit: 40,
            questions: [
                {
                    id: 'lec-004-q1',
                    type: 'multiple-choice',
                    subject: 'lectora',
                    axis: 'comprension',
                    topic: 'interpretar',
                    difficulty: 'medium',
                    text: 'Lee el microcuento: "Cuando despertó, el dinosaurio todavía estaba allí." (Augusto Monterroso). ¿Qué sugiere principalmente este final?',
                    options: [
                        "Que el protagonista sigue soñando.",
                        "Que los dinosaurios no se extinguieron.",
                        "La persistencia de un elemento fantástico en la realidad.",
                        "Que el protagonista tiene una mascota exótica."
                    ],
                    correctAnswer: 2,
                    solution: 'El microcuento juega con la ambigüedad entre el sueño y la vigilia, sugiriendo que lo soñado (el dinosaurio) es real o persiste.'
                }
            ]
        },
        {
            id: 'lec-005',
            subject: 'lectora',
            title: 'Medios Masivos: Noticias',
            description: 'Evaluación de veracidad y propósito en noticias',
            timeLimit: 35,
            questions: [
                {
                    id: 'lec-005-q1',
                    type: 'multiple-choice',
                    subject: 'lectora',
                    axis: 'evaluar',
                    topic: 'evaluar',
                    difficulty: 'hard',
                    text: 'Analiza el titular: "¡Milagro! Dieta de limón cura todas las enfermedades". ¿Por qué este titular carece de credibilidad?',
                    options: [
                        "Porque el limón es muy ácido.",
                        "Porque usa signos de exclamación.",
                        "Porque hace una generalización sin evidencia científica.",
                        "Porque es muy corto."
                    ],
                    correctAnswer: 2,
                    solution: 'Afirmar que algo cura "todas" las enfermedades es una generalización excesiva y científicamente improbable, típica del sensacionalismo.'
                }
            ]
        }
    ],
    ciencias: [
        {
            id: 'cie-001',
            subject: 'ciencias',
            title: 'Mecánica y Fuerzas',
            description: 'Problemas de aplicación de leyes de Newton',
            timeLimit: 60,
            questions: [
                {
                    id: 'cie-001-q1',
                    type: 'multiple-choice',
                    subject: 'ciencias',
                    axis: 'fisica',
                    topic: 'mecanica',
                    difficulty: 'medium',
                    text: 'Un objeto de masa 5 kg se desliza por un plano inclinado de 30° sin roce. ¿Cuál es su aceleración? (Considera g = 10 m/s²)',
                    options: [
                        "2 m/s²",
                        "5 m/s²",
                        "10 m/s²",
                        "50 m/s²"
                    ],
                    correctAnswer: 1,
                    solution: 'La fuerza que acelera es la componente del peso: F = m·g·sen(30°). a = F/m = g·sen(30°) = 10 · 0.5 = 5 m/s².'
                }
            ]
        },
        {
            id: 'cie-002',
            subject: 'ciencias',
            title: 'Biología Celular',
            description: 'Estructura y función de organelos',
            timeLimit: 45,
            questions: [
                {
                    id: 'cie-002-q1',
                    type: 'multiple-choice',
                    subject: 'ciencias',
                    axis: 'biologia',
                    topic: 'celula',
                    difficulty: 'medium',
                    text: '¿Cuál es la principal diferencia funcional entre mitocondrias y cloroplastos?',
                    options: [
                        "La mitocondria hace fotosíntesis y el cloroplasto respiración.",
                        "La mitocondria realiza respiración celular y el cloroplasto fotosíntesis.",
                        "Ambos realizan fotosíntesis pero en distintas células.",
                        "La mitocondria almacena agua y el cloroplasto energía."
                    ],
                    correctAnswer: 1,
                    solution: 'La mitocondria es el centro de la respiración celular (obtención de ATP) en eucariontes, mientras que el cloroplasto realiza la fotosíntesis en células vegetales.'
                }
            ]
        },
        {
            id: 'cie-003',
            subject: 'ciencias',
            title: 'Química: Estequiometría',
            description: 'Cálculos de moles y masa',
            timeLimit: 50,
            questions: [
                {
                    id: 'cie-003-q1',
                    type: 'multiple-choice',
                    subject: 'ciencias',
                    axis: 'quimica',
                    topic: 'reacciones',
                    difficulty: 'hard',
                    text: 'Dada la reacción: 2H₂ + O₂ → 2H₂O. Si reaccionan 4 gramos de H₂ con suficiente O₂, ¿cuántos gramos de agua se producen? (Masas molares: H=1, O=16)',
                    options: [
                        "18 g",
                        "36 g",
                        "4 g",
                        "32 g"
                    ],
                    correctAnswer: 1,
                    solution: '4g H₂ son 2 moles (4g / 2g/mol). La relación es 2:2, así que se producen 2 moles de H₂O. Masa molar H₂O = 18g/mol. 2 * 18 = 36g.'
                }
            ]
        },
        {
            id: 'cie-004',
            subject: 'ciencias',
            title: 'Física: Ondas y Sonido',
            description: 'Propiedades del sonido y efecto Doppler',
            timeLimit: 45,
            questions: [
                {
                    id: 'cie-004-q1',
                    type: 'multiple-choice',
                    subject: 'ciencias',
                    axis: 'fisica',
                    topic: 'ondas',
                    difficulty: 'medium',
                    text: 'Una ambulancia se acerca a una persona con su sirena encendida. ¿Cómo percibe la persona el sonido en comparación con el conductor?',
                    options: [
                        "Más grave (menor frecuencia)",
                        "Más agudo (mayor frecuencia)",
                        "Igual frecuencia",
                        "Más lento"
                    ],
                    correctAnswer: 1,
                    solution: 'Debido al Efecto Doppler, cuando la fuente se acerca, las ondas se comprimen frente a ella, aumentando la frecuencia percibida (más agudo).'
                }
            ]
        },
        {
            id: 'cie-005',
            subject: 'ciencias',
            title: 'Método Científico',
            description: 'Diseño experimental y variables',
            timeLimit: 40,
            questions: [
                {
                    id: 'cie-005-q1',
                    type: 'multiple-choice',
                    subject: 'ciencias',
                    axis: 'biologia',
                    topic: 'procesos',
                    difficulty: 'medium',
                    text: 'Se quiere probar si la luz afecta el crecimiento de una planta. ¿Cuál sería la Variable Independiente (VI) y la Dependiente (VD)?',
                    options: [
                        "VI: Crecimiento, VD: Luz",
                        "VI: Luz, VD: Crecimiento",
                        "VI: Agua, VD: Luz",
                        "VI: Tiempo, VD: Agua"
                    ],
                    correctAnswer: 1,
                    solution: 'La Variable Independiente es la que manipulamos (Luz) y la Dependiente es la que observamos como respuesta (Crecimiento).'
                }
            ]
        }
    ],

    m1: [
        // ... existing m1 essays ...
        {
            id: 'm1-001',
            subject: 'm1',
            title: 'Geometría: Volúmenes',
            description: 'Cálculo de áreas y volúmenes de cubos y paralelepípedos',
            timeLimit: 50,
            questions: [
                {
                    id: 'm1-001-q1',
                    type: 'multiple-choice',
                    subject: 'm1',
                    axis: 'geometria',
                    topic: 'cuerpos',
                    difficulty: 'medium',
                    text: 'Un paralelepípedo recto de base cuadrada tiene un volumen de 1000 cm³. Si la altura es el doble del lado de la base, ¿cuánto mide el lado de la base?',
                    options: [
                        "5 cm",
                        "7.94 cm (aprox)",
                        "10 cm",
                        "20 cm"
                    ],
                    correctAnswer: 1,
                    solution: 'V = x² · 2x = 2x³. 1000 = 2x³ → 500 = x³ → x = ∛500 ≈ 7.94 cm.'
                }
            ]
        },
        {
            id: 'm1-002',
            subject: 'm1',
            title: 'Álgebra: Ecuaciones',
            description: 'Resolución de problemas con ecuaciones de primer grado',
            timeLimit: 40,
            questions: [
                {
                    id: 'm1-002-q1',
                    type: 'multiple-choice',
                    subject: 'm1',
                    axis: 'algebra',
                    topic: 'ecuaciones',
                    difficulty: 'medium',
                    text: 'La suma de tres números consecutivos es 48. ¿Cuál es el número mayor?',
                    options: [
                        "15",
                        "16",
                        "17",
                        "18"
                    ],
                    correctAnswer: 2,
                    solution: 'x + (x+1) + (x+2) = 48 → 3x + 3 = 48 → 3x = 45 → x = 15. Los números son 15, 16 y 17. El mayor es 17.'
                }
            ]
        },
        {
            id: 'm1-003',
            subject: 'm1',
            title: 'Probabilidad Básica',
            description: 'Regla de Laplace y eventos simples',
            timeLimit: 35,
            questions: [
                {
                    id: 'm1-003-q1',
                    type: 'multiple-choice',
                    subject: 'm1',
                    axis: 'probabilidad',
                    topic: 'probabilidad',
                    difficulty: 'easy',
                    text: 'En una urna hay 3 bolitas rojas y 2 azules. ¿Cuál es la probabilidad de sacar una bolita roja?',
                    options: [
                        "2/5",
                        "3/5",
                        "1/3",
                        "1/2"
                    ],
                    correctAnswer: 1,
                    solution: 'Casos favorables (rojas): 3. Casos totales (3+2): 5. Probabilidad = 3/5.'
                }
            ]
        },
        {
            id: 'm1-004',
            subject: 'm1',
            title: 'Números Enteros y Operatoria',
            description: 'Resolución de problemas con enteros',
            timeLimit: 30,
            questions: [
                {
                    id: 'm1-004-q1',
                    type: 'multiple-choice',
                    subject: 'm1',
                    axis: 'numeros',
                    topic: 'enteros',
                    difficulty: 'easy',
                    text: 'En una ciudad la temperatura mínima fue de -5°C y la máxima de 12°C. ¿Cuál fue la variación de temperatura?',
                    options: [
                        "7°C",
                        "17°C",
                        "-17°C",
                        "12°C"
                    ],
                    correctAnswer: 1,
                    solution: 'Variación = Máxima - Mínima = 12 - (-5) = 12 + 5 = 17°C.'
                }
            ]
        },
        {
            id: 'm1-005',
            subject: 'm1',
            title: 'Estadística Descriptiva',
            description: 'Media, moda y mediana',
            timeLimit: 40,
            questions: [
                {
                    id: 'm1-005-q1',
                    type: 'multiple-choice',
                    subject: 'm1',
                    axis: 'probabilidad',
                    topic: 'estadistica',
                    difficulty: 'medium',
                    text: 'Las notas de un alumno son: 5.0, 6.0, 4.0, 5.0, 7.0. ¿Cuál es la mediana?',
                    options: [
                        "5.0",
                        "5.4",
                        "6.0",
                        "4.0"
                    ],
                    correctAnswer: 0,
                    solution: 'Ordenando los datos: 4.0, 5.0, 5.0, 6.0, 7.0. El dato central es 5.0.'
                }
            ]
        },
        {
            id: 'm1-006',
            subject: 'm1',
            title: 'Ensayo M1: Geometría y Datos',
            description: 'Evaluación integral de ejes de Geometría y Probabilidad',
            timeLimit: 60,
            questions: [
                {
                    id: 'm1-006-q1',
                    type: 'multiple-choice',
                    subject: 'm1',
                    axis: 'geometria',
                    topic: 'transformaciones',
                    difficulty: 'medium',
                    text: 'Al punto P(2, -3) se le aplica una traslación según el vector v(-1, 4) y luego una reflexión respecto al eje X. ¿Cuáles son las coordenadas finales?',
                    options: ['(1, 1)', '(1, -1)', '(-1, 1)', '(3, -7)'],
                    correctAnswer: 1, // (1, -1)
                    solution: 'Traslación: (2-1, -3+4) = (1, 1). Reflexión eje X: (x, -y) → (1, -1).'
                },
                {
                    id: 'm1-006-q2',
                    type: 'multiple-choice',
                    subject: 'm1',
                    axis: 'probabilidad',
                    topic: 'probabilidad',
                    difficulty: 'hard',
                    text: 'Se lanzan dos dados comunes. ¿Cuál es la probabilidad de que la suma de sus puntos sea mayor que 9?',
                    options: ['1/6', '1/12', '1/9', '5/36'],
                    correctAnswer: 0, // 6/36 = 1/6
                    solution: 'Casos totales: 36. Favorables (suma > 9): (4,6), (5,5), (5,6), (6,4), (6,5), (6,6) → 6 casos. P = 6/36 = 1/6.'
                }
            ]
        },
        {
            id: 'cie-005',
            subject: 'ciencias',
            title: 'Método Científico',
            description: 'Diseño experimental y variables',
            timeLimit: 40,
            questions: [
                {
                    id: 'cie-005-q1',
                    type: 'multiple-choice',
                    subject: 'ciencias',
                    axis: 'biologia',
                    topic: 'procesos',
                    difficulty: 'medium',
                    text: 'Se quiere probar si la luz afecta el crecimiento de una planta. ¿Cuál sería la Variable Independiente (VI) y la Dependiente (VD)?',
                    options: [
                        "VI: Crecimiento, VD: Luz",
                        "VI: Luz, VD: Crecimiento",
                        "VI: Agua, VD: Luz",
                        "VI: Tiempo, VD: Agua"
                    ],
                    correctAnswer: 1,
                    solution: 'La Variable Independiente es la que manipulamos (Luz) y la Dependiente es la que observamos como respuesta (Crecimiento).'
                }
            ]
        }
    ],


    m2: [
        {
            id: 'm2-001',
            subject: 'm2',
            title: 'Funciones Trigonométricas',
            description: 'Análisis de funciones seno y coseno',
            timeLimit: 55,
            questions: [
                {
                    id: 'm2-001-q1',
                    type: 'multiple-choice',
                    subject: 'm2',
                    axis: 'trigonometria',
                    topic: 'funciones_trig',
                    difficulty: 'medium',
                    text: 'Considera la función f(x) = 3·sen(2x) - 1. ¿Cuál es su amplitud y recorrido?',
                    options: [
                        "Amplitud 3, Recorrido [-4, 2]",
                        "Amplitud 2, Recorrido [-1, 1]",
                        "Amplitud 3, Recorrido [-3, 3]",
                        "Amplitud 1, Recorrido [0, 2]"
                    ],
                    correctAnswer: 0,
                    solution: 'Amplitud = |3| = 3. El seno varía entre -1 y 1. 3·[-1,1] = [-3,3]. Restando 1: [-4, 2].'
                }
            ]
        },
        {
            id: 'm2-002',
            subject: 'm2',
            title: 'Logaritmos y Ecuaciones',
            description: 'Propiedades de logaritmos y resolución de ecuaciones logarítmicas',
            timeLimit: 50,
            questions: [
                {
                    id: 'm2-002-q1',
                    type: 'multiple-choice',
                    subject: 'm2',
                    axis: 'algebra_funciones',
                    topic: 'logaritmos',
                    difficulty: 'hard',
                    text: 'Resuelve para x: log₂(x + 2) + log₂(x - 2) = 5',
                    options: [
                        "6",
                        "-6",
                        "±6",
                        "32"
                    ],
                    correctAnswer: 0,
                    solution: 'log₂((x+2)(x-2)) = 5 → x² - 4 = 2⁵ = 32 → x² = 36 → x = ±6. Como el argumento debe ser positivo (x-2>0 → x>2), solo sirve x=6.'
                }
            ]
        },
        {
            id: 'm2-003',
            subject: 'm2',
            title: 'Geometría 3D: Vectores',
            description: 'Operaciones con vectores en el espacio',
            timeLimit: 45,
            questions: [
                {
                    id: 'm2-003-q1',
                    type: 'multiple-choice',
                    subject: 'm2',
                    axis: 'geometria',
                    topic: 'circunferencia',
                    difficulty: 'medium',
                    text: 'Dados los vectores u = (1, -2, 3) y v = (2, 1, -1). ¿Cuál es el valor del producto punto u · v?',
                    options: [
                        "-3",
                        "3",
                        "0",
                        "(2, -2, -3)"
                    ],
                    correctAnswer: 0,
                    solution: 'u·v = (1)(2) + (-2)(1) + (3)(-1) = 2 - 2 - 3 = -3.'
                }
            ]
        },
        {
            id: 'm2-004',
            subject: 'm2',
            title: 'Geometría Analítica: Rectas',
            description: 'Ecuación de la recta y pendientes',
            timeLimit: 45,
            questions: [
                {
                    id: 'm2-004-q1',
                    type: 'multiple-choice',
                    subject: 'm2',
                    axis: 'geometria',
                    topic: 'lineal',
                    difficulty: 'medium',
                    text: 'Determina la ecuación de la recta que pasa por los puntos A(1, 2) y B(3, 6).',
                    options: [
                        "y = 2x",
                        "y = 2x + 1",
                        "y = 4x - 2",
                        "y = x + 1"
                    ],
                    correctAnswer: 0,
                    solution: 'Pendiente m = (6-2)/(3-1) = 4/2 = 2. Usando A(1,2): y - 2 = 2(x - 1) → y = 2x.'
                }
            ]
        },
        {
            id: 'm2-005',
            subject: 'm2',
            title: 'Probabilidad Condicional',
            description: 'Eventos dependientes y probabilidad total',
            timeLimit: 50,
            questions: [
                {
                    id: 'm2-005-q1',
                    type: 'multiple-choice',
                    subject: 'm2',
                    axis: 'probabilidad',
                    topic: 'probabilidad',
                    difficulty: 'hard',
                    text: 'Si P(A) = 0.6, P(B) = 0.5 y P(A∩B) = 0.3. ¿Cuál es el valor de P(B|A)?',
                    options: [
                        "0.5",
                        "0.6",
                        "0.3",
                        "0.83"
                    ],
                    correctAnswer: 0,
                    solution: 'P(B|A) = P(A∩B) / P(A) = 0.3 / 0.6 = 1/2 = 0.5.'
                }
            ]
        },
        {
            id: 'm2-006',
            subject: 'm2',
            title: 'Ensayo M2: Álgebra Avanzada',
            description: 'Ecuaciones logarítmicas y sistemas complejos',
            timeLimit: 60,
            questions: [
                {
                    id: 'm2-006-q1',
                    type: 'multiple-choice',
                    subject: 'm2',
                    axis: 'algebra_funciones',
                    topic: 'logaritmos',
                    difficulty: 'hard',
                    text: 'Si log(x) = a y log(y) = b, ¿a qué es igual log(√(x/y³))?',
                    options: ['(a - 3b)/2', 'a/2 - 3b', '√(a/b³)', '(a - b)/3'],
                    correctAnswer: 0,
                    solution: 'log((x/y³)^(1/2)) = 1/2 * (log x - log y³) = 1/2 * (a - 3b).'
                },
                {
                    id: 'm2-006-q2',
                    type: 'multiple-choice',
                    subject: 'm2',
                    axis: 'algebra_funciones',
                    topic: 'cuadratica',
                    difficulty: 'medium',
                    text: '¿Para qué valor de k la ecuación x² + kx + 9 = 0 tiene una única solución real?',
                    options: ['3', '6', '9', '±6'],
                    correctAnswer: 3, // ±6
                    solution: 'Discriminante Δ = b² - 4ac = 0. k² - 4(1)(9) = 0 → k² = 36 → k = ±6.'
                }
            ]
        }
    ]
};
