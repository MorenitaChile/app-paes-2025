import Link from "next/link";
import { useParams } from "next/navigation";
import { PAES_SYLLABUS } from "@/data/syllabus";
import styles from "./page.module.css";

export default function SubjectPage({ params }: { params: { subject: string } }) {
    const subject = PAES_SYLLABUS[params.subject];

    if (!subject) {
        return <div>Temario no encontrado</div>;
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.breadcrumb}>
                    <Link href="/material">Material Didáctico</Link> / {subject.title}
                </div>
                <h1 className={styles.title}>{subject.title}</h1>
            </header>

            <div className={styles.axesGrid}>
                {subject.axes.map((axis) => (
                    <section key={axis.id} className={styles.axisSection}>
                        <h2 className={styles.axisTitle}>{axis.title}</h2>
                        <div className={styles.topicsList}>
                            {axis.topics.map((topic) => (
                                <Link
                                    key={topic.id}
                                    href={`/material/${params.subject}/${axis.id}/${topic.id}`}
                                    className={styles.topicCard}
                                >
                                    <h3 className={styles.topicTitle}>{topic.title}</h3>
                                    {topic.description && <p>{topic.description}</p>}
                                    {topic.subtopics && topic.subtopics.length > 0 && (
                                        <div className={styles.subtopicsList}>
                                            {topic.subtopics.map((subtopic, idx) => (
                                                <span key={idx} className={styles.subtopicTag}>
                                                    {subtopic}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </Link>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}
