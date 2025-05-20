import { pool } from "../db";

export const getfondos = async () => {
  const result = await pool.query("SELECT * FROM fondos");
  return result.rows;
};