import { pool } from "../db";

export const insertProyecto = async ({
  id_proyecto,
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
      id_proyecto, nombre, monto, fecha_postulacion, comentarios, unidad, 
      id_convocatoria, id_tematica, id_apoyo, id_estatus, id_kth
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
    [
      id_proyecto, 
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

export const getProyectos = async () => {
  const query = `
    SELECT
      P.ID_PROYECTO,
      P.NOMBRE,
      P.MONTO,
      P.FECHA_POSTULACION,
      P.COMENTARIOS,
      U.NOMBRE AS "UA",
      CON.NOMBRE AS "Convocatoria",
      TC.NOMBRE AS "Tipo_Convo",
      IC.NOMBRE AS "Institucion_convocatoria",
      AC.NOMBRE AS "Academico",
      PA.JEFE
    FROM
      PROYECTO AS P
      LEFT JOIN CONVOCATORIA AS CON ON CON.ID_CONVOCATORIA = P.ID_CONVOCATORIA
      LEFT JOIN UNIDADACADEMICA AS U ON U.ID_UNIDAD = P.UNIDAD
      LEFT JOIN TIPO_CONVO AS TC ON TC.ID = CON.TIPO
      LEFT JOIN INST_CONVO AS IC ON IC.ID = CON.INSTITUCION
      LEFT JOIN proyectoacademico AS PA ON PA.id_proyecto = P.ID_PROYECTO
      LEFT JOIN academico AS AC ON AC.id_academico = PA.id_academico
    ORDER BY P.ID_PROYECTO
  `;
  
  const result = await pool.query(query);
  return result.rows;
};