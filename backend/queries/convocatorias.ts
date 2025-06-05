import { pool } from "../db";

// Obtener todas las alternativas
export const getTipoConvocatorias = async () => {
  const result = await pool.query("select * from tipo_convo");
  return result.rows;
};

export const getInstConvocatorias = async () => {
  const result = await pool.query("select * from inst_convo");
  return result.rows;
};

export const insertConvocatoria = async ({nombre, tipo, institucion}) => {
    const result = await pool.query(
        "INSERT INTO convocatoria(nombre, tipo, institucion) VALUES ($1, $2, $3) RETURNING *",
        [nombre, tipo, institucion]
    );
    return result.rows[0];
}

// For getting convocatorias with related data
export const getConvocatorias = async () => {
  const query = `
    SELECT
      C.id_convocatoria AS id,
      C.nombre AS convocatoria,
      TC.nombre AS tipo,
      IC.nombre AS institucion
    FROM
      CONVOCATORIA AS C
      JOIN TIPO_CONVO AS TC ON C.tipo = TC.id
      JOIN INST_CONVO AS IC ON C.institucion = IC.id
    ORDER BY tipo ASC
  `;
  const result = await pool.query(query);
  return result.rows;
};