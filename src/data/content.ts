export type ContentBlock =
    | string
    | { type: 'image'; src: string; alt: string; caption?: string };

export type TopicContent = {
    id: string;
    theory: ContentBlock[];
    examples: {
        title: string;
        content: string;
        solution?: string;
    }[];
    quiz: {
        id: number;
        text: string;
        options: string[];
        correct: number;
        explanation: string;
    }[];
};

export const TOPIC_CONTENT: Record<string, TopicContent> = {
    // --- COMPETENCIA LECTORA ---
    "extraer": {
        id: "extraer",
        theory: [
            "La habilidad de extraer información consiste en localizar datos o elementos que se encuentran presentes en el texto de manera explícita.",
            "Para dominar esta habilidad, es fundamental realizar una lectura atenta y rastrear el texto en busca de respuestas precisas a preguntas directas (qué, quién, cuándo, dónde).",
            "No requiere interpretación profunda, sino precisión en la búsqueda y selección de la información tal cual aparece escrita."
        ],
        examples: [
            {
                title: "Ejemplo de Extracción",
                content: "Texto: 'El 20 de julio de 1969, la misión Apolo 11 logró que el ser humano pisara la Luna por primera vez. Neil Armstrong fue el primer astronauta en descender.'\n\nPregunta: ¿En qué fecha llegó el ser humano a la Luna?",
                solution: "20 de julio de 1969 (Información explícita en el texto)."
            }
        ],
        quiz: [
            {
                id: 1,
                text: "¿Qué caracteriza a la información explícita?",
                options: ["Se debe deducir", "Aparece literal en el texto", "Es una opinión del autor", "Requiere conocimientos previos"],
                correct: 1,
                explanation: "La información explícita es aquella que está escrita directamente en el texto."
            }
        ]
    },
    "interpretar": {
        id: "interpretar",
        theory: [
            "Interpretar implica construir un sentido global o local a partir de las relaciones entre diferentes partes del texto.",
            "Incluye habilidades como inferir (sacar conclusiones no explícitas), sintetizar (resumir la idea central) y relacionar (conectar dos o más ideas).",
            "Es crucial distinguir entre lo que el texto dice y lo que el lector aporta. La inferencia válida siempre se sustenta en marcas textuales."
        ],
        examples: [
            {
                title: "Ejemplo de Inferencia",
                content: "Texto: 'Juan llegó empapado a la oficina y cerró el paraguas con fuerza.'\n\nInferencia: Estaba lloviendo afuera.",
                solution: "El texto no dice 'llueve', pero 'empapado' y 'paraguas' son marcas que permiten inferirlo."
            }
        ],
        quiz: [
            {
                id: 1,
                text: "¿Qué es una inferencia?",
                options: ["Copiar el texto", "Una adivinanza", "Una conclusión derivada de pistas textuales", "Un resumen"],
                correct: 2,
                explanation: "Inferir es deducir información implícita basándose en evidencias del texto."
            }
        ]
    },
    "evaluar": {
        id: "evaluar",
        theory: [
            "Evaluar consiste en emitir un juicio crítico sobre la forma o el contenido del texto, basándose en criterios objetivos.",
            "Implica analizar el propósito comunicativo, la actitud del autor, la veracidad de la información o la pertinencia de los recursos utilizados.",
            "En la PAES, evaluar no es dar una opinión personal ('me gustó'), sino juzgar la eficacia o calidad del texto según su contexto."
        ],
        examples: [
            {
                title: "Evaluación de Propósito",
                content: "Texto: Un manual de instrucciones para armar un mueble.\n\nPregunta: ¿Cuál es el propósito comunicativo del texto?",
                solution: "Instruir o guiar al lector en el armado del mueble."
            }
        ],
        quiz: [
            {
                id: 1,
                text: "Evaluar la forma de un texto implica:",
                options: ["Criticar al autor", "Analizar cómo está escrito y organizado", "Resumir el contenido", "Memorizar los datos"],
                correct: 1,
                explanation: "Evaluar la forma se refiere a analizar la estructura, estilo y recursos utilizados."
            }
        ]
    },

    // --- MATEMÁTICA M1 ---
    "enteros": {
        id: "enteros",
        theory: [
            "El conjunto de los números enteros (Z) incluye a los naturales, el cero y los negativos. Los racionales (Q) incluyen a todos los que pueden escribirse como fracción a/b.",
            "Regla de los signos: (+)·(+) = (+), (-)·(-) = (+), (+)·(-) = (-). Esta regla aplica para multiplicación y división.",
            "Prioridad de operaciones (PAPOMUDAS): Paréntesis, Potencias, Multiplicación/División (de izq a der), Adición/Sustracción (de izq a der)."
        ],
        examples: [
            {
                title: "Operación Combinada",
                content: "Calcula: -2 + 3 · (4 - 6)",
                solution: "1. Paréntesis: (4-6) = -2\n2. Multiplicación: 3 · -2 = -6\n3. Suma: -2 + (-6) = -8"
            }
        ],
        quiz: [
            {
                id: 1,
                text: "¿Cuál es el resultado de -5 - (-3)?",
                options: ["-8", "-2", "2", "8"],
                correct: 1,
                explanation: "-5 - (-3) es equivalente a -5 + 3, lo que resulta en -2."
            }
        ]
    },
    "porcentajes": {
        id: "porcentajes",
        theory: [
            "El porcentaje representa una parte de un total de 100 unidades. Se puede expresar como fracción (20/100) o decimal (0.2).",
            "Para calcular el x% de una cantidad C, se multiplica C · (x/100).",
            "Interés Simple: Ganancia producida por un capital C a una tasa i% durante t periodos. Fórmula: I = C · i · t."
        ],
        examples: [
            {
                title: "Cálculo de Descuento",
                content: "Un producto cuesta $10.000 y tiene 20% de descuento. ¿Cuál es el precio final?",
                solution: "Descuento = 10.000 · 0.2 = 2.000. Precio Final = 10.000 - 2.000 = $8.000."
            }
        ],
        quiz: [
            {
                id: 1,
                text: "¿A qué decimal equivale el 5%?",
                options: ["0.5", "0.05", "5.0", "0.005"],
                correct: 1,
                explanation: "5% = 5/100 = 0.05"
            }
        ]
    },
    "expresiones": {
        id: "expresiones",
        theory: [
            "Una expresión algebraica combina números y letras mediante operaciones. Los términos semejantes son aquellos que tienen el mismo factor literal.",
            "Productos Notables clave: Cuadrado de binomio (a±b)² = a²±2ab+b², Suma por diferencia (a+b)(a-b) = a²-b².",
            "Factorizar es el proceso inverso: transformar una suma en un producto."
        ],
        examples: [
            {
                title: "Reducción de Términos",
                content: "Reduce: 2x + 3y - x + 5y",
                solution: "Agrupamos x con x, e y con y: (2x - x) + (3y + 5y) = x + 8y"
            }
        ],
        quiz: [
            {
                id: 1,
                text: "¿Cuál es el desarrollo de (x+3)²?",
                options: ["x² + 9", "x² + 3x + 9", "x² + 6x + 9", "x² + 6x + 6"],
                correct: 2,
                explanation: "Es un cuadrado de binomio: el primero al cuadrado (x²), más el doble del primero por el segundo (2·x·3 = 6x), más el segundo al cuadrado (3²=9)."
            }
        ]
    },
    "ecuaciones": {
        id: "ecuaciones",
        theory: [
            "Una ecuación de primer grado es una igualdad con una incógnita de exponente 1. El objetivo es despejar la x.",
            "Sistemas de ecuaciones 2x2: Conjunto de dos ecuaciones con dos incógnitas. Métodos de resolución: Sustitución, Igualación, Reducción.",
            "Inecuaciones: Desigualdades (>, <, ≥, ≤). Al multiplicar o dividir por un número negativo, el sentido de la desigualdad se invierte."
        ],
        examples: [
            {
                title: "Ecuación Simple",
                content: "Resuelve: 3x - 5 = 10",
                solution: "3x = 15 → x = 5"
            }
        ],
        quiz: [
            {
                id: 1,
                text: "Si -2x > 6, entonces:",
                options: ["x > -3", "x < -3", "x > 3", "x < 3"],
                correct: 1,
                explanation: "Al dividir por -2, se invierte el signo de la desigualdad: x < 6/(-2) → x < -3."
            }
        ]
    },
    "lineal": {
        id: "lineal",
        theory: [
            "Función Lineal: f(x) = mx. Pasa por el origen (0,0). m es la pendiente.",
            "Función Afín: f(x) = mx + n. No pasa necesariamente por el origen. n es el coeficiente de posición (corte con eje Y).",
            "Pendiente (m): Indica la inclinación. Si m > 0 es creciente, si m < 0 es decreciente."
        ],
        examples: [
            {
                title: "Identificar Pendiente",
                content: "Dada f(x) = -2x + 4, identifica la pendiente y el corte con Y.",
                solution: "Pendiente m = -2 (decreciente). Corte con Y en n = 4 (punto 0,4)."
            }
        ],
        quiz: [
            {
                id: 1,
                text: "¿Por qué punto pasa siempre una función lineal f(x)=mx?",
                options: ["(1,1)", "(0,0)", "(0,1)", "(1,0)"],
                correct: 1,
                explanation: "La función lineal pura f(x)=mx siempre pasa por el origen (0,0)."
            }
        ]
    },
    "cuadratica": {
        id: "cuadratica",
        theory: [
            "Forma general: f(x) = ax² + bx + c. Su gráfica es una parábola.",
            { type: 'image', src: '/images/parabola.png', alt: 'Gráfico Función Cuadrática', caption: 'Elementos de la parábola: Vértice, Eje de simetría y Raíces.' },
            "Concavidad: Si a > 0, abre hacia arriba (carita feliz). Si a < 0, abre hacia abajo (carita triste).",
            "Vértice: Punto máximo o mínimo. Coordenada x del vértice = -b/(2a)."
        ],
        examples: [
            {
                title: "Análisis de Concavidad",
                content: "f(x) = -x² + 4x - 3. ¿Hacia dónde abre la parábola?",
                solution: "Como a = -1 (negativo), la parábola abre hacia abajo."
            }
        ],
        quiz: [
            {
                id: 1,
                text: "¿Qué indica el coeficiente 'c' en la función cuadrática?",
                options: ["La pendiente", "El vértice", "La intersección con el eje Y", "La concavidad"],
                correct: 2,
                explanation: "El término libre c indica el punto donde la parábola corta al eje Y (0, c)."
            }
        ]
    },
    "figuras": {
        id: "figuras",
        theory: [
            "Perímetro: Suma de los lados de una figura. Área: Medida de la superficie interior.",
            { type: 'image', src: '/images/triangulo.png', alt: 'Triángulo Rectángulo', caption: 'Triángulo rectángulo y Teorema de Pitágoras.' },
            "Triángulo: Área = (base · altura) / 2.",
            "Cuadrado: Área = lado². Rectángulo: Área = largo · ancho.",
            "Círculo: Perímetro = 2πr. Área = πr²."
        ],
        examples: [
            {
                title: "Área de Triángulo",
                content: "Base = 10cm, Altura = 5cm. Calcula el área.",
                solution: "A = (10 · 5) / 2 = 50 / 2 = 25 cm²."
            }
        ],
        quiz: [
            {
                id: 1,
                text: "Si el radio de un círculo se duplica, ¿qué pasa con su área?",
                options: ["Se duplica", "Se mantiene", "Se cuadruplica", "Se triplica"],
                correct: 2,
                explanation: "A = π(2r)² = π4r² = 4(πr²). El área se cuadruplica."
            }
        ]
    },
    "cuerpos": {
        id: "cuerpos",
        theory: [
            "Cuerpos geométricos ocupan volumen en el espacio.",
            "Cubo: Volumen = a³. Área total = 6a².",
            "Paralelepípedo (caja): Volumen = largo · ancho · alto. Área = suma de las áreas de sus 6 caras rectangulares."
        ],
        examples: [
            {
                title: "Volumen de una Caja",
                content: "Largo 10, ancho 5, alto 2.",
                solution: "V = 10 · 5 · 2 = 100 unidades cúbicas."
            }
        ],
        quiz: [
            {
                id: 1,
                text: "¿Cuántas caras tiene un cubo?",
                options: ["4", "6", "8", "12"],
                correct: 1,
                explanation: "Un cubo tiene 6 caras cuadradas iguales."
            }
        ]
    },
    "transformaciones": {
        id: "transformaciones",
        theory: [
            "Isométricas: Mantienen la forma y tamaño de la figura, solo cambia su posición.",
            "Traslación: Desplazamiento según un vector (x,y). Se suma el vector a cada punto.",
            "Rotación: Giro en torno a un punto (centro) y un ángulo.",
            "Reflexión (Simetría): Inversión respecto a un eje (espejo)."
        ],
        examples: [
            {
                title: "Traslación de Punto",
                content: "Punto A(2,3) trasladado por vector v(1,-2).",
                solution: "A' = (2+1, 3-2) = (3, 1)."
            }
        ],
        quiz: [
            {
                id: 1,
                text: "¿Qué propiedad NO cambia en una transformación isométrica?",
                options: ["La posición", "La orientación", "El tamaño", "Las coordenadas"],
                correct: 2,
                explanation: "Las transformaciones isométricas conservan las medidas (tamaño) y forma, pero cambian posición y orientación."
            }
        ]
    },
    "estadistica": {
        id: "estadistica",
        theory: [
            "Medidas de Tendencia Central: Resumen los datos en un valor central.",
            "Media (Promedio): Suma de datos dividido por el total.",
            "Mediana: Dato central cuando están ordenados.",
            "Moda: Dato que más se repite."
        ],
        examples: [
            {
                title: "Cálculo de Promedio",
                content: "Notas: 5, 6, 7.",
                solution: "Promedio = (5+6+7)/3 = 18/3 = 6."
            }
        ],
        quiz: [
            {
                id: 1,
                text: "Si todos los datos son iguales, ¿cuál es la desviación estándar?",
                options: ["1", "El valor del dato", "0", "Infinito"],
                correct: 2,
                explanation: "Si no hay variación entre los datos, la desviación es 0."
            }
        ]
    },
    "probabilidad": {
        id: "probabilidad",
        theory: [
            "Regla de Laplace: Probabilidad = (Casos Favorables) / (Casos Totales).",
            "Probabilidad de evento seguro = 1. Evento imposible = 0.",
            "Regla de la Suma (O): P(A U B). Regla del Producto (Y): P(A ∩ B) para eventos independientes."
        ],
        examples: [
            {
                title: "Lanzamiento de Dado",
                content: "Probabilidad de obtener un número par en un dado de 6 caras.",
                solution: "Casos favorables: {2,4,6} (3 casos). Totales: 6. P = 3/6 = 1/2 = 50%."
            }
        ],
        quiz: [
            {
                id: 1,
                text: "Probabilidad de sacar cara en una moneda.",
                options: ["1/3", "1/2", "1/4", "1"],
                correct: 1,
                explanation: "Hay 1 caso favorable (cara) de 2 posibles (cara, sello)."
            }
        ]
    },

    // --- CIENCIAS (BIOLOGÍA) ---
    "celula": {
        id: "celula",
        theory: [
            "La célula es la unidad básica de la vida. Existen procariontes (sin núcleo, bacterias) y eucariontes (con núcleo, animales/vegetales).",
            { type: 'image', src: '/images/celula.png', alt: 'Diagrama de Célula Eucarionte', caption: 'Estructura de una célula eucarionte animal.' },
            "Organelos clave: Mitocondria (energía), Cloroplasto (fotosíntesis, solo vegetal), Ribosoma (síntesis proteínas).",
            "Membrana Plasmática: Barrera selectiva. Transporte pasivo (sin energía) y activo (con ATP)."
        ],
        examples: [
            {
                title: "Diferencia Animal/Vegetal",
                content: "Identifica dos estructuras exclusivas de la célula vegetal.",
                solution: "Pared celular y Cloroplastos."
            }
        ],
        quiz: [
            {
                id: 1,
                text: "¿Dónde se encuentra el ADN en una célula eucarionte?",
                options: ["Citoplasma", "Núcleo", "Mitocondria", "Ribosoma"],
                correct: 1,
                explanation: "En las eucariontes, el material genético está protegido dentro del núcleo."
            }
        ]
    },
    "procesos": {
        id: "procesos",
        theory: [
            "Metabolismo: Conjunto de reacciones químicas. Anabolismo (construcción) y Catabolismo (degradación).",
            "Enzimas: Proteínas que aceleran las reacciones metabólicas.",
            "Homeostasis: Capacidad del organismo de mantener el equilibrio interno (ej. temperatura, glucosa)."
        ],
        examples: [
            {
                title: "Control de Glucosa",
                content: "¿Qué hormona reduce el nivel de azúcar en sangre?",
                solution: "Insulina."
            }
        ],
        quiz: [
            {
                id: 1,
                text: "¿Qué efecto tiene la temperatura extrema en las enzimas?",
                options: ["Las activa", "Las desnaturaliza", "No les afecta", "Las reproduce"],
                correct: 1,
                explanation: "Las enzimas pierden su estructura (se desnaturalizan) con temperaturas extremas, perdiendo su función."
            }
        ]
    },

    // --- CIENCIAS (FÍSICA) ---
    "ondas": {
        id: "ondas",
        theory: [
            "Una onda transporta energía, no materia. Se clasifican en mecánicas (requieren medio) y electromagnéticas (viajan en vacío).",
            { type: 'image', src: '/images/onda.png', alt: 'Onda Transversal', caption: 'Elementos de una onda: Amplitud, Longitud de onda, Cresta y Valle.' },
            "Parámetros: Amplitud, Longitud de onda (λ), Frecuencia (f), Periodo (T). Relación: v = λ · f.",
            "Sonido: Onda mecánica longitudinal. Luz: Onda electromagnética transversal."
        ],
        examples: [
            {
                title: "Cálculo de Velocidad",
                content: "Una onda tiene f=10Hz y λ=2m. Calcula su velocidad.",
                solution: "v = 2m · 10Hz = 20 m/s."
            }
        ],
        quiz: [
            {
                id: 1,
                text: "¿El sonido puede viajar en el vacío?",
                options: ["Sí, siempre", "No, necesita un medio material", "Solo si es fuerte", "Depende de la temperatura"],
                correct: 1,
                explanation: "El sonido es una onda mecánica, requiere un medio (aire, agua, sólido) para propagarse."
            }
        ]
    },
    "mecanica": {
        id: "mecanica",
        theory: [
            "Cinemática: Describe el movimiento. MRU (velocidad constante), MRUA (aceleración constante).",
            "Dinámica: Leyes de Newton. 1) Inercia. 2) F=ma. 3) Acción y Reacción.",
            "Diagrama de Cuerpo Libre (DCL): Representación gráfica de todas las fuerzas que actúan sobre un objeto (Peso, Normal, Tensión, Roce).",
            "Energía Mecánica: Cinética (movimiento) + Potencial (altura). Se conserva en sistemas ideales."
        ],
        examples: [
            {
                title: "Segunda Ley de Newton",
                content: "Fuerza necesaria para acelerar 2kg a 3m/s².",
                solution: "F = m·a = 2kg · 3m/s² = 6 Newton."
            },
            {
                title: "DCL en Plano Inclinado",
                content: "Un bloque en un plano inclinado. ¿Qué fuerzas actúan?",
                solution: "Peso (vertical hacia abajo), Normal (perpendicular al plano) y Roce (contrario al movimiento)."
            }
        ],
        quiz: [
            {
                id: 1,
                text: "Si la fuerza neta sobre un objeto es cero, su aceleración es:",
                options: ["9.8 m/s²", "Cero", "Infinita", "Variable"],
                correct: 1,
                explanation: "Según F=ma, si F=0, entonces a=0 (está en reposo o MRU)."
            },
            {
                id: 2,
                text: "¿Hacia dónde apunta siempre la fuerza Normal?",
                options: ["Hacia abajo", "Hacia el centro de la Tierra", "Perpendicular a la superficie", "En dirección del movimiento"],
                correct: 2,
                explanation: "La fuerza Normal es la reacción de la superficie y siempre es perpendicular a ella."
            }
        ]
    },

    // --- MATEMÁTICA M2 ---
    "logaritmos": {
        id: "logaritmos",
        theory: [
            "Logaritmo: Exponente al que hay que elevar una base para obtener un número. log_b(a) = c ↔ b^c = a.",
            "Propiedades: log(A·B) = log(A) + log(B); log(A/B) = log(A) - log(B); log(A^n) = n·log(A).",
            "Cambio de base: log_b(a) = log_k(a) / log_k(b)."
        ],
        examples: [
            {
                title: "Cálculo de Logaritmo",
                content: "Calcula log₂ 32.",
                solution: "2^x = 32 → 2^5 = 32. Por lo tanto, log₂ 32 = 5."
            }
        ],
        quiz: [
            {
                id: 1,
                text: "¿A qué es igual log(100) en base 10?",
                options: ["1", "2", "10", "100"],
                correct: 1,
                explanation: "10² = 100, por lo tanto log₁₀(100) = 2."
            }
        ]
    },
    "potencia": {
        id: "potencia",
        theory: [
            "Función Potencia: f(x) = a·x^n. Su gráfica depende de si n es par o impar, y del signo de a.",
            "n par positivo: Forma de parábola (U). n impar positivo: Forma de silla (S).",
            "Traslaciones: f(x-h) + k desplaza el vértice a (h,k)."
        ],
        examples: [
            {
                title: "Análisis Gráfico",
                content: "f(x) = x³. ¿Cuál es su dominio y recorrido?",
                solution: "Dominio: Reales. Recorrido: Reales (porque n es impar)."
            }
        ],
        quiz: [
            {
                id: 1,
                text: "Si n es par y a > 0, el recorrido de f(x) = ax^n es:",
                options: ["Reales", "Reales positivos incluido el 0", "Reales negativos", "Enteros"],
                correct: 1,
                explanation: "Al elevar a exponente par, el resultado es siempre no negativo. Si a>0, el recorrido es [0, +∞)."
            }
        ]
    },
    "trigonometria": { // M2 Specific
        id: "trigonometria", // Maps to axis or topic depending on structure, here mapping to axis for simplicity or topic
        theory: [
            "Razones en triángulo rectángulo: Seno (Op/Hip), Coseno (Ady/Hip), Tangente (Op/Ady).",
            "Identidad fundamental: sen²α + cos²α = 1.",
            "Teorema del Seno y Coseno para triángulos no rectángulos."
        ],
        examples: [
            {
                title: "Cálculo de Altura",
                content: "Un edificio proyecta sombra de 10m con ángulo de elevación del sol de 45°. Altura?",
                solution: "tan(45°) = h/10 → 1 = h/10 → h = 10m."
            }
        ],
        quiz: [
            {
                id: 1,
                text: "¿Cuál es el valor de sen(30°)?",
                options: ["0.5", "1", "0", "0.86"],
                correct: 0,
                explanation: "sen(30°) = 1/2 = 0.5."
            }
        ]
    },
    "funciones_trig": {
        id: "funciones_trig",
        theory: [
            "Función Seno: f(x) = sen(x). Periodo 2π. Recorrido [-1, 1].",
            "Función Coseno: f(x) = cos(x). Desplazada π/2 respecto al seno.",
            "Amplitud: Valor máximo desde el eje central. Periodo: Longitud de un ciclo completo."
        ],
        examples: [
            {
                title: "Periodo de Función",
                content: "f(x) = sen(2x). ¿Cuál es su periodo?",
                solution: "T = 2π/B = 2π/2 = π."
            }
        ],
        quiz: [
            {
                id: 1,
                text: "¿Cuál es el recorrido de f(x) = 3cos(x)?",
                options: ["[-1, 1]", "[-3, 3]", "[0, 3]", "Reales"],
                correct: 1,
                explanation: "La amplitud es 3, por lo que oscila entre -3 y 3."
            }
        ]
    },

    // --- CIENCIAS (RESTANTE) ---
    "herencia": {
        id: "herencia",
        theory: [
            "Genética Mendeliana: Leyes de la herencia. Alelos dominantes (A) y recesivos (a).",
            "Primera Ley (Segregación): Los alelos se separan durante la formación de gametos.",
            "Segunda Ley (Distribución Independiente): Los alelos de distintos genes se distribuyen de manera independiente.",
            "Genotipo: Constitución genética (AA, Aa, aa). Fenotipo: Expresión física.",
            "Cruzamiento Monohíbrido: Aa x Aa → Proporción fenotípica 3:1."
        ],
        examples: [
            {
                title: "Cuadro de Punnett",
                content: "Cruce de dos heterocigotos (Aa). Probabilidad de recesivo (aa).",
                solution: "1/4 o 25%."
            },
            {
                title: "Dihibridismo",
                content: "En un cruce AaBb x AaBb, ¿cuál es la proporción fenotípica clásica?",
                solution: "9:3:3:1 (9 ambos dominantes, 3 y 3 mixtos, 1 ambos recesivos)."
            }
        ],
        quiz: [
            {
                id: 1,
                text: "¿Qué es un alelo?",
                options: ["Un tipo de célula", "Una variante de un gen", "Un cromosoma", "Una proteína"],
                correct: 1,
                explanation: "Los alelos son las formas alternativas que puede tener un mismo gen."
            },
            {
                id: 2,
                text: "Si cruzamos AA x aa, ¿cómo es la descendencia?",
                options: ["50% AA, 50% aa", "100% Aa", "100% AA", "100% aa"],
                correct: 1,
                explanation: "El padre AA solo da gametos A, y el aa solo gametos a. Toda la F1 será Aa (heterocigota)."
            }
        ]
    },
    "organismo": {
        id: "organismo",
        theory: [
            "Ecología: Estudio de interacciones entre organismos y ambiente.",
            "Niveles: Organismo → Población → Comunidad → Ecosistema → Biósfera.",
            "Relaciones interespecíficas: Competencia (-/-), Depredación (+/-), Mutualismo (+/+), Comensalismo (+/0)."
        ],
        examples: [
            {
                title: "Identificar Relación",
                content: "Una abeja obtiene néctar y poliniza la flor.",
                solution: "Mutualismo (ambos se benefician)."
            }
        ],
        quiz: [
            {
                id: 1,
                text: "¿Qué es una población?",
                options: ["Individuos de distinta especie", "Individuos de la misma especie en un lugar y tiempo", "Conjunto de ecosistemas", "Factores abióticos"],
                correct: 1,
                explanation: "Población se define como un grupo de organismos de la misma especie que conviven en espacio y tiempo."
            }
        ]
    },
    "electricidad": {
        id: "electricidad",
        theory: [
            "Ley de Ohm: V = I · R. (Voltaje = Corriente · Resistencia).",
            "Circuitos Serie: Corriente igual, Voltaje se reparte. R_eq = R1 + R2.",
            "Circuitos Paralelo: Voltaje igual, Corriente se reparte. 1/R_eq = 1/R1 + 1/R2.",
            "Potencia Eléctrica: P = V · I."
        ],
        examples: [
            {
                title: "Ley de Ohm",
                content: "Circuito con V=12V y R=4Ω. Calcula la corriente.",
                solution: "I = V/R = 12/4 = 3 Amperes."
            }
        ],
        quiz: [
            {
                id: 1,
                text: "En un circuito en serie, si una ampolleta se quema:",
                options: ["Las otras brillan más", "Las otras se apagan", "No pasa nada", "Aumenta la corriente"],
                correct: 1,
                explanation: "En serie hay un solo camino para la corriente. Si se corta, todo el circuito se abre."
            }
        ]
    },
    "disoluciones": {
        id: "disoluciones",
        theory: [
            "Disolución: Mezcla homogénea de Soluto (menor cantidad) y Solvente (mayor cantidad).",
            "Concentración: Cantidad de soluto en una cantidad de disolución. %m/m, %m/v, Molaridad (mol/L).",
            "Solubilidad: Máxima cantidad de soluto que se puede disolver a una temperatura dada."
        ],
        examples: [
            {
                title: "Cálculo de Molaridad",
                content: "2 moles de NaCl en 500mL de solución.",
                solution: "M = moles / Litros = 2 / 0.5 = 4 Molar."
            }
        ],
        quiz: [
            {
                id: 1,
                text: "¿Qué factor afecta la solubilidad de un gas en líquido?",
                options: ["Solo la presión", "Presión y Temperatura", "Solo el volumen", "El color"],
                correct: 1,
                explanation: "La solubilidad de gases depende fuertemente de la presión (Ley de Henry) y la temperatura."
            }
        ]
    },
    "atomica": {
        id: "atomica",
        theory: [
            "Átomo: Núcleo (protones+, neutrones) y corteza (electrones-).",
            "Número Atómico (Z): Cantidad de protones. Define el elemento.",
            "Número Másico (A): Protones + Neutrones.",
            "Configuración Electrónica: Distribución de electrones en niveles de energía (1s, 2s, 2p...)."
        ],
        examples: [
            {
                title: "Identificar Partículas",
                content: "Carbono-12 (Z=6). ¿Cuántos neutrones tiene?",
                solution: "A = 12, Z = 6. Neutrones = A - Z = 12 - 6 = 6."
            }
        ],
        quiz: [
            {
                id: 1,
                text: "¿Qué partícula tiene carga negativa?",
                options: ["Protón", "Neutrón", "Electrón", "Fotón"],
                correct: 2,
                explanation: "El electrón orbita el núcleo y tiene carga eléctrica negativa."
            }
        ]
    },
    "reacciones": {
        id: "reacciones",
        theory: [
            "Reacción Química: Transformación de reactantes en productos.",
            "Estequiometría: Relaciones cuantitativas en una reacción. Ley de conservación de la masa (Lavoisier).",
            "Mol: Unidad de cantidad de sustancia (6.022 x 10²³ partículas)."
        ],
        examples: [
            {
                title: "Balanceo de Ecuación",
                content: "H₂ + O₂ → H₂O. Balancear.",
                solution: "2H₂ + O₂ → 2H₂O."
            }
        ],
        quiz: [
            {
                id: 1,
                text: "En una reacción química, la masa total:",
                options: ["Aumenta", "Disminuye", "Se conserva", "Desaparece"],
                correct: 2,
                explanation: "La ley de Lavoisier establece que la masa no se crea ni se destruye, solo se transforma."
            }
        ]
    }
};
