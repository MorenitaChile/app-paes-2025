import Link from 'next/link';
import styles from './page.module.css';

export default function LandingPage() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Prepárate para la <span className={styles.highlight}>PAES 2025</span>
          </h1>
          <p className={styles.heroSubtitle}>
            La plataforma más completa para alcanzar tu mejor puntaje.
            Ensayos simulados, material didáctico y seguimiento personalizado.
          </p>
          <div className={styles.heroButtons}>
            <Link href="/register" className={styles.btnPrimary}>
              Comenzar Gratis
            </Link>
            <Link href="/login" className={styles.btnSecondary}>
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>¿Por qué elegirnos?</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📝</div>
            <h3>Ensayos Simulados</h3>
            <p>Practica con ensayos que replican el formato real de la PAES con cronómetro y puntaje automático.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📚</div>
            <h3>Material Didáctico</h3>
            <p>Accede a contenido organizado por ejes temáticos con teoría, ejemplos y ejercicios.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📊</div>
            <h3>Seguimiento de Progreso</h3>
            <p>Visualiza tu evolución, identifica tus fortalezas y áreas de mejora.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🎯</div>
            <h3>Enfoque Personalizado</h3>
            <p>Estudia a tu ritmo con contenido adaptado al currículum PAES 2025.</p>
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section className={styles.subjects}>
        <h2 className={styles.sectionTitle}>Todas las Materias</h2>
        <div className={styles.subjectsGrid}>
          <div className={styles.subjectCard}>
            <div className={styles.subjectImage}>
              <img src="/images/onda.png" alt="Competencia Lectora" />
            </div>
            <h3>Competencia Lectora</h3>
            <p>Comprensión, interpretación y evaluación de textos</p>
          </div>
          <div className={styles.subjectCard}>
            <div className={styles.subjectImage}>
              <img src="/images/celula.png" alt="Ciencias" />
            </div>
            <h3>Ciencias</h3>
            <p>Física, Química y Biología integradas</p>
          </div>
          <div className={styles.subjectCard}>
            <div className={styles.subjectImage}>
              <img src="/images/triangulo.png" alt="Matemática M1" />
            </div>
            <h3>Matemática M1</h3>
            <p>Números, Álgebra, Geometría y Probabilidad</p>
          </div>
          <div className={styles.subjectCard}>
            <div className={styles.subjectImage}>
              <img src="/images/parabola.png" alt="Matemática M2" />
            </div>
            <h3>Matemática M2</h3>
            <p>Funciones, Trigonometría y Geometría Analítica</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <h2>¿Listo para comenzar?</h2>
        <p>Únete a miles de estudiantes que ya están preparándose para la PAES 2025</p>
        <Link href="/register" className={styles.btnPrimary}>
          Crear Cuenta Gratis
        </Link>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerBottom}>
          <p>&copy; 2025 PAES 2025. Todos los derechos reservados. v2.0.1 (Premium UI)</p>
        </div>
      </footer>
    </div>
  );
}
