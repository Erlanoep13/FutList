-- 1. TABELA DE USUÁRIOS
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR NOT NULL UNIQUE,
    "passwordHash" VARCHAR NOT NULL,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP DEFAULT now(),
    "updatedAt" TIMESTAMP DEFAULT now()
);

-- 2. TABELA DO EVENTO (Para salvar o racha do dia)
CREATE TABLE IF NOT EXISTS rachas (
    id SERIAL PRIMARY KEY,
    cabecalho VARCHAR,
    quantidade_por_time INTEGER NOT NULL,
    "createdAt" TIMESTAMP DEFAULT now()
);

-- 3. TABELA DA LISTA E DOS TIMES (A lista final com todo mundo)
CREATE TABLE IF NOT EXISTS racha_nomes (
    id SERIAL PRIMARY KEY,
    racha_id INTEGER NOT NULL REFERENCES rachas(id) ON DELETE CASCADE,
    nome VARCHAR NOT NULL,
    tipo_entrada VARCHAR,
    time_sorteado INTEGER
);