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
