import { pool } from "../db";

export const insertProyecto = async ({
  nombre, 
  monto, 
  fecha_postulacion, 
  comentarios, 
  unidad, 
  id_convocatoria
}) => {
  const result = await pool.query(
    `INSERT INTO proyecto(
      nombre, monto, fecha_postulacion, comentarios, unidad, id_convocatoria
    ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [nombre, monto, fecha_postulacion, comentarios, unidad, id_convocatoria,]
  );
  return result.rows[0];
}

export const getProyectos = async () => {
  const result = await pool.query("SELECT * FROM proyecto");
  return result.rows;
};