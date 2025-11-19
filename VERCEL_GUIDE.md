# Guía de Despliegue y Configuración de Base de Datos en Vercel

Sigue estos pasos para publicar tu aplicación **APP PAES 2025** y configurar la base de datos profesional.

## Paso 1: Subir código a GitHub (Ya realizado)
Asegúrate de que tu repositorio en GitHub tenga la última versión de tu código.
```bash
git push
```

## Paso 2: Importar Proyecto en Vercel
1.  Ve a [vercel.com](https://vercel.com) e inicia sesión (puedes usar tu cuenta de GitHub).
2.  En tu Dashboard, haz clic en el botón **"Add New..."** y selecciona **"Project"**.
3.  Verás una lista de tus repositorios de GitHub. Busca `app-paes-2025` y haz clic en **"Import"**.
4.  En la pantalla de configuración ("Configure Project"), deja todo como está y haz clic en **"Deploy"**.
    *   *Nota: El primer despliegue podría fallar o quedar incompleto porque aún no tenemos la base de datos conectada. No te preocupes.*

## Paso 3: Crear la Base de Datos Postgres
1.  Una vez creado el proyecto en Vercel, ve a la pestaña **"Storage"** en el menú superior del proyecto.
2.  Haz clic en el botón **"Create Database"** (o "Connect Store").
3.  Selecciona **"Postgres"** (Vercel Postgres).
4.  Haz clic en **"Continue"**.
5.  Acepta los términos y dale un nombre a tu base de datos (ej: `paes-db`).
6.  Selecciona la región más cercana (ej: `Washington, D.C., USA` suele ser la mejor opción general).
7.  Haz clic en **"Create"**.

## Paso 4: Conectar la Base de Datos
1.  Después de crearla, Vercel te preguntará si quieres conectarla a tu proyecto. Asegúrate de que tu proyecto `app-paes-2025` esté seleccionado y haz clic en **"Connect"**.
2.  Vercel añadirá automáticamente las **Variables de Entorno** (`POSTGRES_URL`, etc.) a tu proyecto.
3.  **Importante:** Para que estos cambios surtan efecto, debes **Redesplegar** tu aplicación.
    *   Ve a la pestaña **"Deployments"**.
    *   Haz clic en el botón de tres puntos (`...`) del último despliegue y selecciona **"Redeploy"**.

## Paso 5: Crear las Tablas (Ejecutar SQL)
Ahora necesitamos crear la estructura donde se guardarán los datos.

1.  En Vercel, ve nuevamente a la pestaña **"Storage"** y selecciona tu base de datos `paes-db`.
2.  En el menú lateral izquierdo, busca la opción **"Query"** (o "Data").
3.  Verás una consola donde puedes escribir código SQL.
4.  Copia **TODO** el contenido del archivo `src/data/schema.sql` de tu proyecto. (Puedes verlo en tu editor de código).
5.  Pégalo en la consola de Vercel y haz clic en **"Run Query"**.
6.  Deberías ver un mensaje de éxito (`Success`).

## ¡Listo! 🚀
Tu aplicación ya está funcionando en la nube con una base de datos real.
- Los usuarios que entren a tu web guardarán su progreso en esta base de datos.
- Tú puedes ver los datos desde la pestaña "Data" en Vercel Storage ("Browse Rows").
