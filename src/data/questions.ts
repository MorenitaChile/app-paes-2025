export type Question = {
    id: string;
    type: 'multiple-choice' | 'open-ended' | 'problem-solving';
    subject: string;
    axis: string;
    topic: string;
    difficulty: 'easy' | 'medium' | 'hard';
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
};

export type Essay = {
    id: string;
    subject: string;
    title: string;
    description: string;
    timeLimit: number; // minutes
    questions: Question[];
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
                    type: 'open-ended',
                    subject: 'lectora',
                    axis: 'comprension',
                    topic: 'evaluar',
                    difficulty: 'medium',
                    text: 'Lee el siguiente fragmento: "El cambio climático representa uno de los desafíos más urgentes de nuestra era. Los datos científicos muestran un aumento sostenido de la temperatura global, directamente relacionado con las emisiones de gases de efecto invernadero. Es imperativo que los gobiernos implementen políticas ambientales más estrictas."\n\nIdentifica la tesis central del autor y explica dos argumentos que utiliza para sustentarla. (250-400 palabras)',
                    rubric: [
                        { criteria: 'Pertinencia', weight: 0.3, description: 'Identifica correctamente la tesis y argumentos' },
                        { criteria: 'Profundidad', weight: 0.3, description: 'Análisis detallado de los argumentos' },
                        { criteria: 'Claridad', weight: 0.2, description: 'Expresión clara y coherente' },
                        { criteria: 'Evidencia textual', weight: 0.2, description: 'Cita o referencia al texto original' }
                    ],
                    solution: 'Tesis: El cambio climático requiere acción gubernamental urgente. Argumentos: 1) Evidencia científica del aumento de temperatura, 2) Relación causal con emisiones de gases.'
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
                    type: 'open-ended',
                    subject: 'lectora',
                    axis: 'interpretar',
                    topic: 'interpretar',
                    difficulty: 'easy',
                    text: 'Observa la infografía sobre "El Ciclo del Agua" (imagina una imagen con etapas: evaporación, condensación, precipitación). Explica con tus propias palabras cómo se relacionan la evaporación y la precipitación según el gráfico.',
                    rubric: [
                        { criteria: 'Comprensión', weight: 0.5, description: 'Relaciona correctamente los conceptos' },
                        { criteria: 'Redacción', weight: 0.5, description: 'Explica con claridad la secuencia' }
                    ],
                    solution: 'La evaporación transforma el agua líquida en vapor que sube, y la precipitación es el retorno de esa agua a la tierra en forma líquida o sólida tras condensarse.'
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
                    type: 'open-ended',
                    subject: 'lectora',
                    axis: 'comprension',
                    topic: 'interpretar',
                    difficulty: 'medium',
                    text: 'En la frase: "Su actitud *displicente* molestó a los presentes", sustituye la palabra destacada por un sinónimo que mantenga el sentido y justifica tu elección.',
                    rubric: [
                        { criteria: 'Sinonimia', weight: 0.5, description: 'Elige un término adecuado (ej. indiferente, desganada)' },
                        { criteria: 'Justificación', weight: 0.5, description: 'Explica por qué el término encaja en el contexto' }
                    ],
                    solution: 'Sinónimo: Indiferente. Justificación: El contexto indica que causó molestia por falta de interés o cortesía.'
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
                    type: 'open-ended',
                    subject: 'lectora',
                    axis: 'comprension',
                    topic: 'interpretar',
                    difficulty: 'medium',
                    text: 'Lee el microcuento: "Cuando despertó, el dinosaurio todavía estaba allí." (Augusto Monterroso). Interpreta el significado del final y explica qué efecto produce la brevedad en el lector.',
                    rubric: [
                        { criteria: 'Interpretación', weight: 0.5, description: 'Propone un sentido coherente (sueño vs realidad)' },
                        { criteria: 'Análisis de forma', weight: 0.5, description: 'Explica el impacto de la economía del lenguaje' }
                    ],
                    solution: 'El final sugiere que el elemento fantástico (dinosaurio) es real o que el sueño persiste. La brevedad genera sorpresa y múltiples interpretaciones.'
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
                    type: 'open-ended',
                    subject: 'lectora',
                    axis: 'evaluar',
                    topic: 'evaluar',
                    difficulty: 'hard',
                    text: 'Analiza un titular sensacionalista: "¡Milagro! Dieta de limón cura todas las enfermedades". Evalúa la credibilidad de esta afirmación y explica qué recursos utiliza para atraer al lector.',
                    rubric: [
                        { criteria: 'Evaluación crítica', weight: 0.5, description: 'Cuestiona la falta de evidencia científica' },
                        { criteria: 'Recursos', weight: 0.5, description: 'Identifica exageración, uso de exclamaciones, promesa falsa' }
                    ],
                    solution: 'La afirmación es poco creíble por generalizar ("todas") y carecer de sustento. Usa recursos emocionales ("Milagro") para manipular.'
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
                    type: 'problem-solving',
                    subject: 'ciencias',
                    axis: 'fisica',
                    topic: 'mecanica',
                    difficulty: 'medium',
                    text: 'Un objeto de masa 5 kg se desliza por un plano inclinado de 30° sin roce. Calcula:\na) La aceleración del objeto\nb) La velocidad después de 3 segundos si parte del reposo\n(Considera g = 10 m/s²)',
                    rubric: [
                        { criteria: 'Conceptos aplicados', weight: 0.4, description: 'Identifica fuerzas y usa segunda ley de Newton' },
                        { criteria: 'Procedimiento', weight: 0.35, description: 'Desarrollo matemático correcto' },
                        { criteria: 'Respuesta correcta', weight: 0.25, description: 'Resultado numérico correcto con unidades' }
                    ],
                    solution: 'a) a = g·sen(30°) = 10·0.5 = 5 m/s²\nb) v = v₀ + at = 0 + 5·3 = 15 m/s',
                    hints: ['Descompón la fuerza gravitacional en componentes', 'Usa F = ma en la dirección del plano']
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
                    type: 'open-ended',
                    subject: 'ciencias',
                    axis: 'biologia',
                    topic: 'celula',
                    difficulty: 'medium',
                    text: 'Compara la función de la mitocondria y el cloroplasto. ¿En qué tipo de células se encuentra cada uno?',
                    rubric: [
                        { criteria: 'Función', weight: 0.6, description: 'Describe respiración celular y fotosíntesis' },
                        { criteria: 'Ubicación', weight: 0.4, description: 'Identifica células animales/vegetales correctamente' }
                    ],
                    solution: 'Mitocondria: Respiración celular (ATP), en animales y vegetales. Cloroplasto: Fotosíntesis, solo en vegetales.'
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
                    type: 'problem-solving',
                    subject: 'ciencias',
                    axis: 'quimica',
                    topic: 'reacciones',
                    difficulty: 'hard',
                    text: 'Dada la reacción: 2H₂ + O₂ → 2H₂O. Si reaccionan 4 gramos de H₂ con suficiente O₂, ¿cuántos gramos de agua se producen? (Masas molares: H=1, O=16)',
                    rubric: [
                        { criteria: 'Moles', weight: 0.4, description: 'Calcula moles iniciales correctamente' },
                        { criteria: 'Relación', weight: 0.3, description: 'Usa la proporción estequiométrica' },
                        { criteria: 'Masa final', weight: 0.3, description: 'Convierte moles a gramos correctamente' }
                    ],
                    solution: '4g H₂ = 2 moles. Relación 2:2, se producen 2 moles de H₂O. Masa molar H₂O = 18g/mol. Total = 2 * 18 = 36g.',
                    hints: ['Calcula primero los moles de hidrógeno', 'Usa la masa molar del agua (18 g/mol)']
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
                    type: 'problem-solving',
                    subject: 'ciencias',
                    axis: 'fisica',
                    topic: 'ondas',
                    difficulty: 'medium',
                    text: 'Una ambulancia se acerca a una persona con su sirena encendida. Explica cómo percibe la persona la frecuencia del sonido comparado con el conductor de la ambulancia y por qué (Efecto Doppler).',
                    rubric: [
                        { criteria: 'Fenómeno', weight: 0.5, description: 'Describe aumento de frecuencia (más agudo)' },
                        { criteria: 'Explicación', weight: 0.5, description: 'Relaciona con la compresión de ondas por movimiento relativo' }
                    ],
                    solution: 'La persona percibe un sonido más agudo (mayor frecuencia) porque las ondas se "comprimen" al acercarse la fuente. El conductor lo escucha igual.'
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
                    type: 'open-ended',
                    subject: 'ciencias',
                    axis: 'biologia',
                    topic: 'procesos',
                    difficulty: 'medium',
                    text: 'Se quiere probar si la luz afecta el crecimiento de una planta. Diseña un experimento simple identificando: Variable Independiente, Variable Dependiente y una Variable Controlada.',
                    rubric: [
                        { criteria: 'Variables', weight: 0.6, description: 'Identifica correctamente VI (luz), VD (crecimiento), VC (agua/tierra)' },
                        { criteria: 'Diseño', weight: 0.4, description: 'Propone grupos experimental y control lógicos' }
                    ],
                    solution: 'VI: Cantidad de luz. VD: Altura de la planta. VC: Cantidad de agua. Grupo A con luz, Grupo B en oscuridad, mismas condiciones de riego.'
                }
            ]
        }
    ],
    m1: [
        {
            id: 'm1-001',
            subject: 'm1',
            title: 'Geometría: Volúmenes',
            description: 'Cálculo de áreas y volúmenes de cubos y paralelepípedos',
            timeLimit: 50,
            questions: [
                {
                    id: 'm1-001-q1',
                    type: 'problem-solving',
                    subject: 'm1',
                    axis: 'geometria',
                    topic: 'cuerpos',
                    difficulty: 'medium',
                    text: 'Un paralelepípedo recto de base cuadrada tiene un volumen de 1000 cm³. Si la altura es el doble del lado de la base, determina:\na) Las dimensiones del paralelepípedo\nb) El área total del cuerpo',
                    rubric: [
                        { criteria: 'Planteamiento', weight: 0.3, description: 'Establece ecuaciones correctas' },
                        { criteria: 'Desarrollo', weight: 0.4, description: 'Resuelve el sistema correctamente' },
                        { criteria: 'Respuesta', weight: 0.3, description: 'Calcula área total correctamente' }
                    ],
                    solution: 'a) Si lado = x, entonces h = 2x. V = x²·2x = 2x³ = 1000 → x = ∛500 ≈ 7.94 cm, h ≈ 15.87 cm\nb) A_total = 2x² + 4xh = 2x² + 8x² = 10x² ≈ 630.5 cm²',
                    hints: ['Expresa el volumen en función de un solo lado', 'Recuerda que el área total incluye todas las caras']
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
                    type: 'problem-solving',
                    subject: 'm1',
                    axis: 'algebra',
                    topic: 'ecuaciones',
                    difficulty: 'medium',
                    text: 'La suma de tres números consecutivos es 48. Plantea la ecuación y encuentra los números.',
                    rubric: [
                        { criteria: 'Planteamiento', weight: 0.5, description: 'Define variables correctamente (x, x+1, x+2)' },
                        { criteria: 'Resolución', weight: 0.5, description: 'Encuentra el valor correcto' }
                    ],
                    solution: 'x + (x+1) + (x+2) = 48 → 3x + 3 = 48 → 3x = 45 → x = 15. Los números son 15, 16 y 17.'
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
                    type: 'problem-solving',
                    subject: 'm1',
                    axis: 'probabilidad',
                    topic: 'probabilidad',
                    difficulty: 'easy',
                    text: 'En una urna hay 3 bolitas rojas y 2 azules. ¿Cuál es la probabilidad de sacar una bolita roja?',
                    rubric: [
                        { criteria: 'Cálculo', weight: 1.0, description: 'Aplica casos favorables / totales' }
                    ],
                    solution: 'Favorables: 3. Totales: 5. Probabilidad = 3/5 o 60%.'
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
                    type: 'problem-solving',
                    subject: 'm1',
                    axis: 'numeros',
                    topic: 'enteros',
                    difficulty: 'easy',
                    text: 'En una ciudad la temperatura mínima fue de -5°C y la máxima de 12°C. ¿Cuál fue la variación de temperatura?',
                    rubric: [
                        { criteria: 'Cálculo', weight: 1.0, description: 'Resta correctamente (Max - Min)' }
                    ],
                    solution: 'Variación = 12 - (-5) = 12 + 5 = 17°C.'
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
                    type: 'problem-solving',
                    subject: 'm1',
                    axis: 'probabilidad',
                    topic: 'estadistica',
                    difficulty: 'medium',
                    text: 'Las notas de un alumno son: 5.0, 6.0, 4.0, 5.0, 7.0. Calcula el promedio y la mediana.',
                    rubric: [
                        { criteria: 'Promedio', weight: 0.5, description: 'Suma y divide correctamente' },
                        { criteria: 'Mediana', weight: 0.5, description: 'Ordena datos y busca el central' }
                    ],
                    solution: 'Promedio: (5+6+4+5+7)/5 = 27/5 = 5.4. Ordenados: 4, 5, 5, 6, 7. Mediana: 5.0.'
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
                    type: 'problem-solving',
                    subject: 'm2',
                    axis: 'trigonometria',
                    topic: 'funciones_trig',
                    difficulty: 'medium',
                    text: 'Considera la función f(x) = 3·sen(2x) - 1. Determina:\na) Amplitud\nb) Período\nc) Recorrido\nd) Desplazamiento vertical',
                    rubric: [
                        { criteria: 'Conceptos', weight: 0.3, description: 'Identifica parámetros de la función' },
                        { criteria: 'Procedimiento', weight: 0.4, description: 'Calcula correctamente cada elemento' },
                        { criteria: 'Respuesta', weight: 0.3, description: 'Resultados correctos y completos' }
                    ],
                    solution: 'a) Amplitud = 3\nb) Período = 2π/2 = π\nc) Recorrido = [-4, 2]\nd) Desplazamiento = -1',
                    hints: ['La amplitud es el coeficiente que multiplica al seno', 'El período se calcula como 2π/B donde B es el coeficiente de x']
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
                    type: 'problem-solving',
                    subject: 'm2',
                    axis: 'algebra_funciones',
                    topic: 'logaritmos',
                    difficulty: 'hard',
                    text: 'Resuelve la siguiente ecuación para x: log₂(x + 2) + log₂(x - 2) = 5',
                    rubric: [
                        { criteria: 'Propiedades', weight: 0.4, description: 'Aplica correctamente propiedad de suma de logaritmos' },
                        { criteria: 'Resolución', weight: 0.4, description: 'Resuelve la ecuación cuadrática resultante' },
                        { criteria: 'Validación', weight: 0.2, description: 'Verifica que la solución pertenezca al dominio' }
                    ],
                    solution: 'log₂((x+2)(x-2)) = 5 → x² - 4 = 2⁵ = 32 → x² = 36 → x = ±6. Como el argumento debe ser positivo, x = 6.',
                    hints: ['log(a) + log(b) = log(a·b)', 'Recuerda que el argumento de un logaritmo debe ser mayor que cero']
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
                    type: 'problem-solving',
                    subject: 'm2',
                    axis: 'geometria',
                    topic: 'circunferencia', // Using existing topic mapping for vectors
                    difficulty: 'medium',
                    text: 'Dados los vectores u = (1, -2, 3) y v = (2, 1, -1). Calcula:\na) 2u - v\nb) El producto punto u · v',
                    rubric: [
                        { criteria: 'Operaciones', weight: 0.5, description: 'Realiza suma y ponderación correctamente' },
                        { criteria: 'Producto Punto', weight: 0.5, description: 'Calcula correctamente el producto escalar' }
                    ],
                    solution: 'a) 2(1,-2,3) - (2,1,-1) = (2,-4,6) - (2,1,-1) = (0, -5, 7)\nb) u·v = 1·2 + (-2)·1 + 3·(-1) = 2 - 2 - 3 = -3',
                    hints: ['El producto punto resulta en un escalar (número)', 'Suma componente a componente']
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
                    type: 'problem-solving',
                    subject: 'm2',
                    axis: 'geometria',
                    topic: 'lineal', // Using lineal from algebra as proxy or geometry topic
                    difficulty: 'medium',
                    text: 'Determina la ecuación de la recta que pasa por los puntos A(1, 2) y B(3, 6).',
                    rubric: [
                        { criteria: 'Pendiente', weight: 0.5, description: 'Calcula m = (y2-y1)/(x2-x1)' },
                        { criteria: 'Ecuación', weight: 0.5, description: 'Usa punto-pendiente para hallar la ecuación' }
                    ],
                    solution: 'm = (6-2)/(3-1) = 4/2 = 2. Ecuación: y - 2 = 2(x - 1) → y = 2x.'
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
                    type: 'problem-solving',
                    subject: 'm2',
                    axis: 'probabilidad',
                    topic: 'probabilidad',
                    difficulty: 'hard',
                    text: 'Si P(A) = 0.6, P(B) = 0.5 y P(A∩B) = 0.3. Calcula P(B|A).',
                    rubric: [
                        { criteria: 'Fórmula', weight: 0.5, description: 'Identifica P(B|A) = P(A∩B)/P(A)' },
                        { criteria: 'Cálculo', weight: 0.5, description: 'Sustituye y calcula correctamente' }
                    ],
                    solution: 'P(B|A) = P(A∩B) / P(A) = 0.3 / 0.6 = 0.5.'
                }
            ]
        }
    ]
};
