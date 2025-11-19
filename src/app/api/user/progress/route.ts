import { NextResponse } from 'next/server';
import { JsonDb } from '@/lib/db';

export async function GET() {
    try {
        const db = JsonDb.read();

        // Calculate stats
        const history = db.essayResults.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        const totalEssays = history.length;

        // Average score
        const avgScore = totalEssays > 0
            ? Math.round(history.reduce((sum, r) => sum + r.score, 0) / totalEssays)
            : 0;

        // Progress per subject
        const subjects = ['lectora', 'm1', 'm2', 'ciencias'];
        const progress = subjects.reduce((acc, subj) => {
            const subjectEssays = history.filter(h => h.subject === subj);
            // Simple progress metric: 20% per essay completed, max 100%
            acc[subj] = Math.min(subjectEssays.length * 20, 100);
            return acc;
        }, {} as Record<string, number>);

        return NextResponse.json({
            user: db.user,
            stats: {
                totalEssays,
                avgScore,
                timeStudied: totalEssays * 45, // Estimate 45 mins per essay
                progress
            },
            history: history.slice(0, 5) // Last 5 essays
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 });
    }
}
