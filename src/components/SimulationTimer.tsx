/**
 * Simulation Timer Component
 * Displays countdown timer with visual warnings
 */

'use client';

import { useEffect, useState } from 'react';
import { formatTime, getTimeWarningLevel } from '@/lib/simulationCalculator';
import styles from './SimulationTimer.module.css';

type SimulationTimerProps = {
    totalMinutes: number;
    onTimeUp: () => void;
    isPaused?: boolean;
};

export default function SimulationTimer({ totalMinutes, onTimeUp, isPaused = false }: SimulationTimerProps) {
    const [remainingSeconds, setRemainingSeconds] = useState(totalMinutes * 60);
    const [hasWarned30, setHasWarned30] = useState(false);
    const [hasWarned10, setHasWarned10] = useState(false);
    const [hasWarned5, setHasWarned5] = useState(false);

    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setRemainingSeconds(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    onTimeUp();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isPaused, onTimeUp]);

    // Warning alerts
    useEffect(() => {
        const remainingMinutes = Math.floor(remainingSeconds / 60);

        if (remainingMinutes === 30 && !hasWarned30) {
            setHasWarned30(true);
            // Could add notification here
        } else if (remainingMinutes === 10 && !hasWarned10) {
            setHasWarned10(true);
        } else if (remainingMinutes === 5 && !hasWarned5) {
            setHasWarned5(true);
        }
    }, [remainingSeconds, hasWarned30, hasWarned10, hasWarned5]);

    const warningLevel = getTimeWarningLevel(remainingSeconds, totalMinutes);
    const progressPercentage = (remainingSeconds / (totalMinutes * 60)) * 100;

    return (
        <div className={`${styles.container} ${styles[warningLevel]}`}>
            <div className={styles.icon}>⏱️</div>
            <div className={styles.content}>
                <div className={styles.label}>Tiempo Restante</div>
                <div className={styles.time}>{formatTime(remainingSeconds)}</div>
            </div>
            <div className={styles.progressBar}>
                <div
                    className={styles.progressFill}
                    style={{ width: `${progressPercentage}%` }}
                />
            </div>
            {warningLevel === 'critical' && (
                <div className={styles.warningText}>⚠️ ¡Tiempo crítico!</div>
            )}
            {warningLevel === 'warning' && (
                <div className={styles.warningText}>⏰ Tiempo limitado</div>
            )}
        </div>
    );
}
