import { pool } from "../db";

export const getfondos = async () => {
    const result = await pool.query(`
    SELECT f.*, tc.* 
    FROM fondos f
    JOIN tipo_convo tc ON f.id = tc.id
    ORDER BY f.id
  `);
  return result.rows;
};


