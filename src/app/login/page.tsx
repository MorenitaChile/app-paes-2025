"use client";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./page.module.css";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (searchParams.get('registered') === 'true') {
            setSuccess('¡Cuenta creada exitosamente! Ahora puedes iniciar sesión.');
        }
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (result?.error) {
            setError("Credenciales inválidas. Intenta de nuevo.");
        } else {
            router.push("/dashboard");
            router.refresh();
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Iniciar Sesión</h1>
                <p className={styles.subtitle}>Ingresa para guardar tu progreso</p>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email">Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tu@email.com"
                            required
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="******"
                            required
                            className={styles.input}
                        />
                    </div>

                    {success && <p className={styles.success}>{success}</p>}
                    {error && <p className={styles.error}>{error}</p>}

                    <button type="submit" className="btn btn-primary">
                        Ingresar
                    </button>
                </form>

                <p className={styles.footer}>
                    ¿No tienes cuenta? <a href="/register">Crear Cuenta</a>
                </p>
            </div>
        </div>
    );
}
