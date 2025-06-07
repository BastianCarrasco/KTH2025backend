import { pool } from "../db";

export const getApoyo = async () => {
  const query = `
    SELECT
      APOYO.ID_APOYO,
      APOYO.DETALLE,
      TIPO_APOYO.TIPO
    FROM APOYO
    JOIN TIPO_APOYO ON APOYO.TIPO = TIPO_APOYO.ID_TIPO_APOYO
    ORDER BY TIPO_APOYO.TIPO, APOYO.DETALLE
  `;

  const result = await pool.query(query);
  return result.rows;
};

export const insertarApoyo = async (detalle: string, tipo: number) => {
  const query = `
    INSERT INTO APOYO (DETALLE, TIPO)
    VALUES ($1, $2)
    RETURNING ID_APOYO, DETALLE, TIPO
  `;

  const result = await pool.query(query, [detalle, tipo]);
  return result.rows[0];
};

export const getTags = async () => {
  const query = `
    select * from detalles_apoyo order by tag
  `;

  const result = await pool.query(query);
  return result.rows;
};


export const ElminarTag = async (id_apoyo: number): Promise<boolean> => {
  const query = `
    DELETE FROM apoyo
    WHERE id_apoyo = $1;
  `;
  try {
    const result = await pool.query(query, [id_apoyo]);
    // rowCount indica el número de filas afectadas por la operación
    if (result.rowCount > 0) {
      console.log(`Tag con ID ${id_apoyo} eliminado exitosamente.`);
      return true; // Indica que se eliminó al menos una fila
    } else {
      console.log(`No se encontró ningún tag con ID ${id_apoyo} para eliminar.`);
      return false; // No se eliminó ninguna fila (ID no encontrado)
    }
  } catch (error) {
    console.error(`Error al eliminar el tag con ID ${id_apoyo}:`, error);
    throw error; // O maneja el error de otra manera
  }
};