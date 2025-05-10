import { pool } from "../db";

// Obtener todas las preguntas
export const getAllPreguntas = async () => {
  const result = await pool.query("SELECT * FROM preguntas ORDER BY id");
  return result.rows;
};

// Obtener una pregunta por ID
export const getPreguntaById = async (id: number) => {
  const result = await pool.query("SELECT * FROM preguntas WHERE id = $1", [id]);
  return result.rows[0];
};

// Insertar una nueva pregunta
export const createPregunta = async (texto: string, categoria: string, nivel: number) => {
  const query = {
    text: "INSERT INTO preguntas(texto, categoria, nivel) VALUES ($1, $2, $3) RETURNING *",
    values: [texto, categoria, nivel]
  };
  const result = await pool.query(query);
  return result.rows[0];
};

// Actualizar una pregunta existente
export const updatePregunta = async (id: number, texto: string, categoria: number, nivel: number) => {
  const query = {
    text: "UPDATE preguntas SET texto = $1, categoria = $2, nivel = $3 WHERE id = $4 RETURNING *",
    values: [texto, categoria, nivel, id]
  };
  const result = await pool.query(query);
  return result.rows[0];
};

// Eliminar una pregunta
export const deletePregunta = async (id: number) => {
  const query = {
    text: "DELETE FROM preguntas WHERE id = $1 RETURNING *",
    values: [id]
  };
  const result = await pool.query(query);
  return result.rows[0];
};