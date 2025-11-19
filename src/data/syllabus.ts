export type Topic = {
    id: string;
    title: string;
    description?: string;
    subtopics?: string[];
};

export type Axis = {
    id: string;
    title: string;
    topics: Topic[];
};

export type Syllabus = {
    id: string;
    title: string;
    axes: Axis[];
};

export const PAES_SYLLABUS: Record<string, Syllabus> = {
    lectora: {
        id: "lectora",
        title: "Competencia Lectora",
        axes: [
            {
                id: "comprension",
                title: "Comprensión",
                topics: [
                    { id: "extraer", title: "Extraer Información", subtopics: ["Información explícita", "Información implícita"] },
                    { id: "interpretar", title: "Interpretar", subtopics: ["Relacionar", "Sintetizar", "Inferir"] },
                    { id: "evaluar", title: "Evaluar", subtopics: ["Evaluar información", "Evaluar forma y contenido"] }
                ]
            }
        ]
    },
    m1: {
        id: "m1",
        title: "Matemática M1",
        axes: [
            {
                id: "numeros",
                title: "Números",
                topics: [
                    { id: "enteros", title: "Números Enteros y Racionales", subtopics: ["Operatoria", "Problemas"] },
                    { id: "porcentajes", title: "Porcentajes", subtopics: ["Cálculo", "Interés simple"] }
                ]
            },
            {
                id: "algebra",
                title: "Álgebra y Funciones",
                topics: [
                    { id: "expresiones", title: "Expresiones Algebraicas", subtopics: ["Reducción", "Factorización"] },
                    { id: "ecuaciones", title: "Ecuaciones e Inecuaciones", subtopics: ["Primer grado", "Sistemas 2x2"] },
                    { id: "lineal", title: "Función Lineal y Afín", subtopics: ["Gráficos", "Modelamiento"] },
                    { id: "cuadratica", title: "Función Cuadrática", subtopics: ["Gráficos", "Puntos especiales"] }
                ]
            },
            {
                id: "geometria",
                title: "Geometría",
                topics: [
                    { id: "figuras", title: "Figuras Geométricas", subtopics: ["Perímetros", "Áreas"] },
                    { id: "cuerpos", title: "Cuerpos Geométricos", subtopics: ["Área y Volumen de Cubos", "Área y Volumen de Paralelepípedos"] }, // 2025 Restriction
                    { id: "transformaciones", title: "Transformaciones Isométricas", subtopics: ["Traslación", "Rotación", "Reflexión"] }
                ]
            },
            {
                id: "probabilidad",
                title: "Probabilidad y Estadística",
                topics: [
                    { id: "estadistica", title: "Estadística Descriptiva", subtopics: ["Tablas y Gráficos", "Promedios"] }, // 2025 Change: Focus on averages
                    { id: "probabilidad", title: "Probabilidad", subtopics: ["Regla de Laplace", "Suma y Producto"] }
                ]
            }
        ]
    },
    m2: {
        id: "m2",
        title: "Matemática M2",
        axes: [
            {
                id: "algebra_funciones",
                title: "Álgebra y Funciones",
                topics: [
                    { id: "logaritmos", title: "Logaritmos", subtopics: ["Propiedades", "Ecuaciones"] },
                    { id: "potencia", title: "Función Potencia", subtopics: ["Análisis gráfico", "Problemas contextualizados"] }, // 2025 Expanded
                    { id: "exponencial", title: "Función Exponencial y Logarítmica", subtopics: ["Modelamiento", "Gráficos"] }
                ]
            },
            {
                id: "trigonometria",
                title: "Trigonometría", // 2025 NEW
                topics: [
                    { id: "razones", title: "Razones Trigonométricas", subtopics: ["Seno", "Coseno", "Tangente"] },
                    { id: "funciones_trig", title: "Funciones Seno y Coseno", subtopics: ["Gráficos", "Periodo", "Amplitud"] }
                ]
            },
            {
                id: "geometria",
                title: "Geometría",
                topics: [
                    { id: "circunferencia", title: "Geometría Analítica y Vectorial", subtopics: ["Ecuación de la recta", "Vectores en R3"] },
                    { id: "circulo", title: "Círculo y Circunferencia", subtopics: ["Relaciones métricas (cuerdas, secantes)", "Ángulos"] } // 2025 NEW
                ]
            },
            {
                id: "probabilidad",
                title: "Probabilidad y Estadística",
                topics: [
                    { id: "combinatoria", title: "Técnicas de Conteo", subtopics: ["Permutación", "Combinatoria"] },
                    { id: "distribuciones", title: "Distribuciones", subtopics: ["Distribución Normal", "Distribución Binomial"] } // 2025 NEW
                ]
            }
        ]
    },
    ciencias: {
        id: "ciencias",
        title: "Ciencias",
        axes: [
            {
                id: "biologia",
                title: "Biología",
                topics: [
                    { id: "celula", title: "Organización y Estructura Celular", subtopics: ["Organelos", "Membrana"] },
                    { id: "procesos", title: "Procesos y Funciones Biológicas", subtopics: ["Metabolismo", "Homeostasis"] },
                    { id: "herencia", title: "Herencia y Evolución", subtopics: ["Genética Mendeliana", "Evolución"] },
                    { id: "organismo", title: "Organismo y Ambiente", subtopics: ["Ecología", "Impacto humano"] }
                ]
            },
            {
                id: "fisica",
                title: "Física",
                topics: [
                    { id: "ondas", title: "Ondas", subtopics: ["Sonido", "Luz", "Sismos"] },
                    { id: "mecanica", title: "Mecánica", subtopics: ["Cinemática", "Dinámica", "Energía"] }, // Removed Heat/Electrostatics 2025
                    { id: "energia", title: "Energía y Tierra", subtopics: ["Generación eléctrica", "Cambio climático"] },
                    { id: "electricidad", title: "Electricidad", subtopics: ["Circuitos", "Ley de Ohm"] }
                ]
            },
            {
                id: "quimica",
                title: "Química",
                topics: [
                    { id: "atomica", title: "Estructura Atómica", subtopics: ["Modelos", "Configuración electrónica"] },
                    { id: "organica", title: "Química Orgánica", subtopics: ["Grupos funcionales", "Nomenclatura"] }, // Removed Periodic Table Properties 2025
                    { id: "disoluciones", title: "Disoluciones", subtopics: ["Concentración", "Solubilidad"] },
                    { id: "reacciones", title: "Reacciones Químicas", subtopics: ["Estequiometría", "Leyes ponderales"] }
                ]
            }
        ]
    }
};
