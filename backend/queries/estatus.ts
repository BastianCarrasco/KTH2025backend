import { pool } from "../db";

export const getEstatus = async () => {
  const result = await pool.query(
    "select * from estatus"
  );
  return result.rows;
};
