import { pool } from "../db";

export const getfondos = async () => {
    const result = await pool.query(`
    SELECT f.*, tc.nombre as "tipo de fondo" 
    FROM fondos f
    JOIN tipo_convo tc ON f.tipo = tc.id
    ORDER BY f.id
  `);
  return result.rows;
};


