import ProgressCard from "@/components/Dashboard/ProgressCard";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Hola, Estudiante</h1>
        <p className={styles.subtitle}>Aquí está tu resumen de progreso para la PAES 2025</p>
      </header>

      <div className={styles.grid}>
        <ProgressCard
          title="Promedio General"
          value="650"
          description="+15 pts esta semana"
        />
        <ProgressCard
          title="Ensayos Completados"
          value="12"
          description="3 esta semana"
        />
        <ProgressCard
          title="Material Estudiado"
          value="45%"
          description="Ciencias: 60% | M1: 30%"
        />
        <ProgressCard
          title="Tiempo de Estudio"
          value="24h"
          description="Últimos 7 días"
        />
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Continuar Estudiando</h2>
        <div className={styles.actions}>
          {/* Placeholder for quick actions */}
          <div className={styles.actionCard}>
            <h3>Competencia Lectora</h3>
            <p>Análisis de textos argumentativos</p>
          </div>
          <div className={styles.actionCard}>
            <h3>Matemática M1</h3>
            <p>Geometría: Cubos y Paralelepípedos</p>
          </div>
        </div>
      </section>
    </div>
  );
}
