import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { JsonDb } from '@/lib/db';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        const userId = (session?.user as any)?.id;

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const user = await JsonDb.getUser(userId);
        const history = await JsonDb.getEssayHistory(userId);

        // Sort by date (most recent first)
        const sortedHistory = history.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        const totalEssays = sortedHistory.length;

        // Average score
        const avgScore = totalEssays > 0
            ? Math.round(sortedHistory.reduce((sum, r) => sum + r.score, 0) / totalEssays)
            : 0;

        // Progress per subject
        const subjects = ['lectora', 'm1', 'm2', 'ciencias'];
        const progress = subjects.reduce((acc, subj) => {
            const subjectEssays = sortedHistory.filter(h => h.subject === subj);
            // Simple progress metric: 20% per essay completed, max 100%
            acc[subj] = Math.min(subjectEssays.length * 20, 100);
            return acc;
        }, {} as Record<string, number>);

        return NextResponse.json({
            user,
            stats: {
                totalEssays,
                avgScore,
                timeStudied: totalEssays * 45, // Estimate 45 mins per essay
                progress
            },
            history: sortedHistory.slice(0, 5) // Last 5 essays
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 });
    }
}
