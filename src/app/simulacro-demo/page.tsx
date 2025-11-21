/**
 * Simulation Demo Page
 * Demonstrates the complete DEMRE simulation system
 */

'use client';

import SimulationEngine from '@/components/SimulationEngine';
import { simulacionM1MVP } from '@/data/simulations';
import { useState } from 'react';
import styles from './page.module.css';

export default function SimulationDemoPage() {
    const [started, setStarted] = useState(false);

    if (started) {
        return (
            <SimulationEngine
                simulation={simulacionM1MVP}
                onExit={() => setStarted(false)}
            />
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>🎯 Simulacro PAES - Matemática M1</h1>

                <div className={styles.info}>
                    <h2>Formato Oficial DEMRE</h2>
                    <p>Este simulacro replica el formato oficial de la Prueba de Acceso a la Educación Superior (PAES).</p>
                </div>

                <div className={styles.details}>
                    <div className={styles.detailItem}>
                        <div className={styles.detailIcon}>📝</div>
                        <div className={styles.detailContent}>
                            <div className={styles.detailLabel}>Total de Preguntas</div>
                            <div className={styles.detailValue}>{simulacionM1MVP.totalQuestions}</div>
                        </div>
                    </div>

                    <div className={styles.detailItem}>
                        <div className={styles.detailIcon}>✅</div>
                        <div className={styles.detailContent}>
                            <div className={styles.detailLabel}>Preguntas Válidas</div>
                            <div className={styles.detailValue}>{simulacionM1MVP.validQuestions}</div>
                        </div>
                    </div>

                    <div className={styles.detailItem}>
                        <div className={styles.detailIcon}>🔬</div>
                        <div className={styles.detailContent}>
                            <div className={styles.detailLabel}>Preguntas Pilotaje</div>
                            <div className={styles.detailValue}>{simulacionM1MVP.pilotQuestions}</div>
                        </div>
                    </div>

                    <div className={styles.detailItem}>
                        <div className={styles.detailIcon}>⏱️</div>
                        <div className={styles.detailContent}>
                            <div className={styles.detailLabel}>Tiempo Límite</div>
                            <div className={styles.detailValue}>{simulacionM1MVP.timeLimit} minutos</div>
                        </div>
                    </div>
                </div>

                <div className={styles.features}>
                    <h3>Características del Simulacro</h3>
                    <ul>
                        <li>✅ <strong>Timer en tiempo real</strong> con alertas de tiempo</li>
                        <li>✅ <strong>Navegador de preguntas</strong> para saltar entre ellas</li>
                        <li>✅ <strong>Sistema de marcado</strong> para revisar después</li>
                        <li>✅ <strong>Preguntas de pilotaje</strong> (no cuentan para puntaje)</li>
                        <li>✅ <strong>Cálculo automático</strong> de puntaje PAES (100-1000)</li>
                        <li>✅ <strong>Análisis detallado</strong> de resultados y percentil</li>
                    </ul>
                </div>

                <div className={styles.instructions}>
                    <h3>Instrucciones</h3>
                    <ol>
                        <li>Lee cada pregunta cuidadosamente</li>
                        <li>Selecciona una de las 4 opciones (A, B, C, D)</li>
                        <li>Usa el navegador para saltar entre preguntas si lo deseas</li>
                        <li>Marca preguntas para revisarlas después</li>
                        <li>El timer te avisará cuando quede poco tiempo</li>
                        <li>Al finalizar, verás tu puntaje PAES y análisis completo</li>
                    </ol>
                </div>

                <div className={styles.note}>
                    <strong>⚠️ Nota importante:</strong> Las preguntas de pilotaje NO están identificadas
                    (simulando la prueba real). Solo se cuentan las {simulacionM1MVP.validQuestions} preguntas válidas
                    para el puntaje final.
                </div>

                <button onClick={() => setStarted(true)} className={styles.startButton}>
                    🚀 Iniciar Simulacro
                </button>

                <div className={styles.disclaimer}>
                    <p>
                        Este es un simulacro de demostración con {simulacionM1MVP.totalQuestions} preguntas.
                        El formato oficial DEMRE contiene 65 preguntas (60 válidas + 5 pilotaje)
                        con tiempo de 140 minutos.
                    </p>
                </div>
            </div>
        </div>
    );
}
