import { pool } from "../db";

export const getAcademicos = async () => {
  const result = await pool.query("SELECT * FROM academico order by (nombre)");
  return result.rows;
};


export const createAcademico = async (nombre, email, a_materno, a_paterno) => {
  const result = await pool.query(
    "INSERT INTO public.academico(nombre, email, a_materno, a_paterno) VALUES ($1, $2, $3, $4) RETURNING *",
    [nombre, email, a_materno, a_paterno]
  );
  return result.rows[0];
};