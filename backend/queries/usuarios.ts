import { pool } from "../db";

// CREATE - Crear un nuevo usuario
export const createUsuario = async (nombre: string, email: string, clave: string) => {
  const query = "INSERT INTO usuario(nombre, email, clave) VALUES($1, $2, $3) RETURNING *";
  const values = [nombre, email, clave];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// READ - Obtener todos los usuarios (ya lo tenías)
export const getAllUsuarios = async () => {
  const result = await pool.query("SELECT * FROM usuario");
  return result.rows;
};

// READ - Obtener un usuario por ID
export const getUsuarioById = async (id: number) => {
  const query = "SELECT id, nombre, email FROM usuario WHERE id = $1";
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

// READ - Obtener usuario por email (útil para login)
export const getUsuarioByEmail = async (email: string) => {
  const query = "SELECT * FROM usuario WHERE email = $1";
  const result = await pool.query(query, [email]);
  return result.rows[0];
};

// UPDATE - Actualizar un usuario
export const updateUsuario = async (id: number, nombre: string, email: string) => {
  const query = "UPDATE usuario SET nombre = $1, email = $2 WHERE id = $3 RETURNING *";
  const values = [nombre, email, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// UPDATE - Actualizar solo la contraseña
export const updateUsuarioClave = async (id: number, nuevaClave: string) => {
  const query = "UPDATE usuario SET clave = $1 WHERE id = $2 RETURNING id, nombre, email";
  const result = await pool.query(query, [nuevaClave, id]);
  return result.rows[0];
};

// DELETE - Eliminar un usuario
export const deleteUsuario = async (id: number) => {
  const query = "DELETE FROM usuario WHERE id = $1 RETURNING *";
  const result = await pool.query(query, [id]);
  return result.rows[0];
};