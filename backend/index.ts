import express from "express";
import { pool } from "./db";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/data", async (_req, res) => {
  try {
    // Haciendo una consulta para obtener todos los registros de la tabla "categorias"
    const result = await pool.query("SELECT * FROM categorias");

    // Si no hay datos en la tabla
    if (result.rows.length === 0) {
      return res.status(404).send("No hay categorías en la base de datos");
    }

    // Enviando los datos de la primera categoría como ejemplo
    res.json({
      success: true,
      data: result.rows,
    });

  } catch (error) {
    console.error("Error al conectar:", error);
    res.status(500).send("Error al conectar con la base de datos");
  }
});

app.get("/usuarios", async (_req, res) => {
  try {
    // Haciendo una consulta para obtener todos los registros de la tabla "categorias"
    const result = await pool.query("SELECT * FROM usuario");

    // Si no hay datos en la tabla
    if (result.rows.length === 0) {
      return res.status(404).send("No hay categorías en la base de datos");
    }

    // Enviando los datos de la primera categoría como ejemplo
    res.json({
      success: true,
      data: result.rows,
    });

  } catch (error) {
    console.error("Error al conectar:", error);
    res.status(500).send("Error al conectar con la base de datos");
  }
});

app.get("/respuestas", async (_req, res) => {
  try {
    // Haciendo una consulta para obtener todos los registros de la tabla "categorias"
    const result = await pool.query("SELECT * FROM respuestas");

    // Si no hay datos en la tabla
    if (result.rows.length === 0) {
      return res.status(404).send("No hay categorías en la base de datos");
    }

    // Enviando los datos de la primera categoría como ejemplo
    res.json({
      success: true,
      data: result.rows,
    });

  } catch (error) {
    console.error("Error al conectar:", error);
    res.status(500).send("Error al conectar con la base de datos");
  }
});
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
