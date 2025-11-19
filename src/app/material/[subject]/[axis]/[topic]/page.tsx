"use client";

import { useState } from "react";
import Link from "next/link";
import { PAES_SYLLABUS } from "@/data/syllabus";
import { TOPIC_CONTENT } from "@/data/content";
import styles from "./page.module.css";

export default function TopicPage({
    params
}: {
    params: { subject: string; axis: string; topic: string }
}) {
    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
    const [showFeedback, setShowFeedback] = useState<Record<number, boolean>>({});

    const subject = PAES_SYLLABUS[params.subject];
    if (!subject) return <div>Temario no encontrado</div>;

    const axis = subject.axes.find(a => a.id === params.axis);
    if (!axis) return <div>Eje no encontrado</div>;

    const topic = axis.topics.find(t => t.id === params.topic);
    if (!topic) return <div>Tema no encontrado</div>;

    const content = TOPIC_CONTENT[params.topic];

    if (!content) {
        return (
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.title}>{topic.title}</h1>
                </header>
                <div className={styles.contentSection}>
                    <p>El contenido para este tema está en desarrollo.</p>
                    <Link href={`/material/${params.subject}`} className="btn">
                        Volver al temario
                    </Link>
                </div>
            </div>
        );
    }

    const handleOptionClick = (questionId: number, optionIdx: number) => {
        if (showFeedback[questionId]) return; // Prevent changing answer after feedback
        setSelectedAnswers({ ...selectedAnswers, [questionId]: optionIdx });
    };

    const checkAnswer = (questionId: number) => {
        setShowFeedback({ ...showFeedback, [questionId]: true });
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.breadcrumb}>
                    <Link href="/material">Material Didáctico</Link> /{" "}
                    <Link href={`/material/${params.subject}`}>{subject.title}</Link> /{" "}
                    {axis.title} / {topic.title}
                </div>
                <h1 className={styles.title}>{topic.title}</h1>
            </header>

            <section className={styles.contentSection}>
                <h2 className={styles.sectionTitle}>Teoría</h2>
                <div className={styles.content}>
                    {content.theory.map((block, idx) => {
                        if (typeof block === 'string') {
                            return <p key={idx}>{block}</p>;
                        } else if (block.type === 'image') {
                            return (
                                <div key={idx} className={styles.imageContainer}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={block.src} alt={block.alt} className={styles.contentImage} />
                                    {block.caption && <span className={styles.caption}>{block.caption}</span>}
                                </div>
                            );
                        }
                        return null;
                    })}

                    {topic.subtopics && topic.subtopics.length > 0 && (
                        <div className={styles.subtopicsSection}>
                            <h3>Conceptos Clave:</h3>
                            <ul>
                                {topic.subtopics.map((subtopic, idx) => (
                                    <li key={idx}>{subtopic}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </section>

            <section className={styles.contentSection}>
                <h2 className={styles.sectionTitle}>Ejemplos Trabajados</h2>
                {content.examples.map((example, idx) => (
                    <div key={idx} className={styles.exampleBox}>
                        <h3>{example.title}</h3>
                        <p style={{ whiteSpace: 'pre-wrap' }}>{example.content}</p>
                        {example.solution && (
                            <div className={styles.solution}>
                                <strong>Solución:</strong> {example.solution}
                            </div>
                        )}
                    </div>
                ))}
            </section>

            <section className={styles.miniQuiz}>
                <h2 className={styles.quizTitle}>Mini Evaluación</h2>
                {content.quiz.map((question) => (
                    <div key={question.id} className={styles.questionCard}>
                        <p className={styles.questionText}>{question.text}</p>
                        <div className={styles.options}>
                            {question.options.map((option, idx) => {
                                const isSelected = selectedAnswers[question.id] === idx;
                                const isCorrect = question.correct === idx;
                                const showResult = showFeedback[question.id];

                                let optionStyle = {};
                                if (showResult) {
                                    if (isCorrect) optionStyle = { background: 'var(--color-ciencias-light)', borderColor: 'var(--color-ciencias)' };
                                    else if (isSelected) optionStyle = { background: 'var(--error-light)', borderColor: 'var(--error)' };
                                } else if (isSelected) {
                                    optionStyle = { background: 'var(--muted-light)', borderColor: 'var(--primary)' };
                                }

                                return (
                                    <div
                                        key={idx}
                                        className={styles.option}
                                        onClick={() => handleOptionClick(question.id, idx)}
                                        style={optionStyle}
                                    >
                                        {option}
                                    </div>
                                );
                            })}
                        </div>
                        {!showFeedback[question.id] ? (
                            <button
                                className="btn btn-primary"
                                onClick={() => checkAnswer(question.id)}
                                disabled={selectedAnswers[question.id] === undefined}
                                style={{ marginTop: '1rem' }}
                            >
                                Verificar
                            </button>
                        ) : (
                            <div className={styles.feedback}>
                                <p>{question.explanation}</p>
                            </div>
                        )}
                    </div>
                ))}
            </section>

            <div className={styles.navigation}>
                <Link href={`/material/${params.subject}`} className="btn">
                    ← Volver a {subject.title}
                </Link>
            </div>
        </div>
    );
}
