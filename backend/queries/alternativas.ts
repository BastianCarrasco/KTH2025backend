import { pool } from "../db";

// Obtener todas las alternativas
export const getAllAlternativas = async () => {
  const result = await pool.query("SELECT * FROM alternativas ORDER BY id");
  return result.rows;
};

// Obtener una alternativa por ID
export const getAlternativaById = async (id: number) => {
  const query = {
    text: "SELECT * FROM alternativas WHERE id = $1",
    values: [id]
  };
  const result = await pool.query(query);
  return result.rows[0];
};

// Obtener alternativas por pregunta
export const getAlternativasByPregunta = async (id_pregunta: number) => {
  const query = {
    text: "SELECT * FROM alternativas WHERE id_pregunta = $1 ORDER BY id",
    values: [id_pregunta]
  };
  const result = await pool.query(query);
  return result.rows;
};

// Insertar una nueva alternativa
export const createAlternativa = async (texto: string, id_pregunta: number) => {
  const query = {
    text: "INSERT INTO alternativas(texto, id_pregunta) VALUES ($1, $2) RETURNING *",
    values: [texto, id_pregunta]
  };
  const result = await pool.query(query);
  return result.rows[0];
};

// Actualizar una alternativa existente
export const updateAlternativa = async (id: number, texto: string, id_pregunta: number) => {
  const query = {
    text: "UPDATE alternativas SET texto = $1, id_pregunta = $2 WHERE id = $3 RETURNING *",
    values: [texto, id_pregunta, id]
  };
  const result = await pool.query(query);
  return result.rows[0];
};

// Eliminar una alternativa
export const deleteAlternativa = async (id: number) => {
  const query = {
    text: "DELETE FROM alternativas WHERE id = $1 RETURNING *",
    values: [id]
  };
  const result = await pool.query(query);
  return result.rows[0];
};