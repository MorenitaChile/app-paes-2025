// Complete M2 Simulation Generator - 55 questions
const fs = require('fs');
const path = require('path');

const generateQ = (id, axis, topic, diff, text, opts, ans, sol, pilot = false) => `    {
        id: '${id}${pilot ? '-pilot' : ''}',
        type: 'multiple-choice',
        subject: 'm2',
        axis: '${axis}',
        topic: '${topic}',
        difficulty: '${diff}',
        text: '${text}',
        options: ${JSON.stringify(opts)},
        correctAnswer: ${ans},
        solution: '${sol}'
    }`;

// All 55 M2 questions (includes all M1 content + M2 specific)
const allQuestions = [
    // NÚMEROS (12 preguntas)
    ['m2-num-001', 'numeros', 'reales', 'easy', '√2 es un número:', ['Racional', 'Irracional', 'Entero', 'Natural'], 1, '√2 es irracional.'],
    ['m2-num-002', 'numeros', 'reales', 'medium', 'π + 1 es:', ['Racional', 'Irracional', 'Entero', 'Natural'], 1, 'π es irracional, π+1 también.'],
    ['m2-num-003', 'numeros', 'logaritmos', 'medium', 'log₁₀(100) =', ['1', '2', '10', '100'], 1, '10² = 100, entonces log₁₀(100) = 2.'],
    ['m2-num-004', 'numeros', 'logaritmos', 'hard', 'log₂(8) =', ['2', '3', '4', '8'], 1, '2³ = 8, entonces log₂(8) = 3.'],
    ['m2-num-005', 'numeros', 'logaritmos', 'medium', 'log(a) + log(b) =', ['log(a+b)', 'log(ab)', 'log(a/b)', 'log(a-b)'], 1, 'Propiedad: log(a) + log(b) = log(ab).'],
    ['m2-num-006', 'numeros', 'financiera', 'hard', 'Interés compuesto fórmula:', ['C(1+r)ⁿ', 'C+rn', 'Crn', 'C/rn'], 0, 'Monto = Capital(1+tasa)^tiempo.', true], // PILOT #1
    ['m2-num-007', 'numeros', 'potencias', 'medium', '2⁻³ =', ['1/8', '1/6', '-8', '-6'], 0, '2⁻³ = 1/2³ = 1/8.'],
    ['m2-num-008', 'numeros', 'reales', 'easy', 'Entre dos racionales siempre hay:', ['Nada', 'Un racional', 'Infinitos racionales', 'Un entero'], 2, 'Infinitos racionales.'],
    ['m2-num-009', 'numeros', 'logaritmos', 'hard', 'Si log(x) = 2, entonces x =', ['2', '10', '100', '1000'], 2, 'log₁₀(x) = 2 → x = 10² = 100.'],
    ['m2-num-010', 'numeros', 'potencias', 'medium', '(2³)² =', ['2⁵', '2⁶', '4⁶', '8²'], 1, '(2³)² = 2⁶ = 64.'],
    ['m2-num-011', 'numeros', 'logaritmos', 'medium', 'log(1) =', ['-1', '0', '1', 'Indefinido'], 1, 'log(1) = 0 en cualquier base.'],
    ['m2-num-012', 'numeros', 'financiera', 'medium', 'AFP significa:', ['Ahorro Fondo Pensión', 'Administradora Fondos Pensiones', 'Asociación Fondos Públicos', 'Ahorro Familiar Permanente'], 1, 'Administradora de Fondos de Pensiones.'],

    // ÁLGEBRA Y FUNCIONES (20 preguntas)
    ['m2-alg-001', 'algebra', 'sistemas', 'medium', 'Sistema sin solución:', ['Paralelas', 'Coincidentes', 'Perpendiculares', 'Secantes'], 0, 'Rectas paralelas no se intersectan.'],
    ['m2-alg-002', 'algebra', 'sistemas', 'hard', 'Sistema infinitas soluciones:', ['Paralelas', 'Coincidentes', 'Perpendiculares', 'Secantes'], 1, 'Rectas coincidentes.'],
    ['m2-alg-003', 'algebra', 'exponencial', 'medium', 'f(x) = 2ˣ es:', ['Lineal', 'Cuadrática', 'Exponencial', 'Logarítmica'], 2, 'Función exponencial.'],
    ['m2-alg-004', 'algebra', 'exponencial', 'hard', 'Si 2ˣ = 8, x =', ['2', '3', '4', '8'], 1, '2³ = 8, entonces x = 3.'],
    ['m2-alg-005', 'algebra', 'logaritmica', 'medium', 'f(x) = log(x) dominio:', ['Todos reales', 'x > 0', 'x ≥ 0', 'x ≠ 0'], 1, 'Logaritmo solo para x > 0.'],
    ['m2-alg-006', 'algebra', 'logaritmica', 'hard', 'Gráfico log(x) pasa por:', ['(0,0)', '(1,0)', '(0,1)', '(-1,0)'], 1, 'log(1) = 0, pasa por (1,0).', true], // PILOT #2
    ['m2-alg-007', 'algebra', 'trigonometrica', 'medium', 'sen²(x) + cos²(x) =', ['0', '1', 'sen(2x)', 'cos(2x)'], 1, 'Identidad fundamental.'],
    ['m2-alg-008', 'algebra', 'trigonometrica', 'easy', 'sen(0°) =', ['-1', '0', '1', '√2/2'], 1, 'sen(0°) = 0.'],
    ['m2-alg-009', 'algebra', 'trigonometrica', 'medium', 'cos(90°) =', ['-1', '0', '1', '√2/2'], 1, 'cos(90°) = 0.'],
    ['m2-alg-010', 'algebra', 'trigonometrica', 'hard', 'Período de sen(x):', ['π', '2π', 'π/2', '4π'], 1, 'Período 2π.'],
    ['m2-alg-011', 'algebra', 'cuadratica', 'medium', 'Vértice parábola y = x²:', ['(0,0)', '(1,0)', '(0,1)', '(-1,0)'], 0, 'Vértice en (0,0).'],
    ['m2-alg-012', 'algebra', 'lineal', 'easy', 'Pendiente y = 3x + 2:', ['2', '3', '5', '3/2'], 1, 'Pendiente m = 3.'],
    ['m2-alg-013', 'algebra', 'potencia', 'medium', 'f(x) = x³ es:', ['Par', 'Impar', 'Constante', 'Periódica'], 1, 'Función impar.'],
    ['m2-alg-014', 'algebra', 'exponencial', 'hard', 'Base e ≈', ['2.71', '3.14', '1.41', '1.73'], 0, 'e ≈ 2.718.'],
    ['m2-alg-015', 'algebra', 'ecuaciones', 'medium', '2x - 5 = 11, x =', ['3', '6', '8', '16'], 2, '2x = 16, x = 8.'],
    ['m2-alg-016', 'algebra', 'inecuaciones', 'medium', '3x > 12, x:', ['x > 3', 'x > 4', 'x > 6', 'x > 12'], 1, 'x > 4.'],
    ['m2-alg-017', 'algebra', 'sistemas', 'hard', 'x + y = 5, x - y = 1, x =', ['2', '3', '4', '5'], 1, 'Sumando: 2x = 6, x = 3.'],
    ['m2-alg-018', 'algebra', 'logaritmica', 'hard', 'log₂(1/8) =', ['-3', '-2', '2', '3'], 0, '2⁻³ = 1/8, log₂(1/8) = -3.'],
    ['m2-alg-019', 'algebra', 'trigonometrica', 'medium', 'sen(30°) =', ['0', '1/2', '√2/2', '√3/2'], 1, 'sen(30°) = 1/2.'],
    ['m2-alg-020', 'algebra', 'exponencial', 'medium', '3⁰ =', ['0', '1', '3', 'Indefinido'], 1, 'Cualquier número⁰ = 1.'],

    // GEOMETRÍA (12 preguntas)
    ['m2-geo-001', 'geometria', 'triangulos', 'easy', 'Suma ángulos triángulo:', ['90°', '180°', '270°', '360°'], 1, 'Suma 180°.'],
    ['m2-geo-002', 'geometria', 'trigonometria', 'medium', 'sen(θ) en triángulo rectángulo:', ['cateto opuesto/hipotenusa', 'cateto adyacente/hipotenusa', 'cateto opuesto/adyacente', 'hipotenusa/cateto'], 0, 'sen = opuesto/hipotenusa.'],
    ['m2-geo-003', 'geometria', 'trigonometria', 'medium', 'cos(θ) =', ['opuesto/hipotenusa', 'adyacente/hipotenusa', 'opuesto/adyacente', 'hipotenusa/adyacente'], 1, 'cos = adyacente/hipotenusa.'],
    ['m2-geo-004', 'geometria', 'trigonometria', 'hard', 'tan(θ) =', ['sen/cos', 'cos/sen', 'sen×cos', 'sen+cos'], 0, 'tan = sen/cos.', true], // PILOT #3
    ['m2-geo-005', 'geometria', 'circunferencia', 'medium', 'Ángulo central vs inscrito:', ['Iguales', 'Central doble', 'Inscrito doble', 'No relacionados'], 1, 'Central = 2×inscrito.'],
    ['m2-geo-006', 'geometria', 'circunferencia', 'easy', 'Perímetro círculo:', ['πr', '2πr', 'πr²', '2πr²'], 1, 'Perímetro = 2πr.'],
    ['m2-geo-007', 'geometria', 'homotecia', 'hard', 'Homotecia k=2:', ['Reduce mitad', 'Duplica', 'Triplica', 'No cambia'], 1, 'Duplica dimensiones.'],
    ['m2-geo-008', 'geometria', 'pitagoras', 'medium', 'Teorema Pitágoras:', ['a+b=c', 'a²+b²=c²', 'a+b=c²', 'a²+b=c'], 1, 'a² + b² = c².'],
    ['m2-geo-009', 'geometria', 'areas', 'easy', 'Área triángulo:', ['base×altura', 'base×altura/2', 'base+altura', 'base²'], 1, 'Área = bh/2.'],
    ['m2-geo-010', 'geometria', 'circunferencia', 'medium', 'Área círculo:', ['πr', '2πr', 'πr²', '2πr²'], 2, 'Área = πr².'],
    ['m2-geo-011', 'geometria', 'trigonometria', 'hard', 'Si sen(θ) = 3/5, cos(θ) =', ['3/5', '4/5', '5/3', '5/4'], 1, 'Pitágoras: cos = 4/5.'],
    ['m2-geo-012', 'geometria', 'homotecia', 'medium', 'Homotecia conserva:', ['Área', 'Perímetro', 'Forma', 'Tamaño'], 2, 'Conserva forma.'],

    // PROBABILIDAD Y ESTADÍSTICA (11 preguntas)
    ['m2-est-001', 'estadistica', 'dispersion', 'medium', 'Desviación estándar mide:', ['Centro', 'Dispersión', 'Forma', 'Tamaño'], 1, 'Mide dispersión.'],
    ['m2-est-002', 'estadistica', 'dispersion', 'hard', 'Varianza es:', ['Raíz desviación', 'Desviación²', 'Media', 'Mediana'], 1, 'Varianza = σ².'],
    ['m2-est-003', 'probabilidad', 'condicional', 'hard', 'P(A|B) significa:', ['P(A) dado B', 'P(B) dado A', 'P(A y B)', 'P(A o B)'], 0, 'Probabilidad A dado B.', true], // PILOT #4
    ['m2-est-004', 'probabilidad', 'condicional', 'medium', 'P(A∩B) =', ['P(A)+P(B)', 'P(A)×P(B|A)', 'P(A)-P(B)', 'P(A)/P(B)'], 1, 'P(A∩B) = P(A)×P(B|A).'],
    ['m2-est-005', 'probabilidad', 'combinatoria', 'medium', 'Permutación considera:', ['Orden', 'No orden', 'Repetición', 'Nada'], 0, 'Considera orden.'],
    ['m2-est-006', 'probabilidad', 'combinatoria', 'hard', 'Combinación C(n,r) =', ['n!/(n-r)!', 'n!/r!', 'n!/(r!(n-r)!)', 'n!/r'], 2, 'C(n,r) = n!/(r!(n-r)!).'],
    ['m2-est-007', 'probabilidad', 'binomial', 'hard', 'Distribución binomial requiere:', ['Eventos dependientes', 'Eventos independientes', 'Variable continua', 'Media conocida'], 1, 'Eventos independientes.'],
    ['m2-est-008', 'estadistica', 'normal', 'medium', 'Distribución normal es:', ['Asimétrica', 'Simétrica', 'Uniforme', 'Exponencial'], 1, 'Simétrica.'],
    ['m2-est-009', 'estadistica', 'normal', 'hard', 'En normal, 68% datos en:', ['μ±σ', 'μ±2σ', 'μ±3σ', 'μ'], 0, '68% en μ±σ.'],
    ['m2-est-010', 'estadistica', 'medidas', 'easy', 'Media de 2,4,6,8:', ['4', '5', '6', '7'], 1, '(2+4+6+8)/4 = 5.'],
    ['m2-est-011', 'probabilidad', 'basica', 'medium', 'Probabilidad dado:', ['0', '0.5', '1', '2'], 2, 'Probabilidad = 1.', true] // PILOT #5
];

let content = `/**
 * Simulacro Completo PAES Matemática M2
 * 55 preguntas totales (50 válidas + 5 pilotaje)
 * Incluye todo el contenido de M1 + contenidos específicos de M2
 * Tiempo: 2h 20min (140 minutos)
 * Preguntas pilotaje: índices 5, 17, 27, 38, 54
 */

import { Simulation, Question } from '../../questions';

const questions: Question[] = [\n`;

allQuestions.forEach((q, idx) => {
    if (idx > 0) content += ',\n';
    content += generateQ(...q);
});

content += `\n];\n\nexport const simulacionM2: Simulation = {
    id: 'sim-m2-001',
    subject: 'm2',
    title: 'Simulacro Completo PAES Matemática M2',
    description: 'Simulacro oficial con 55 preguntas que incluyen todo el contenido de M1 más los temas específicos de M2: logaritmos, funciones exponenciales y logarítmicas, trigonometría, probabilidad condicional, combinatoria y distribuciones. Formato DEMRE con 50 preguntas válidas y 5 de pilotaje.',
    totalQuestions: 55,
    validQuestions: 50,
    pilotQuestions: 5,
    timeLimit: 140,
    optionsCount: 4,
    questions: questions,
    pilotIndices: [5, 17, 27, 38, 54],
    format: 'DEMRE'
};\n`;

const filePath = path.join(__dirname, '../src/data/simulations/m2/simulacro_001.ts');
fs.writeFileSync(filePath, content, 'utf8');

console.log('✅ Generated complete M2 simulation with 55 questions');
console.log('   - Números: 12 questions (reales, logaritmos, financiera)');
console.log('   - Álgebra y Funciones: 20 questions (exponencial, logarítmica, trigonométrica)');
console.log('   - Geometría: 12 questions (trigonometría, circunferencia, homotecia)');
console.log('   - Probabilidad y Estadística: 11 questions (condicional, combinatoria, normal)');
console.log('   - Pilot questions at indices: 5, 17, 27, 38, 54');
console.log('   - Time limit: 140 minutes (2h 20min)');
