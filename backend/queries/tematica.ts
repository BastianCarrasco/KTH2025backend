import { pool } from "../db";

// GET - Todas las temáticas
export const getTematicas = async () => {
  const result = await pool.query(
    "SELECT id_tematica, nombre FROM tematica ORDER BY nombre"
  );
  return result.rows;
};

// GET por ID
export const getTematicaById = async (id: number) => {
  const result = await pool.query(
    "SELECT id_tematica, nombre FROM tematica WHERE id_tematica = $1",
    [id]
  );
  return result.rows[0] || null;
};

// POST - Crear temática (sin especificar ID)
export const createTematica = async (nombre: string) => {
  const result = await pool.query(
    "INSERT INTO tematica (nombre) VALUES ($1) RETURNING id_tematica, nombre",
    [nombre]
  );
  return result.rows[0];
};

// PUT - Actualizar temática
export const updateTematica = async (id: number, nombre: string) => {
  const result = await pool.query(
    `UPDATE tematica 
     SET nombre = $1 
     WHERE id_tematica = $2 
     RETURNING id_tematica, nombre`,
    [nombre, id]
  );
  
  if (result.rowCount === 0) {
    throw new Error(`Temática con ID ${id} no encontrada`);
  }
  
  return result.rows[0];
};

// DELETE - Eliminar temática
export const deleteTematica = async (id: number) => {
  const result = await pool.query(
    `DELETE FROM tematica 
     WHERE id_tematica = $1 
     RETURNING id_tematica, nombre`,
    [id]
  );
  
  if (result.rowCount === 0) {
    throw new Error(`Temática con ID ${id} no encontrada`);
  }
  
  return { 
    message: `Temática ${result.rows[0].nombre} eliminada`,
    deleted: result.rows[0]
  };
};