import { pool } from "../db";

// CREATE - Crear una nueva respuesta
export const createRespuesta = async (
  id_user: number,
  claves_resp: string,
  crl: number,
  trl: number,
  team: number,
  brl: number,
  frl: number,
  iprl: number,

) => {
  const query = `
    INSERT INTO respuestas(
      id_user, claves_resp, crl, trl, team, brl, frl, iprl
    ) VALUES($1, $2, $3, $4, $5, $6, $7, $8) 
    RETURNING *
  `;
  const values = [id_user, claves_resp, crl, trl, team, brl, frl, iprl];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// READ - Obtener todas las respuestas
// db/respuestas.ts
export const getAllRespuestas = async () => {
  try {
    const result = await pool.query(`
      SELECT id, id_user, claves_resp, 
             crl, trl, team, brl, frl, iprl, 
             TO_CHAR(fecha, 'YYYY-MM-DD HH24:MI:SS') as fecha
      FROM respuestas
      ORDER BY fecha DESC
    `);
    return result.rows; // Esto devuelve directamente el array de filas
  } catch (error) {
    console.error("Error en getAllRespuestas:", error);
    throw error; // Propaga el error para manejarlo en el endpoint
  }
};

// READ - Obtener respuesta por ID
export const getRespuestaById = async (id: number) => {
  const query = `
    SELECT id, id_user, claves_resp, 
           crl, trl, team, brl, frl, iprl, 
           TO_CHAR(fecha, 'YYYY-MM-DD HH24:MI:SS') as fecha
    FROM respuestas 
    WHERE id = $1
  `;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

// READ - Obtener respuestas por usuario
export const getRespuestasByUser = async (id_user: number) => {
  const query = `
    SELECT id, claves_resp, 
           crl, trl, team, brl, frl, iprl, 
           TO_CHAR(fecha, 'YYYY-MM-DD HH24:MI:SS') as fecha
    FROM respuestas 
    WHERE id_user = $1 
    ORDER BY fecha DESC
  `;
  const result = await pool.query(query, [id_user]);
  return result.rows;
};

// UPDATE - Actualizar una respuesta
export const updateRespuesta = async (
  id: number,
  claves_resp: string,
  crl: number,
  trl: number,
  team: number,
  brl: number,
  frl: number,
  iprl: number
) => {
  const query = `
    UPDATE respuestas 
    SET claves_resp = $1, crl = $2, trl = $3, team = $4, 
        brl = $5, frl = $6, iprl = $7
    WHERE id = $8
    RETURNING *
  `;
  const values = [claves_resp, crl, trl, team, brl, frl, iprl, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// DELETE - Eliminar una respuesta
export const deleteRespuesta = async (id: number) => {
  const query = "DELETE FROM respuestas WHERE id = $1 RETURNING *";
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

// Funciones adicionales con cálculos numéricos

// Obtener promedios de las métricas por usuario
export const getPromediosByUser = async (id_user: number) => {
  const query = `
    SELECT 
      AVG(crl)::numeric(10,2) as avg_crl,
      AVG(trl)::numeric(10,2) as avg_trl,
      AVG(team)::numeric(10,2) as avg_team,
      AVG(brl)::numeric(10,2) as avg_brl,
      AVG(frl)::numeric(10,2) as avg_frl,
      AVG(iprl)::numeric(10,2) as avg_iprl
    FROM respuestas 
    WHERE id_user = $1
  `;
  const result = await pool.query(query, [id_user]);
  return result.rows[0];
};

// Obtener estadísticas completas de las métricas
export const getEstadisticasCompletas = async () => {
  const query = `
    SELECT 
      COUNT(*) as total_respuestas,
      AVG(crl)::numeric(10,2) as avg_crl,
      MIN(crl) as min_crl,
      MAX(crl) as max_crl,
      AVG(trl)::numeric(10,2) as avg_trl,
      MIN(trl) as min_trl,
      MAX(trl) as max_trl,
      AVG(team)::numeric(10,2) as avg_team,
      MIN(team) as min_team,
      MAX(team) as max_team,
      AVG(brl)::numeric(10,2) as avg_brl,
      MIN(brl) as min_brl,
      MAX(brl) as max_brl,
      AVG(frl)::numeric(10,2) as avg_frl,
      MIN(frl) as min_frl,
      MAX(frl) as max_frl,
      AVG(iprl)::numeric(10,2) as avg_iprl,
      MIN(iprl) as min_iprl,
      MAX(iprl) as max_iprl
    FROM respuestas
  `;
  const result = await pool.query(query);
  return result.rows[0];
};