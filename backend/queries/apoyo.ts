import { pool } from "../db";

export const getApoyo = async () => {
  const query = `
    SELECT
      APOYO.ID_APOYO,
      APOYO.DETALLE,
      TIPO_APOYO.TIPO
    FROM APOYO
    JOIN TIPO_APOYO ON APOYO.TIPO = TIPO_APOYO.ID_TIPO_APOYO
    ORDER BY TIPO_APOYO.TIPO, APOYO.DETALLE
  `;

  const result = await pool.query(query);
  return result.rows;
};


export const insertarApoyo = async (detalle: string, tipo: number) => {
  const query = `
    INSERT INTO APOYO (DETALLE, TIPO)
    VALUES ($1, $2)
    RETURNING ID_APOYO, DETALLE, TIPO
  `;

  const result = await pool.query(query, [detalle, tipo]);
  return result.rows[0];
}

export const getTags = async () => {
  const query = `
    select * from detalles_apoyo order by tag
  `;

  const result = await pool.query(query);
  return result.rows;
}