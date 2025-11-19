import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { JsonDb } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const { name, lastName, email, password } = await request.json();

        // Validación básica
        if (!name || !lastName || !email || !password) {
            return NextResponse.json(
                { error: 'Todos los campos son requeridos' },
                { status: 400 }
            );
        }

        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Email inválido' },
                { status: 400 }
            );
        }

        // Validar longitud de contraseña
        if (password.length < 6) {
            return NextResponse.json(
                { error: 'La contraseña debe tener al menos 6 caracteres' },
                { status: 400 }
            );
        }

        // Verificar si el usuario ya existe
        const existingUser = await JsonDb.getUserByEmail(email);
        if (existingUser) {
            return NextResponse.json(
                { error: 'El email ya está registrado' },
                { status: 409 }
            );
        }

        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear usuario
        const userId = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const newUser = {
            id: userId,
            name,
            lastName,
            email,
            password: hashedPassword,
            lastStudyDate: new Date().toISOString(),
            streak: 0,
            createdAt: new Date().toISOString()
        };

        await JsonDb.createUser(newUser);

        return NextResponse.json(
            {
                success: true,
                message: 'Usuario creado exitosamente',
                user: {
                    id: userId,
                    name,
                    lastName,
                    email
                }
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error en registro:', error);
        return NextResponse.json(
            { error: 'Error al crear usuario' },
            { status: 500 }
        );
    }
}
