import { pool } from "../db";

export const getTODO = async () => {
  try {
    const query = `
      SELECT
        P.ID_PROYECTO,
        P.NOMBRE,
        P.MONTO,
        P.FECHA_POSTULACION,
        P.COMENTARIOS,
        U.NOMBRE AS UNIDAD,
        CONVO.NOMBRE AS CONVO_NOMBRE,
        TC.NOMBRE AS TIPO_CONVO,
        IC.NOMBRE AS INST_CONVO,
        TM.NOMBRE AS TEMATICA,
        TP.TIPO AS TIPO_APOYO,
        AP.DETALLE,
        ES.TIPO as Estatus,
        CONCAT(AC.NOMBRE, ' ', AC.A_PATERNO) AS ACADEMICO,
        pya.jefe
      FROM
        PROYECTO AS P
        LEFT JOIN UNIDADACADEMICA AS U ON P.UNIDAD = U.ID_UNIDAD
        LEFT JOIN CONVOCATORIA AS CONVO ON P.ID_CONVOCATORIA = CONVO.ID_CONVOCATORIA
        LEFT JOIN TIPO_CONVO AS TC ON TC.ID = CONVO.TIPO
        LEFT JOIN INST_CONVO AS IC ON IC.ID = CONVO.INSTITUCION
        LEFT JOIN TEMATICA AS TM ON TM.ID_TEMATICA = P.ID_TEMATICA
        LEFT JOIN APOYO AS AP ON P.ID_APOYO = AP.ID_APOYO
        LEFT JOIN TIPO_APOYO AS TP ON TP.ID_TIPO_APOYO = AP.TIPO
        LEFT JOIN ESTATUS AS ES ON ES.ID_ESTATUS = P.ID_ESTATUS
        LEFT JOIN PROYECTOACADEMICO AS PYA ON PYA.ID_PROYECTO = P.ID_PROYECTO
        LEFT JOIN ACADEMICO AS AC ON PYA.ID_ACADEMICO = AC.ID_ACADEMICO
    `;

    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error en getTODO:", error);
    throw error;
  }
};
