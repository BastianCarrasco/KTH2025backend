import { pool } from "../db";

export const getTematica = async () => {
  const result = await pool.query(
    "select * from tematica"
  );
  return result.rows;
};
