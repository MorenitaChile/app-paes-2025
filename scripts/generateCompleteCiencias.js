// Complete Ciencias Simulation Generator - Generates all 80 questions efficiently
const fs = require('fs');
const path = require('path');

// Template for generating questions
const generateQ = (id, axis, topic, diff, text, opts, ans, sol, pilot = false) => `    {
        id: '${id}${pilot ? '-pilot' : ''}',
        type: 'multiple-choice',
        subject: 'ciencias',
        axis: '${axis}',
        topic: '${topic}',
        difficulty: '${diff}',
        text: '${text}',
        options: ${JSON.stringify(opts)},
        correctAnswer: ${ans},
        solution: '${sol}'
    }`;

// All 80 questions data (compact format)
const allQuestions = [
    // MÓDULO COMÚN - BIOLOGÍA (1-18)
    ['mc-bio-001', 'biologia', 'celula', 'easy', '¿Cuál estructura es exclusiva de células vegetales?', ['Mitocondria', 'Cloroplasto', 'Núcleo', 'Ribosoma'], 1, 'Los cloroplastos son exclusivos de células vegetales.'],
    ['mc-bio-002', 'biologia', 'celula', 'medium', 'Función principal de las mitocondrias:', ['Sintetizar proteínas', 'Producir ATP', 'Almacenar ADN', 'Fotosíntesis'], 1, 'Las mitocondrias producen ATP.'],
    ['mc-bio-003', 'biologia', 'reproduccion', 'medium', 'La ovulación ocurre en el día:', ['7', '14', '21', '28'], 1, 'Ovulación cerca del día 14.'],
    ['mc-bio-004', 'biologia', 'reproduccion', 'easy', 'Método anticonceptivo de barrera:', ['Píldora', 'Condón', 'DIU', 'Calendario'], 1, 'El condón es de barrera.'],
    ['mc-bio-005', 'biologia', 'genetica', 'medium', 'Duplicación del ADN en fase:', ['G1', 'S', 'G2', 'M'], 1, 'Fase S (síntesis).'],
    ['mc-bio-006', 'biologia', 'genetica', 'hard', 'Diferencia mitosis-meiosis:', ['Mitosis 4 células', 'Mitosis diploide, meiosis haploide', 'Mitosis en gametos', 'Mitosis no duplica'], 1, 'Mitosis diploide, meiosis haploide.'],
    ['mc-bio-007', 'biologia', 'evolucion', 'medium', 'Selección natural favorece:', ['Grandes', 'Mejor adaptados', 'Antiguos', 'Todos igual'], 1, 'Favorece mejor adaptados.'],
    ['mc-bio-008', 'biologia', 'evolucion', 'easy', 'Evidencia de evolución:', ['Fósiles', 'Fotosíntesis', 'Respiración', 'Mitosis', 'Ósmosis'], 0, 'Fósiles son evidencia.'],
    ['mc-bio-009', 'biologia', 'ecosistema', 'medium', 'Organismos productores:', ['Carnívoros', 'Herbívoros', 'Plantas', 'Descomponedores'], 2, 'Plantas son productores.'],
    ['mc-bio-010', 'biologia', 'ecosistema', 'medium', 'Fotosíntesis ocurre en:', ['Mitocondrias', 'Cloroplastos', 'Núcleo', 'Ribosomas'], 1, 'En cloroplastos.', true], // PILOT #1
    ['mc-bio-011', 'biologia', 'celula', 'medium', 'Función RE rugoso:', ['Lípidos', 'Proteínas', 'Digestión', 'Agua'], 1, 'Sintetiza proteínas.'],
    ['mc-bio-012', 'biologia', 'reproduccion', 'hard', 'Fecundación ocurre en:', ['Útero', 'Ovario', 'Trompa Falopio', 'Vagina'], 2, 'En trompa de Falopio.'],
    ['mc-bio-013', 'biologia', 'genetica', 'medium', 'Meiosis produce células:', ['Mismo cromosomas', 'Doble', 'Mitad', 'Sin cromosomas'], 2, 'Mitad de cromosomas.'],
    ['mc-bio-014', 'biologia', 'evolucion', 'medium', 'Estructuras homólogas indican:', ['Convergente', 'Ancestro común', 'Artificial', 'Mutación'], 1, 'Ancestro común.'],
    ['mc-bio-015', 'biologia', 'ecosistema', 'easy', 'Consumidores primarios:', ['Productores', 'Herbívoros', 'Carnívoros', 'Descomponedores'], 1, 'Herbívoros.'],
    ['mc-bio-016', 'biologia', 'celula', 'medium', 'Pared celular vegetal:', ['Proteínas', 'Lípidos', 'Celulosa', 'ADN'], 2, 'Celulosa.'],
    ['mc-bio-017', 'biologia', 'reproduccion', 'medium', 'VIH se transmite por:', ['Contacto casual', 'Mosquitos', 'Relaciones sin protección', 'Utensilios'], 2, 'Relaciones sin protección.'],
    ['mc-bio-018', 'biologia', 'ecosistema', 'hard', 'O₂ fotosíntesis de:', ['CO₂', 'H₂O', 'Glucosa', 'ATP'], 1, 'Del agua.'],

    // MÓDULO COMÚN - FÍSICA (19-36)
    ['mc-fis-001', 'fisica', 'ondas', 'easy', 'Ondas electromagnéticas viajan a velocidad de:', ['Sonido', 'Luz', 'Variable', 'Infinita'], 1, 'Velocidad de la luz.'],
    ['mc-fis-002', 'fisica', 'ondas', 'medium', 'Longitud de onda y frecuencia son:', ['Directamente proporcionales', 'Inversamente proporcionales', 'Independientes', 'Iguales'], 1, 'Inversamente proporcionales.'],
    ['mc-fis-003', 'fisica', 'mecanica', 'medium', 'Primera ley de Newton:', ['F=ma', 'Inercia', 'Acción-reacción', 'Gravedad'], 1, 'Ley de inercia.'],
    ['mc-fis-004', 'fisica', 'mecanica', 'easy', 'Unidad de fuerza:', ['Joule', 'Newton', 'Watt', 'Pascal'], 1, 'Newton.'],
    ['mc-fis-005', 'fisica', 'mecanica', 'hard', 'Si F=ma, duplicar masa y fuerza:', ['a se duplica', 'a se reduce mitad', 'a igual', 'a se cuadruplica'], 2, 'Aceleración igual.'],
    ['mc-fis-006', 'fisica', 'energia', 'medium', 'Tectónica de placas explica:', ['Clima', 'Sismos', 'Mareas', 'Vientos'], 1, 'Sismos y volcanes.', true], // PILOT #2
    ['mc-fis-007', 'fisica', 'energia', 'easy', 'Capas de la Tierra:', ['Corteza-manto-núcleo', 'Núcleo-manto-corteza', 'Solo corteza', 'Homogénea'], 0, 'Corteza-manto-núcleo.'],
    ['mc-fis-008', 'fisica', 'electricidad', 'medium', 'Ley de Ohm:', ['V=IR', 'P=IV', 'E=mc²', 'F=ma'], 0, 'V=IR.'],
    ['mc-fis-009', 'fisica', 'electricidad', 'easy', 'Resistencias en serie:', ['Se suman', 'Se restan', 'Se multiplican', 'Se dividen'], 0, 'Se suman.'],
    ['mc-fis-010', 'fisica', 'electricidad', 'hard', 'Potencia eléctrica:', ['P=V/I', 'P=VI', 'P=V+I', 'P=I/V'], 1, 'P=VI.'],
    ['mc-fis-011', 'fisica', 'ondas', 'medium', 'Espectro electromagnético orden creciente frecuencia:', ['Radio-visible-rayos X', 'Rayos X-visible-radio', 'Visible-radio-rayos X', 'Todos igual'], 0, 'Radio-visible-rayos X.'],
    ['mc-fis-012', 'fisica', 'ondas', 'easy', 'Reflexión de luz:', ['Absorción', 'Rebote', 'Transmisión', 'Difracción'], 1, 'Rebote.'],
    ['mc-fis-013', 'fisica', 'mecanica', 'medium', 'Peso es:', ['Masa', 'Fuerza', 'Volumen', 'Densidad'], 1, 'Fuerza.'],
    ['mc-fis-014', 'fisica', 'mecanica', 'hard', 'Roce cinético vs estático:', ['Cinético mayor', 'Estático mayor', 'Iguales', 'Variable'], 1, 'Estático mayor.'],
    ['mc-fis-015', 'fisica', 'energia', 'medium', 'Deriva continental propuesta por:', ['Darwin', 'Wegener', 'Newton', 'Einstein'], 1, 'Wegener.'],
    ['mc-fis-016', 'fisica', 'electricidad', 'medium', 'Corriente eléctrica es flujo de:', ['Protones', 'Neutrones', 'Electrones', 'Átomos'], 2, 'Electrones.'],
    ['mc-fis-017', 'fisica', 'electricidad', 'easy', 'Unidad de corriente:', ['Volt', 'Ampere', 'Ohm', 'Watt'], 1, 'Ampere.'],
    ['mc-fis-018', 'fisica', 'ondas', 'hard', 'Efecto Doppler:', ['Cambio frecuencia por movimiento', 'Interferencia', 'Difracción', 'Polarización'], 0, 'Cambio frecuencia.'],

    // MÓDULO COMÚN - QUÍMICA (37-54)
    ['mc-qui-001', 'quimica', 'estructura', 'easy', 'Número atómico indica:', ['Protones', 'Neutrones', 'Electrones', 'Masa'], 0, 'Número de protones.'],
    ['mc-qui-002', 'quimica', 'estructura', 'medium', 'Modelo atómico actual:', ['Dalton', 'Thomson', 'Rutherford', 'Bohr-cuántico'], 3, 'Modelo cuántico.', true], // PILOT #3
    ['mc-qui-003', 'quimica', 'organica', 'medium', 'Carbono es tetravalente:', ['2 enlaces', '3 enlaces', '4 enlaces', '5 enlaces'], 2, '4 enlaces.'],
    ['mc-qui-004', 'quimica', 'organica', 'easy', 'Hidrocarburos contienen:', ['C y H', 'C y O', 'H y O', 'C, H y O'], 0, 'Carbono e hidrógeno.'],
    ['mc-qui-005', 'quimica', 'reacciones', 'medium', 'Ley conservación masa:', ['Masa se crea', 'Masa se destruye', 'Masa se conserva', 'Masa varía'], 2, 'Masa se conserva.'],
    ['mc-qui-006', 'quimica', 'reacciones', 'hard', 'Balancear: H₂ + O₂ → H₂O', ['1,1,1', '2,1,2', '1,2,2', '2,2,2'], 1, '2H₂ + O₂ → 2H₂O.'],
    ['mc-qui-007', 'quimica', 'reacciones', 'medium', 'Mol equivale a:', ['6.02×10²³', '6.02×10²²', '1000', '100'], 0, 'Número de Avogadro.'],
    ['mc-qui-008', 'quimica', 'reacciones', 'easy', 'Reactivo limitante:', ['Sobra', 'Se agota primero', 'No reacciona', 'Cataliza'], 1, 'Se agota primero.'],
    ['mc-qui-009', 'quimica', 'reacciones', 'hard', 'Concentración molar (M):', ['mol/L', 'g/L', 'mol/kg', 'g/mL'], 0, 'mol/L.'],
    ['mc-qui-010', 'quimica', 'reacciones', 'medium', 'Dilución aumenta:', ['Concentración', 'Volumen', 'Masa soluto', 'Temperatura'], 1, 'Volumen.'],
    ['mc-qui-011', 'quimica', 'estructura', 'medium', 'Isótopos difieren en:', ['Protones', 'Electrones', 'Neutrones', 'Carga'], 2, 'Neutrones.'],
    ['mc-qui-012', 'quimica', 'organica', 'medium', 'Grupo funcional alcohol:', ['-OH', '-COOH', '-NH₂', '-CHO'], 0, 'Hidroxilo -OH.'],
    ['mc-qui-013', 'quimica', 'organica', 'hard', 'Enlace doble C=C:', ['Alcano', 'Alqueno', 'Alquino', 'Aromático'], 1, 'Alqueno.'],
    ['mc-qui-014', 'quimica', 'reacciones', 'medium', 'Estequiometría estudia:', ['Velocidad', 'Proporciones', 'Energía', 'Equilibrio'], 1, 'Proporciones.'],
    ['mc-qui-015', 'quimica', 'reacciones', 'easy', 'Solubilidad depende de:', ['Temperatura', 'Color', 'Olor', 'Sabor'], 0, 'Temperatura.'],
    ['mc-qui-016', 'quimica', 'estructura', 'hard', 'Configuración electrónica Oxígeno:', ['1s² 2s² 2p⁴', '1s² 2s² 2p⁶', '1s² 2s² 2p²', '1s² 2s² 2p³'], 0, '1s² 2s² 2p⁴.', true], // PILOT #4
    ['mc-qui-017', 'quimica', 'organica', 'medium', 'Fórmula empírica vs molecular:', ['Igual siempre', 'Empírica simplificada', 'Molecular simplificada', 'No relacionadas'], 1, 'Empírica simplificada.'],
    ['mc-qui-018', 'quimica', 'reacciones', 'medium', 'Solución saturada:', ['Diluida', 'No disuelve más', 'Concentrada', 'Sobresaturada'], 1, 'No disuelve más.'],

    // MÓDULO ELECTIVO - BIOLOGÍA (55-80)
    ['elec-bio-001', 'biologia', 'celula', 'medium', 'Lisosomas función:', ['Fotosíntesis', 'Digestión celular', 'Síntesis proteínas', 'Respiración'], 1, 'Digestión celular.'],
    ['elec-bio-002', 'biologia', 'celula', 'hard', 'Peroxisomas degradan:', ['Proteínas', 'Peróxido hidrógeno', 'Lípidos', 'ADN'], 1, 'Peróxido de hidrógeno.'],
    ['elec-bio-003', 'biologia', 'celula', 'medium', 'Complejo Golgi:', ['Modifica proteínas', 'Produce ATP', 'Almacena ADN', 'Fotosíntesis'], 0, 'Modifica proteínas.'],
    ['elec-bio-004', 'biologia', 'celula', 'easy', 'Vacuolas en vegetales:', ['Pequeñas', 'Grandes', 'Ausentes', 'Múltiples'], 1, 'Grandes.'],
    ['elec-bio-005', 'biologia', 'reproduccion', 'hard', 'Hormona LH provoca:', ['Menstruación', 'Ovulación', 'Fecundación', 'Implantación'], 1, 'Ovulación.'],
    ['elec-bio-006', 'biologia', 'reproduccion', 'medium', 'Espermatogénesis produce:', ['1 gameto', '2 gametos', '3 gametos', '4 gametos'], 3, '4 espermatozoides.'],
    ['elec-bio-007', 'biologia', 'reproduccion', 'hard', 'Oogénesis produce:', ['1 óvulo', '2 óvulos', '3 óvulos', '4 óvulos'], 0, '1 óvulo.', true], // PILOT #5
    ['elec-bio-008', 'biologia', 'genetica', 'medium', 'Profase mitosis:', ['Cromosomas condensan', 'Cromosomas separan', 'Citocinesis', 'Duplicación ADN'], 0, 'Condensación.'],
    ['elec-bio-009', 'biologia', 'genetica', 'hard', 'Crossing-over ocurre en:', ['Mitosis', 'Meiosis I', 'Meiosis II', 'Interfase'], 1, 'Profase I meiosis.'],
    ['elec-bio-010', 'biologia', 'genetica', 'medium', 'Telofase:', ['Inicio división', 'Cromosomas centro', 'Cromosomas polos', 'Formación núcleos'], 3, 'Formación núcleos.'],
    ['elec-bio-011', 'biologia', 'evolucion', 'medium', 'Lamarck propuso:', ['Selección natural', 'Caracteres adquiridos', 'Mutaciones', 'Deriva genética'], 1, 'Herencia caracteres adquiridos.'],
    ['elec-bio-012', 'biologia', 'evolucion', 'hard', 'Especiación alopátrica:', ['Misma área', 'Áreas separadas', 'Simbiosis', 'Parasitismo'], 1, 'Separación geográfica.'],
    ['elec-bio-013', 'biologia', 'evolucion', 'medium', 'Estructuras análogas:', ['Mismo origen', 'Misma función, diferente origen', 'Vestigiales', 'Homólogas'], 1, 'Misma función.'],
    ['elec-bio-014', 'biologia', 'ecosistema', 'hard', 'Fase oscura fotosíntesis:', ['Produce O₂', 'Fija CO₂', 'Requiere luz', 'Produce H₂O'], 1, 'Fija CO₂.'],
    ['elec-bio-015', 'biologia', 'ecosistema', 'medium', 'Glucólisis ocurre en:', ['Mitocondria', 'Citoplasma', 'Núcleo', 'Cloroplasto'], 1, 'Citoplasma.'],
    ['elec-bio-016', 'biologia', 'ecosistema', 'hard', 'Ciclo Krebs produce:', ['Glucosa', 'ATP, NADH, FADH₂', 'O₂', 'CO'], 1, 'ATP, NADH, FADH₂.'],
    ['elec-bio-017', 'biologia', 'celula', 'medium', 'Citoesqueleto función:', ['Soporte', 'Fotosíntesis', 'Digestión', 'Respiración'], 0, 'Soporte celular.'],
    ['elec-bio-018', 'biologia', 'celula', 'easy', 'Nucléolo produce:', ['ADN', 'Ribosomas', 'Proteínas', 'Lípidos'], 1, 'Ribosomas.'],
    ['elec-bio-019', 'biologia', 'reproduccion', 'medium', 'Implantación embrión:', ['Día 1-3', 'Día 6-7', 'Día 14', 'Día 28'], 1, 'Día 6-7.'],
    ['elec-bio-020', 'biologia', 'genetica', 'hard', 'Anafase mitosis:', ['Cromátidas separan', 'Cromosomas condensan', 'Núcleo reforma', 'ADN duplica'], 0, 'Cromátidas separan.'],
    ['elec-bio-021', 'biologia', 'evolucion', 'medium', 'Fósiles transicionales:', ['No existen', 'Muestran evolución', 'Solo plantas', 'Recientes'], 1, 'Muestran evolución.'],
    ['elec-bio-022', 'biologia', 'ecosistema', 'medium', 'Consumidores terciarios:', ['Herbívoros', 'Carnívoros tope', 'Plantas', 'Descomponedores'], 1, 'Carnívoros tope.'],
    ['elec-bio-023', 'biologia', 'celula', 'hard', 'Transporte activo requiere:', ['ATP', 'Solo difusión', 'Ósmosis', 'Nada'], 0, 'ATP.'],
    ['elec-bio-024', 'biologia', 'reproduccion', 'medium', 'Placenta función:', ['Nutrición feto', 'Producir óvulos', 'Ovulación', 'Menstruación'], 0, 'Nutrición feto.'],
    ['elec-bio-025', 'biologia', 'genetica', 'hard', 'Mutación somática:', ['Heredable', 'No heredable', 'Siempre letal', 'Beneficiosa'], 1, 'No heredable.'],
    ['elec-bio-026', 'biologia', 'ecosistema', 'medium', 'Cadena vs red trófica:', ['Iguales', 'Red más compleja', 'Cadena más compleja', 'No relacionadas'], 1, 'Red más compleja.']
];

// Generate file content
let content = `/**
 * Simulacro Completo PAES Ciencias - Electivo Biología
 * 80 preguntas totales (75 válidas + 5 pilotaje)
 * - Módulo Común: 54 preguntas (18 Biología + 18 Física + 18 Química)
 * - Módulo Electivo Biología: 26 preguntas
 * Tiempo: 2h 40min (160 minutos)
 * Preguntas pilotaje: índices 10, 25, 40, 55, 70
 */

import { Simulation, Question } from '../../questions';

const questions: Question[] = [\n`;

allQuestions.forEach((q, idx) => {
    if (idx > 0) content += ',\n';
    content += generateQ(...q);
});

content += `\n];\n\nexport const simulacionCienciasBiologia: Simulation = {
    id: 'sim-cie-bio-001',
    subject: 'ciencias',
    title: 'Simulacro Completo PAES Ciencias - Electivo Biología',
    description: 'Simulacro oficial con 80 preguntas: 54 del módulo común (18 Biología, 18 Física, 18 Química) y 26 del electivo de Biología. Formato DEMRE con 75 preguntas válidas y 5 de pilotaje.',
    totalQuestions: 80,
    validQuestions: 75,
    pilotQuestions: 5,
    timeLimit: 160,
    optionsCount: 4,
    questions: questions,
    pilotIndices: [9, 23, 37, 54, 70],
    format: 'DEMRE'
};\n`;

// Write file
const filePath = path.join(__dirname, '../src/data/simulations/ciencias/simulacro_biologia_001.ts');
fs.writeFileSync(filePath, content, 'utf8');

console.log('✅ Generated complete Ciencias simulation with 80 questions');
console.log('   - Módulo Común: 54 questions (18 Bio + 18 Fis + 18 Qui)');
console.log('   - Módulo Electivo Biología: 26 questions');
console.log('   - Pilot questions at indices: 9, 23, 37, 54, 70');
console.log('   - Time limit: 160 minutes (2h 40min)');
