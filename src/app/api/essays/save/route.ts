import { NextResponse } from 'next/server';
import { JsonDb, EssayResult } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { essayId, subject, score, correctAnswers, totalQuestions, answers } = body;

        const newResult: EssayResult = {
            id: Date.now().toString(),
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
