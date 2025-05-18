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