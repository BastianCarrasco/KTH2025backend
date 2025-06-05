import { pool } from "../db";

export const getApoyo = async () => {
  const result = await pool.query(
    "select apoyo.id_apoyo,apoyo.detalle,tipo_apoyo.tipo from apoyo join tipo_apoyo on apoyo.tipo=tipo_apoyo.id_tipo_apoyo order by TIPO_APOYO.TIPO"
  );
  return result.rows;
};
