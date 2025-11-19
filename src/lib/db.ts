import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'src', 'data', 'db.json');

export type User = {
    name: string;
    email: string;
    streak: number;
    lastStudyDate: string;
};

export type EssayResult = {
    id: string;
    essayId: string;
    subject: string;
    score: number; // PAES score
    correctAnswers: number;
    totalQuestions: number;
    date: string;
    answers: Record<string, string>; // questionId -> answer
};

export type TopicProgress = {
    topicId: string;
    status: 'locked' | 'in-progress' | 'completed';
    score?: number;
};

export type DatabaseSchema = {
    user: User;
    essayResults: EssayResult[];
    topicProgress: TopicProgress[];
};

const INITIAL_DB: DatabaseSchema = {
    user: {
        name: 'Estudiante',
        email: '',
        streak: 0,
        lastStudyDate: new Date().toISOString(),
    },
    essayResults: [],
    topicProgress: [],
};

export class JsonDb {
    private static ensureDbExists() {
        if (!fs.existsSync(DB_PATH)) {
            const dir = path.dirname(DB_PATH);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            fs.writeFileSync(DB_PATH, JSON.stringify(INITIAL_DB, null, 2));
        }
    }

    static read(): DatabaseSchema {
        this.ensureDbExists();
        const data = fs.readFileSync(DB_PATH, 'utf-8');
        try {
            return JSON.parse(data);
        } catch (error) {
            return INITIAL_DB;
        }
    }

    static write(data: DatabaseSchema) {
        this.ensureDbExists();
        fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    }

    static async saveEssayResult(result: EssayResult) {
        const db = this.read();
        db.essayResults.push(result);

        // Update streak logic could go here
        const today = new Date().toISOString().split('T')[0];
        const lastDate = db.user.lastStudyDate.split('T')[0];
        if (today !== lastDate) {
            db.user.streak += 1;
            db.user.lastStudyDate = new Date().toISOString();
        }

        this.write(db);
        return result;
    }

    static async getEssayHistory() {
        const db = this.read();
        return db.essayResults;
    }
}
