import { pool } from "../db";

export const getTODO = async () => {
  try {
    const query = `
      SELECT
	P.NOMBRE,
	P.MONTO,
	P.FECHA_POSTULACION,
	P.COMENTARIOS,
	U.NOMBRE AS UNIDAD,
	CONVO.NOMBRE AS CONVO_NOMBRE,
	TC.NOMBRE as tipo_convo,
	IC.NOMBRE as inst_convo,
	tm.nombre as tematica,
	tp.tipo as tipo_apoyo,
	ap.detalle,
	es.tipo
FROM
	PROYECTO AS P
	JOIN UNIDADACADEMICA AS U ON P.UNIDAD = U.ID_UNIDAD
	JOIN CONVOCATORIA AS CONVO ON P.ID_CONVOCATORIA = CONVO.ID_CONVOCATORIA
	JOIN TIPO_CONVO AS TC ON TC.ID = CONVO.TIPO
	JOIN INST_CONVO AS IC ON IC.ID = CONVO.INSTITUCION
	join tematica as tm on tm.id_tematica = p.id_tematica
	join apoyo as ap on  p.id_apoyo = ap.id_apoyo 
	join tipo_apoyo as TP on TP.id_tipo_apoyo = ap.tipo
	join estatus as Es on es.id_estatus = p.id_estatus
    `;
    
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error en getTODO:", error);
    throw error;
  }
};