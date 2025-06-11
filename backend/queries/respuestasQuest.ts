import { pool } from "../db";

// CREATE - Crear una nueva respuesta de cuestionario
export const createRespuestaCuestionario = async (
  nombre_investigador: number,
  escuela: number,
  respuestas: (string | null)[]  // Array de respuestas (1-9) como strings o null
) => {
  const query = `
    INSERT INTO public.cuestionario_respuestas(
      nombre_investigador, 
      escuela, 
      respuesta_1, 
      respuesta_2, 
      respuesta_3, 
      respuesta_4, 
      respuesta_5, 
      respuesta_6, 
      respuesta_7, 
      respuesta_8, 
      respuesta_9
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
    RETURNING *`;
  
  // Asegurar que tenemos exactamente 9 respuestas (pueden ser null)
  if (respuestas.length !== 9) {
    throw new Error("Debe proporcionar exactamente 9 respuestas (algunas pueden ser nulas)");
  }
  
  const values = [
    nombre_investigador,
    escuela,
    ...respuestas
  ];
  
  const result = await pool.query(query, values);
  return result.rows[0];
};

// READ - Obtener todas las respuestas de cuestionarios
export const getRespuestasCuestionarios = async () => {
  const result = await pool.query("SELECT * FROM cuestionario_respuestas ORDER BY fecha_creacion");
  return result.rows;
};

// READ - Obtener una respuesta por ID
export const getRespuestaById = async (id_respuesta: number) => {
  const query = "SELECT * FROM cuestionario_respuestas WHERE id_respuesta = $1";
  const values = [id_respuesta];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// UPDATE - Actualizar una respuesta
export const updateRespuestaCuestionario = async (
  id_respuesta: number,
  nombre_investigador: number,  // Cambiado a number
  escuela: number,              // Cambiado a number
  respuestas: string[]
) => {
  const query = `
    UPDATE public.cuestionario_respuestas 
    SET 
      nombre_investigador = $2,
      escuela = $3,
      respuesta_1 = $4,
      respuesta_2 = $5,
      respuesta_3 = $6,
      respuesta_4 = $7,
      respuesta_5 = $8,
      respuesta_6 = $9,
      respuesta_7 = $10,
      respuesta_8 = $11,
      respuesta_9 = $12
    WHERE id_respuesta = $1 
    RETURNING *`;
  
  if (respuestas.length !== 9) {
    throw new Error("Debe proporcionar exactamente 9 respuestas");
  }
  
  const values = [
    id_respuesta,
    nombre_investigador,
    escuela,
    ...respuestas
  ];
  
  const result = await pool.query(query, values);
  return result.rows[0];
};

// DELETE - Eliminar una respuesta
export const deleteRespuestaCuestionario = async (id_respuesta: number) => {
  const query = "DELETE FROM cuestionario_respuestas WHERE id_respuesta = $1 RETURNING *";
  const values = [id_respuesta];
  const result = await pool.query(query, values);
  return result.rows[0];
};