"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ESSAY_BANK } from "@/data/questions";
import Link from "next/link";
import styles from "./page.module.css";

export default function SubjectEssaysPage() {
    const params = useParams();
    const router = useRouter();
    const subject = params.subject as string;

    const essays = ESSAY_BANK[subject] || [];

    if (essays.length === 0) {
        return (
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.title}>No hay ensayos disponibles</h1>
                    <p>No se encontraron ensayos para esta materia.</p>
                </header>
                <Link href="/ensayos" className="btn">
                    ← Volver a Ensayos
                </Link>
            </div>
        );
    }

    const subjectNames: Record<string, string> = {
        lectora: "Competencia Lectora",
        ciencias: "Ciencias",
        m1: "Matemática M1",
        m2: "Matemática M2"
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>{subjectNames[subject] || subject}</h1>
                <p>Selecciona un ensayo para comenzar</p>
            </header>

            <div className={styles.essaysList}>
                {essays.map((essay, index) => (
                    <div key={essay.id} className={styles.essayCard}>
                        <div className={styles.essayInfo}>
                            <h3 className={styles.essayTitle}>{essay.title}</h3>
                            <p className={styles.essayMeta}>
                                {essay.questions.length} preguntas • {essay.timeLimit} minutos
                            </p>
                            {essay.description && (
                                <p className={styles.essayDescription}>{essay.description}</p>
                            )}
                        </div>
                        <Link
                            href={`/ensayos/${subject}/${essay.id}`}
                            className="btn btn-primary"
                        >
                            Comenzar →
                        </Link>
                    </div>
                ))}
            </div>

            <div className={styles.actions}>
                <Link href="/ensayos" className="btn">
                    ← Volver a Ensayos
                </Link>
            </div>
        </div>
    );
}
