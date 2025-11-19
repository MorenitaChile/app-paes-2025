import Link from "next/link";
import styles from "./page.module.css";

const subjects = [
    {
        id: "lectora",
        title: "Competencia Lectora",
        description: "Análisis de textos narrativos y argumentativos. Énfasis en textos extensos.",
        styleClass: styles.lectora,
        href: "/ensayos/lectora"
    },
    {
        id: "ciencias",
        title: "Ciencias",
        description: "Biología, Física y Química. Resolución de problemas y aplicación de conceptos.",
        styleClass: styles.ciencias,
        href: "/ensayos/ciencias"
    },
    {
        id: "m1",
        title: "Matemática M1",
        description: "Números, Álgebra, Geometría y Estadística. Ejercicios de desarrollo.",
        styleClass: styles.m1,
        href: "/ensayos/m1"
    },
    {
        id: "m2",
        title: "Matemática M2",
        description: "Profundización en funciones, trigonometría y probabilidad avanzada.",
        styleClass: styles.m2,
        href: "/ensayos/m2"
    }
];

export default function EnsayosPage() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Práctica de Ensayos</h1>
                <p>Selecciona una competencia para comenzar un ensayo personalizado.</p>
            </header>

            <div className={styles.grid}>
                {subjects.map((subject) => (
                    <Link key={subject.id} href={subject.href} className={`${styles.card} ${subject.styleClass}`}>
                        <h2 className={styles.cardTitle}>{subject.title}</h2>
                        <p className={styles.cardDescription}>{subject.description}</p>
                        <span className={styles.cardAction}>Comenzar Ensayo →</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
