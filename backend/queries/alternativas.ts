import { pool } from "../db";

export const getAllAlternativas = async () => {
  const result = await pool.query("SELECT * FROM alternaticas");
  return result.rows;
};