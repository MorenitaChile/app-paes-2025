// Script to append simulations to ESSAY_BANK
const fs = require('fs');
const path = require('path');

const questionsPath = path.join(__dirname, '../src/data/questions.ts');
let content = fs.readFileSync(questionsPath, 'utf8');

// Append simulation imports and conversions
const appendCode = `
// Import simulations
import { simulacionCienciasBiologia, simulacionM2 } from './simulations';

// Convert Simulation to Essay format for compatibility
const cienciasSimulationAsEssay: Essay = {
    id: simulacionCienciasBiologia.id,
    subject: simulacionCienciasBiologia.subject,
    title: simulacionCienciasBiologia.title,
    description: simulacionCienciasBiologia.description,
    type: 'full_simulation',
    timeLimit: simulacionCienciasBiologia.timeLimit,
    questions: simulacionCienciasBiologia.questions
};

const m2SimulationAsEssay: Essay = {
    id: simulacionM2.id,
    subject: simulacionM2.subject,
    title: simulacionM2.title,
    description: simulacionM2.description,
    type: 'full_simulation',
    timeLimit: simulacionM2.timeLimit,
    questions: simulacionM2.questions
};

// Add simulations to ESSAY_BANK
ESSAY_BANK.ciencias.push(cienciasSimulationAsEssay);
ESSAY_BANK.m2.push(m2SimulationAsEssay);
`;

content += appendCode;

fs.writeFileSync(questionsPath, content, 'utf8');
console.log('✅ Added simulations to ESSAY_BANK');
