import { pool } from "../db";

export const getAcademicos = async () => {
  const result = await pool.query("SELECT * FROM academico order by (nombre)");
  return result.rows;
};