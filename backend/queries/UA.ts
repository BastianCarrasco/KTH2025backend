import { pool } from "../db";

export const getUA = async () => {
  const result = await pool.query("SELECT * FROM unidadacademica");
  return result.rows;
};