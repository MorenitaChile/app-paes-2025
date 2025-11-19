# APP PAES 2025 📚🇨🇱

Aplicación web interactiva diseñada para la preparación de la **Prueba de Acceso a la Educación Superior (PAES) Regular 2025** en Chile.

Esta herramienta ofrece un entorno de estudio completo con ensayos simulados, material didáctico visual y seguimiento de progreso personalizado.

## 🚀 Características Principales

### 📝 Banco de Ensayos
- **5 Ensayos Completos** por asignatura:
  - Competencia Lectora
  - Competencia Matemática M1
  - Competencia Matemática M2
  - Ciencias (Biología, Física, Química)
- **Simulación Realista**: Temporizador integrado y formato de preguntas PAES.
- **Corrección Automática**: Cálculo inmediato de puntaje (escala 100-1000) y retroalimentación detallada.

### 📖 Material Didáctico
- Temario oficial actualizado al proceso de admisión 2026 (Curriculum 2025).
- **Recursos Visuales**: Diagramas y gráficos explicativos (Célula, Ondas, Geometría, Funciones).
- Explicaciones teóricas claras y ejemplos resueltos.

### 📊 Seguimiento de Progreso
- **Dashboard Personal**: Métricas de rendimiento, racha de estudio y tiempo total.
- **Historial**: Registro automático de todos los ensayos realizados.
- **Persistencia Local**: Tus datos se guardan automáticamente en tu dispositivo (sin necesidad de registro).

## 🛠️ Tecnologías Utilizadas

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: CSS Modules con Variables CSS (Diseño Responsivo)
- **Base de Datos**: JSON DB Local (Sistema de archivos)
- **Iconos**: Lucide React

## 💻 Instalación y Uso

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/TU_USUARIO/app-paes-2025.git
    cd app-paes-2025
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Iniciar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

4.  **Abrir en el navegador:**
    Visita [http://localhost:3000](http://localhost:3000) para comenzar a estudiar.

## 📂 Estructura del Proyecto

- `/src/app`: Rutas y páginas de la aplicación.
- `/src/components`: Componentes reutilizables (UI).
- `/src/data`: Base de conocimientos (Preguntas, Contenido, Syllabus).
- `/src/lib`: Lógica de negocio (Puntuación, Base de datos).
- `/public/images`: Recursos gráficos generados.

---
*Proyecto desarrollado con asistencia de IA para potenciar el estudio autónomo.*
