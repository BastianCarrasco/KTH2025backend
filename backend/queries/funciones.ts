import { pool } from "../db";

export const getNiveles = async () => {
  try {
    const query = `
      SELECT 
        P.ID AS id_pregunta,
        P.TEXTO AS texto_pregunta,
        STRING_AGG(CAST(A.ID AS VARCHAR), ', ' ORDER BY A.ID) AS ids_alternativas,
        P.NIVEL AS nivel,
        C.NOMBRE AS nombre_categoria
      FROM
        PREGUNTAS AS P
        JOIN ALTERNATIVAS AS A ON P.ID = A.ID_PREGUNTA
        JOIN CATEGORIAS AS C ON C.ID = P.CATEGORIA
      GROUP BY
        P.ID,
        P.TEXTO,
        P.NIVEL,
        C.NOMBRE
    `;
    
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error en getNiveles:', error);
    throw new Error('Error al obtener los niveles de preguntas');
  }
};