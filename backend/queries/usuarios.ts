import { pool } from "../db";

export const getAllUsuarios = async () => {
  const result = await pool.query("SELECT * FROM usuario");
  return result.rows;
};