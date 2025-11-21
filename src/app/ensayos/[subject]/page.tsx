"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ESSAY_BANK } from "@/data/questions";
import Link from "next/link";
import styles from "./page.module.css";

export default function SubjectEssaysPage() {
    const params = useParams();
    const subject = params.subject as string;

    const essays = ESSAY_BANK[subject] || [];

    // Separar ensayos por tipo
    const fullSimulations = essays.filter(e => e.type === 'full_simulation');
    const practiceEssays = essays.filter(e => e.type !== 'full_simulation');

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

    const EssayCard = ({ essay }: { essay: any }) => (
        <div className={styles.essayCard}>
            <div className={styles.essayInfo}>
                <div className={styles.cardHeader}>
                    <h3 className={styles.essayTitle}>{essay.title}</h3>
                    {essay.type === 'full_simulation' && (
                        <span className={styles.badgeSimulation}>Simulacro</span>
                    )}
                </div>
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
    );

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>{subjectNames[subject] || subject}</h1>
                <p>Selecciona un ensayo para comenzar</p>
            </header>

            {/* Sección de Simulacros Completos */}
            {fullSimulations.length > 0 && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>🎯 Simulacros Completos</h2>
                    <p className={styles.sectionDesc}>Condiciones reales de la PAES (55-80 preguntas, 2h+)</p>
                    <div className={styles.essaysList}>
                        {fullSimulations.map(essay => (
                            <EssayCard key={essay.id} essay={essay} />
                        ))}
                    </div>
                </section>
            )}

            {/* Sección de Práctica Progresiva */}
            {practiceEssays.length > 0 && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>📚 Práctica Progresiva</h2>
                    <p className={styles.sectionDesc}>Ejercicios enfocados por tema (5-15 preguntas)</p>
                    <div className={styles.essaysList}>
                        {practiceEssays.map(essay => (
                            <EssayCard key={essay.id} essay={essay} />
                        ))}
                    </div>
                </section>
            )}

            <div className={styles.actions}>
                <Link href="/ensayos" className="btn">
                    ← Volver a Ensayos
                </Link>
            </div>
        </div>
    );
}
