-- Tabla de Usuarios
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  "lastName" TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  "lastStudyDate" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  streak INTEGER DEFAULT 0,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Resultados de Ensayos
CREATE TABLE IF NOT EXISTS essay_results (
  id TEXT PRIMARY KEY,
  "userId" TEXT REFERENCES users(id),
  "essayId" TEXT NOT NULL,
  subject TEXT NOT NULL,
  score INTEGER NOT NULL,
  "correctAnswers" INTEGER NOT NULL,
  "totalQuestions" INTEGER NOT NULL,
  date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  answers JSONB NOT NULL
);

-- Crear usuario por defecto (opcional, el código lo crea si no existe)
INSERT INTO users (id, name, email, "lastStudyDate", streak)
VALUES ('default-user-001', 'Estudiante PAES', 'estudiante@ejemplo.com', NOW(), 0)
ON CONFLICT (id) DO NOTHING;
