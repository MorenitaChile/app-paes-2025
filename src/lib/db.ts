import fs from 'fs';
import path from 'path';
import { sql } from '@vercel/postgres';

const DB_PATH = path.join(process.cwd(), 'src', 'data', 'db.json');

export type User = {
    id: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
    streak: number;
    lastStudyDate: string;
    createdAt?: string;
};

export type EssayResult = {
    id: string;
    userId: string;
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
        id: 'default-user',
        name: 'Estudiante',
        lastName: 'PAES',
        email: '',
        password: '',
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

    static async getUser(userId?: string): Promise<User | null> {
        const db = this.read();
        if (userId && db.user.id !== userId) {
            return null;
        }
        return db.user;
    }

    static async getUserByEmail(email: string): Promise<User | null> {
        const db = this.read();
        if (db.user.email === email) return db.user;
        if (!db.user.email) return null;
        return null;
    }

    static async createUser(user: User): Promise<User> {
        const db = this.read();
        db.user = { ...user, id: user.id || 'local-user-' + Date.now() };
        this.write(db);
        return db.user;
    }

    static async saveEssayResult(result: EssayResult) {
        const db = this.read();
        db.essayResults.push(result);

        const today = new Date().toISOString().split('T')[0];
        const lastDate = db.user.lastStudyDate.split('T')[0];
        if (today !== lastDate) {
            db.user.streak += 1;
            db.user.lastStudyDate = new Date().toISOString();
        }

        this.write(db);
        return result;
    }

    static async getEssayHistory(userId: string) {
        const db = this.read();
        if (!userId) return [];
        return db.essayResults.filter(result => result.userId === userId);
    }
}

// --- Vercel Postgres Implementation ---
class PostgresDb {
    static async getUser(userId: string): Promise<User | null> {
        if (!userId) return null;
        try {
            const userResult = await sql`SELECT * FROM users WHERE id = ${userId}`;
            if (userResult.rows.length === 0) {
                return null;
            }
            const user = userResult.rows[0];

            return {
                id: user.id,
                name: user.name,
                lastName: user.lastName || '',
                email: user.email,
                password: user.password || '',
                streak: user.streak || 0,
                lastStudyDate: user.lastStudyDate ? new Date(user.lastStudyDate).toISOString() : new Date().toISOString()
            };
        } catch (error) {
            console.error('Postgres Error (getUser):', error);
            return null;
        }
    }

    static async getUserByEmail(email: string): Promise<User | null> {
        try {
            const result = await sql`SELECT * FROM users WHERE email = ${email}`;
            if (result.rows.length === 0) return null;
            const user = result.rows[0];
            return {
                id: user.id,
                name: user.name,
                lastName: user.lastName || '',
                email: user.email,
                password: user.password || '',
                streak: user.streak || 0,
                lastStudyDate: user.lastStudyDate ? new Date(user.lastStudyDate).toISOString() : new Date().toISOString()
            };
        } catch (error) {
            console.error('Postgres Error (getUserByEmail):', error);
            return null;
        }
    }

    static async createUser(user: User): Promise<User> {
        try {
            const id = user.id || crypto.randomUUID();
            await sql`
                INSERT INTO users (id, name, "lastName", email, password, "lastStudyDate", streak)
                VALUES (${id}, ${user.name}, ${user.lastName}, ${user.email}, ${user.password}, ${user.lastStudyDate}, ${user.streak})
            `;
            return { ...user, id };
        } catch (error) {
            console.error('Postgres Error (createUser):', error);
            throw error;
        }
    }

    static async saveEssayResult(result: EssayResult) {
        try {
            await sql`
                INSERT INTO essay_results (id, "userId", "essayId", subject, score, "correctAnswers", "totalQuestions", date, answers)
                VALUES (
                    ${result.id}, 
                    ${result.userId},
                    ${result.essayId}, 
                    ${result.subject}, 
                    ${result.score}, 
                    ${result.correctAnswers}, 
                    ${result.totalQuestions}, 
                    ${result.date}, 
                    ${JSON.stringify(result.answers)}
                );
            `;

            await sql`
                UPDATE users 
                SET streak = streak + 1, "lastStudyDate" = NOW()
                WHERE id = ${result.userId};
            `;

            return result;
        } catch (error) {
            console.error('Postgres Error (saveEssayResult):', error);
            throw error;
        }
    }

    static async getEssayHistory(userId: string) {
        if (!userId) return [];
        try {
            const result = await sql`
                SELECT * FROM essay_results 
                WHERE "userId" = ${userId} 
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
                answers: row.answers
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

