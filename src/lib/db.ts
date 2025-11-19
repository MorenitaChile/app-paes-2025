import fs from 'fs';
import path from 'path';
import { sql } from '@vercel/postgres';

const DB_PATH = path.join(process.cwd(), 'src', 'data', 'db.json');

export type User = {
    id?: string;
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

// --- Local JSON Implementation ---
class LocalJsonDb {
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

    static async getUser(): Promise<User> {
        return this.read().user;
    }

    static async saveEssayResult(result: EssayResult) {
        const db = this.read();
        db.essayResults.push(result);

        // Update streak logic
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

// --- Vercel Postgres Implementation ---
const DEFAULT_USER_ID = 'default-user-001';

class PostgresDb {
    static async getUser(): Promise<User> {
        try {
            // Ensure user exists (upsert)
            await sql`
                INSERT INTO users (id, name, email, "lastStudyDate", streak)
                VALUES (${DEFAULT_USER_ID}, 'Estudiante PAES', 'estudiante@ejemplo.com', NOW(), 1)
                ON CONFLICT (id) DO NOTHING;
            `;

            const userResult = await sql`SELECT * FROM users WHERE id = ${DEFAULT_USER_ID}`;
            const user = userResult.rows[0];

            return {
                id: user.id,
                name: user.name,
                email: user.email,
                streak: user.streak || 0,
                lastStudyDate: user.lastStudyDate ? new Date(user.lastStudyDate).toISOString() : new Date().toISOString()
            };
        } catch (error) {
            console.error('Postgres Error (getUser):', error);
            // Fallback to mock if DB fails (e.g. not set up yet)
            return INITIAL_DB.user;
        }
    }

    static async saveEssayResult(result: EssayResult) {
        try {
            await sql`
                INSERT INTO essay_results (id, "userId", "essayId", subject, score, "correctAnswers", "totalQuestions", date, answers)
                VALUES (
                    ${result.id}, 
                    ${DEFAULT_USER_ID}, 
                    ${result.essayId}, 
                    ${result.subject}, 
                    ${result.score}, 
                    ${result.correctAnswers}, 
                    ${result.totalQuestions}, 
                    ${result.date}, 
                    ${JSON.stringify(result.answers)}
                );
            `;

            // Update streak
            await sql`
                UPDATE users 
                SET streak = streak + 1, "lastStudyDate" = NOW()
                WHERE id = ${DEFAULT_USER_ID};
            `;

            return result;
        } catch (error) {
            console.error('Postgres Error (saveEssayResult):', error);
            throw error;
        }
    }

    static async getEssayHistory() {
        try {
            const result = await sql`
                SELECT * FROM essay_results 
                WHERE "userId" = ${DEFAULT_USER_ID} 
                ORDER BY date DESC
            `;

            return result.rows.map(row => ({
                id: row.id,
                essayId: row.essayId,
                subject: row.subject,
                score: row.score,
                correctAnswers: row.correctAnswers,
                totalQuestions: row.totalQuestions,
                date: row.date,
                answers: row.answers // Postgres returns JSONB as object automatically
            })) as EssayResult[];
        } catch (error) {
            console.error('Postgres Error (getEssayHistory):', error);
            return [];
        }
    }
}

// Export the appropriate implementation based on environment
// In development, use LocalJsonDb. In production (Vercel), use PostgresDb.
export const JsonDb = process.env.NODE_ENV === 'production' ? PostgresDb : LocalJsonDb;

