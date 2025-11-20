import { NextResponse } from 'next/server';
import { JsonDb, EssayResult } from '@/lib/db';
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions)
        if (!session || !session.user) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }
        
        const userId = (session.user as any).id;

        const body = await request.json();
        const { essayId, subject, score, correctAnswers, totalQuestions, answers } = body;

        const newResult: EssayResult = {
            id: Date.now().toString(),
            userId,
            essayId,
            subject,
            score,
            correctAnswers,
            totalQuestions,
            date: new Date().toISOString(),
            answers
        };

        await JsonDb.saveEssayResult(newResult);

        return NextResponse.json({ success: true, data: newResult });
    } catch (error) {
        console.error('Error saving essay:', error);
        return NextResponse.json({ success: false, error: 'Failed to save result' }, { status: 500 });
    }
}
