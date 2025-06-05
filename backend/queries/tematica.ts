import { pool } from "../db";

export const getTematica = async () => {
  const result = await pool.query(
    "select * from tematica order by nombre"
  );
  return result.rows;
};
