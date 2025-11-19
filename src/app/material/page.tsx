import Link from "next/link";
import { PAES_SYLLABUS } from "@/data/syllabus";
import styles from "./page.module.css";

const subjectStyles: Record<string, string> = {
    lectora: styles.lectora,
    ciencias: styles.ciencias,
    m1: styles.m1,
    m2: styles.m2,
};

export default function MaterialPage() {
    const subjects = Object.values(PAES_SYLLABUS);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Material Didáctico</h1>
                <p>Explora el contenido organizado por temario y eje temático.</p>
            </header>

            <div className={styles.grid}>
                {subjects.map((subject) => (
                    <Link
                        key={subject.id}
                        href={`/material/${subject.id}`}
                        className={`${styles.subjectCard} ${subjectStyles[subject.id]}`}
                    >
                        <h2 className={styles.subjectTitle}>{subject.title}</h2>
                        <div className={styles.axesList}>
                            {subject.axes.map((axis) => (
                                <div key={axis.id} className={styles.axisItem}>
                                    {axis.title}
                                </div>
                            ))}
                        </div>
                        <span className={styles.subjectAction}>Explorar →</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
