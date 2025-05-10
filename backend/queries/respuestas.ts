import { pool } from "../db";

export const getAllRespuestas = async () => {
  const result = await pool.query("SELECT * FROM respuestas");
  return result.rows;
};