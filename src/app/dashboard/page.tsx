import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { EssayResult, JsonDb, User } from "@/lib/db";
import ProgressCard from "@/components/Dashboard/ProgressCard";
import styles from "./page.module.css";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;

  let user: User | null = null;
  let essayHistory: EssayResult[] = [];

  if (userId) {
    user = await JsonDb.getUser(userId);
    essayHistory = await JsonDb.getEssayHistory(userId);
  }

  const completedEssays = essayHistory.length;
  const averageScore = completedEssays > 0
    ? Math.round(essayHistory.reduce((acc, r) => acc + r.score, 0) / completedEssays)
    : 0;

  // Placeholder values for data not yet implemented
  const studiedMaterial = "0%";
  const studyTime = "0h";

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Hola, {user?.name || 'Estudiante'}</h1>
        <p className={styles.subtitle}>Aquí está tu resumen de progreso para la PAES 2025</p>
      </header>

      <div className={styles.grid}>
        <ProgressCard
          title="Promedio General"
          value={String(averageScore)}
          description={averageScore > 0 ? "Sigue así!" : "Completa un ensayo"}
        />
        <ProgressCard
          title="Ensayos Completados"
          value={String(completedEssays)}
          description={completedEssays > 0 ? `${completedEssays} ensayos realizados` : "Aún no has completado ensayos"}
        />
        <ProgressCard
          title="Material Estudiado"
          value={studiedMaterial}
          description="Aún no implementado"
        />
        <ProgressCard
          title="Tiempo de Estudio"
          value={studyTime}
          description="Aún no implementado"
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
