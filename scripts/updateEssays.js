// Script to update all essays with type field and recalculate time limits
const fs = require('fs');
const path = require('path');

const TIME_PER_QUESTION = {
    lectora: 2.5,
    ciencias: 2.1,
    m1: 2.3,
    m2: 2.8
};

const questionsPath = path.join(__dirname, '../src/data/questions.ts');
let content = fs.readFileSync(questionsPath, 'utf8');

// Find all essay objects and add type field + recalculate timeLimit
const essayRegex = /{\s*id:\s*'([^']+)',\s*subject:\s*'([^']+)',\s*title:\s*'([^']+)',\s*description:\s*'([^']+)',\s*timeLimit:\s*(\d+),\s*questions:\s*\[/g;

let match;
const updates = [];

while ((match = essayRegex.exec(content)) !== null) {
    const [fullMatch, id, subject, title, description, oldTimeLimit] = match;
    const startIndex = match.index;

    // Find the end of this essay object (find matching closing brace)
    let braceCount = 1;
    let endIndex = startIndex + fullMatch.length;

    while (braceCount > 0 && endIndex < content.length) {
        if (content[endIndex] === '{') braceCount++;
        if (content[endIndex] === '}') braceCount--;
        endIndex++;
    }

    // Extract the questions array to count questions
    const essayContent = content.substring(startIndex, endIndex);
    const questionMatches = essayContent.match(/id:\s*'[^']+'/g);
    const questionCount = questionMatches ? questionMatches.length : 1;

    // Calculate new time limit
    const timePerQuestion = TIME_PER_QUESTION[subject] || 2.5;
    const newTimeLimit = Math.ceil(questionCount * timePerQuestion);

    updates.push({
        id,
        subject,
        oldTimeLimit: parseInt(oldTimeLimit),
        newTimeLimit,
        questionCount
    });
}

console.log('Found', updates.length, 'essays to update');
console.log('\nUpdates:');
updates.forEach(u => {
    console.log(`${u.id}: ${u.questionCount} questions, ${u.oldTimeLimit}min → ${u.newTimeLimit}min`);
});

// Now perform the actual replacements
// Replace pattern: description: '...', timeLimit: X,
// With: description: '...', type: 'practice', timeLimit: X,

const replacements = [];
updates.forEach(u => {
    const oldPattern = new RegExp(
        `(id:\\s*'${u.id}',\\s*subject:\\s*'${u.subject}',\\s*title:\\s*'[^']+',\\s*description:\\s*'[^']+',)\\s*timeLimit:\\s*\\d+,`,
        'g'
    );

    content = content.replace(oldPattern, `$1\n            type: 'practice',\n            timeLimit: ${u.newTimeLimit},`);
});

fs.writeFileSync(questionsPath, content, 'utf8');
console.log('\n✅ Updated questions.ts successfully!');
