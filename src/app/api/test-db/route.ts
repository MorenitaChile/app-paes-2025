import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { JsonDb } from '@/lib/db';

export async function GET() {
    const isProduction = process.env.NODE_ENV === 'production';

    try {
        if (isProduction) {
            // Test Postgres Connection
            const result = await sql`SELECT NOW();`;
            return NextResponse.json({
                status: 'success',
                mode: 'production (Postgres)',
                timestamp: result.rows[0].now,
                message: 'Connected to Vercel Postgres successfully!'
            });
        } else {
            // Test Local JSON
            const user = await JsonDb.getUser();
            return NextResponse.json({
                status: 'success',
                mode: 'development (Local JSON)',
                data: { user },
                message: 'Local JSON DB is working correctly.'
            });
        }
    } catch (error: any) {
        return NextResponse.json({
            status: 'error',
            mode: isProduction ? 'production' : 'development',
            message: error.message,
            details: 'Check your .env.local configuration'
        }, { status: 500 });
    }
}
