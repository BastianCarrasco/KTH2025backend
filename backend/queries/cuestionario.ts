import { pool } from "../db";

// CREATE - Crear un nuevo cuestionario (sin especificar ID)
export const createCuestionario = async (pregunta: string) => {
  const query = "INSERT INTO cuestionario(pregunta) VALUES ($1) RETURNING *";
  const values = [pregunta];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// READ - Obtener todos los cuestionarios
export const getCuestionarios = async () => {
  const result = await pool.query("SELECT * FROM cuestionario ORDER BY id_cuestionario");
  return result.rows;
};

// READ - Obtener un cuestionario por ID
export const getCuestionarioById = async (id_cuestionario: number) => {
  const query = "SELECT * FROM cuestionario WHERE id_cuestionario = $1";
  const values = [id_cuestionario];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// UPDATE - Actualizar un cuestionario
export const updateCuestionario = async (id_cuestionario: number, pregunta: string) => {
  const query = "UPDATE cuestionario SET pregunta = $2 WHERE id_cuestionario = $1 RETURNING *";
  const values = [id_cuestionario, pregunta];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// DELETE - Eliminar un cuestionario
export const deleteCuestionario = async (id_cuestionario: number) => {
  const query = "DELETE FROM cuestionario WHERE id_cuestionario = $1 RETURNING *";
  const values = [id_cuestionario];
  const result = await pool.query(query, values);
  return result.rows[0];
};