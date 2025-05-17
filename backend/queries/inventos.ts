import { pool } from "../db";

// Obtener todos los inventos
export const getAllInventos = async () => {
  const result = await pool.query("SELECT * FROM inventos ORDER BY id");
  return result.rows;
};

// Obtener un invento por ID (corregido nombre de función)
export const getInventoById = async (id: number) => {
  const result = await pool.query("SELECT * FROM inventos WHERE id = $1", [id]);
  return result.rows[0];
};

// Insertar un nuevo invento (corregidos tipos y nombres de parámetros)
export const createInvento = async (
  nombre: string,
  financiamiento: string,
  empresas: string[], // Cambiado a array de strings
  industria: string // Cambiado a string
) => {
  const query = {
    text: `
      INSERT INTO inventos(
        nombre, financiamiento, empresas, industria
      ) VALUES ($1, $2, $3, $4) 
      RETURNING *
    `,
    values: [nombre, financiamiento, empresas, industria],
  };
  const result = await pool.query(query);
  return result.rows[0];
};

// Actualizar un invento existente (agregado id y corregidos parámetros)
export const updateInvento = async (
  id: number,
  nombre: string,
  financiamiento: string,
  empresas: string[],
  industria: string
) => {
  const query = {
    text: `
      UPDATE inventos 
      SET 
        nombre = $1, 
        financiamiento = $2, 
        empresas = $3,
        industria = $4,
        fecha_actualizacion = CURRENT_TIMESTAMP
      WHERE id = $5
      RETURNING *
    `,
    values: [nombre, financiamiento, empresas, industria, id],
  };
  const result = await pool.query(query);
  return result.rows[0];
};

// Eliminar un invento (corregido nombre de función)
export const deleteInvento = async (id: number) => {
  const query = {
    text: "DELETE FROM inventos WHERE id = $1 RETURNING *",
    values: [id],
  };
  const result = await pool.query(query);
  return result.rows[0];
};
