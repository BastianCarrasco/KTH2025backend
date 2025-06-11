import { pool } from "../db";

export const insertProyecto = async ({
  nombre,
  monto,
  fecha_postulacion,
  comentarios,
  unidad,
  id_convocatoria,
  id_tematica,
  id_apoyo,
  id_estatus,
  id_kth,
}) => {
  const result = await pool.query(
    `INSERT INTO public.proyecto(
      nombre, monto, fecha_postulacion, comentarios, unidad, 
      id_convocatoria, id_tematica, id_apoyo, id_estatus, id_kth
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id_proyecto`,
    [
      nombre,
      monto || 0,
      fecha_postulacion || null,
      comentarios || null,
      unidad,
      id_convocatoria || null,
      id_tematica || null,
      id_apoyo || null,
      id_estatus || null,
      id_kth ||null,
    ]
  );
  return result.rows[0];
};


export const eliminar_proyecto = async (id_proyecto) => {
  // Asumiendo que usas PostgreSQL con node-postgres
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    // Eliminar primero de la tabla dependiente
    await client.query('DELETE FROM proyectoacademico WHERE id_proyecto = $1', [id_proyecto]);
    
    // Luego eliminar de la tabla principal
    const result = await client.query('DELETE FROM proyecto WHERE id_proyecto = $1 RETURNING *', [id_proyecto]);
    
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};
