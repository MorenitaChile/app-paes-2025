"use client";

import { useState, useEffect } from "react";
import ProgressCard from "@/components/Dashboard/ProgressCard";
import styles from "./page.module.css";

export default function ProgresoPage() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/user/progress')
            .then(res => res.json())
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className={styles.container}>Cargando progreso...</div>;
    if (!data) return <div className={styles.container}>Error al cargar datos.</div>;

    const { stats, history, user } = data;

    const subjectProgress = [
        { name: "Competencia Lectora", progress: stats.progress.lectora || 0, color: "var(--color-lectora)" },
        { name: "Ciencias", progress: stats.progress.ciencias || 0, color: "var(--color-ciencias)" },
        { name: "Matemática M1", progress: stats.progress.m1 || 0, color: "var(--color-m1)" },
        { name: "Matemática M2", progress: stats.progress.m2 || 0, color: "var(--color-m2)" },
    ];

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Hola, {user.name}</h1>
                <p>Revisa tu desempeño y evolución en cada competencia.</p>
            </header>

            <div className={styles.statsGrid}>
                <ProgressCard
                    title="Promedio General"
                    value={stats.avgScore.toString()}
                    description="En ensayos realizados"
                />
                <ProgressCard
                    title="Ensayos Completados"
                    value={stats.totalEssays.toString()}
                    description="Total histórico"
                />
                <ProgressCard
                    title="Racha Actual"
                    value={`${user.streak} días`}
                    description="¡Sigue así!"
                />
                <ProgressCard
                    title="Tiempo Total"
                    value={`${Math.round(stats.timeStudied / 60)}h`}
                    description="Estimado"
                />
            </div>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Progreso por Temario</h2>
                <div className={styles.subjectProgress}>
                    {subjectProgress.map((subject) => (
                        <div key={subject.name} className={styles.progressItem}>
                            <div className={styles.progressHeader}>
                                <span className={styles.subjectName}>{subject.name}</span>
                                <span>{subject.progress}%</span>
                            </div>
                            <div className={styles.progressBar}>
                                <div
                                    className={styles.progressFill}
                                    style={{
                                        width: `${subject.progress}%`,
                                        background: subject.color
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Historial Reciente</h2>
                <div className={styles.historyList}>
                    {history.length === 0 ? (
                        <p>No has realizado ensayos aún.</p>
                    ) : (
                        history.map((item: any) => (
                            <div key={item.id} className={styles.historyItem}>
                                <div className={styles.historyInfo}>
                                    <span className={styles.historyTitle}>
                                        {item.subject.toUpperCase()} - {new Date(item.date).toLocaleDateString()}
                                    </span>
                                    <span className={styles.historyDate}>
                                        {item.correctAnswers}/{item.totalQuestions} correctas
                                    </span>
                                </div>
                                <span className={styles.historyScore}>{item.score} pts</span>
                            </div>
                        ))
                    )}
                </div>
            </section>
        </div>
    );
}
