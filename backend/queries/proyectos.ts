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
  id_kth
}) => {
  const result = await pool.query(
    `INSERT INTO public.proyecto(
      nombre, monto, fecha_postulacion, comentarios, unidad, 
      id_convocatoria, id_tematica, id_apoyo, id_estatus, id_kth
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id_proyecto`,
    [
   
      nombre, 
      monto, 
      fecha_postulacion, 
      comentarios, 
      unidad, 
      id_convocatoria,
      id_tematica,
      id_apoyo,
      id_estatus,
      id_kth
    ]
  );
  return result.rows[0];
}

