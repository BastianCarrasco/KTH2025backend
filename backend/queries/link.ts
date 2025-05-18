import { pool } from "../db";

export const insertProyectoAcademico = async (id_proyecto: number, id_academico: number, jefe: number) => {
  const query = {
    text: "INSERT INTO proyectoacademico(id_proyecto, id_academico, jefe) VALUES ($1, $2, $3) RETURNING *",
    values: [id_proyecto, id_academico, jefe]
  };
  const result = await pool.query(query);
  return result.rows[0];
};


export const getProyectoAcademico = async () => {
  const result = await pool.query("SELECT * FROM proyectoacademico");
  return result.rows;
};