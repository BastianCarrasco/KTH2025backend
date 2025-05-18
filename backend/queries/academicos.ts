import { pool } from "../db";

export const getAcademicos = async () => {
  const result = await pool.query("SELECT * FROM academico");
  return result.rows;
};