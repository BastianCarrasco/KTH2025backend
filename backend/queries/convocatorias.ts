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

