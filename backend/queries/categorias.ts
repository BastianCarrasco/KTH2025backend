import { pool } from "../db";

export const getAllCategorias = async () => {
  const result = await pool.query("SELECT * FROM categorias");
  return result.rows;
};