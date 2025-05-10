import express from "express";
import { pool } from "./db";
import cors from "cors"; // Importa el paquete CORS

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware CORS (configuración básica para permitir todos los orígenes)
app.use(cors()); 

// Si necesitas configuración personalizada (ej: solo permitir ciertos dominios):
// app.use(cors({ origin: ["http://localhost:5173", "https://tudominio.com"] }));

// Endpoint /data
app.get("/categorias", async (_req, res) => {
  try {
    const result = await pool.query("SELECT * FROM categorias");
    if (result.rows.length === 0) {
      return res.status(404).send("No hay categorías en la base de datos");
    }
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error("Error al conectar:", error);
    res.status(500).send("Error al conectar con la base de datos");
  }
});

// Endpoint /usuarios
app.get("/usuarios", async (_req, res) => {
  try {
    const result = await pool.query("SELECT * FROM usuario");
    if (result.rows.length === 0) {
      return res.status(404).send("No hay usuarios en la base de datos");
    }
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error("Error al conectar:", error);
    res.status(500).send("Error al conectar con la base de datos");
  }
});

// Endpoint /respuestas
app.get("/respuestas", async (_req, res) => {
  try {
    const result = await pool.query("SELECT * FROM respuestas");
    if (result.rows.length === 0) {
      return res.status(404).send("No hay respuestas en la base de datos");
    }
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error("Error al conectar:", error);
    res.status(500).send("Error al conectar con la base de datos");
  }
});

// Endpoint /preguntas
app.get("/preguntas", async (_req, res) => {
  try {
    const result = await pool.query("SELECT * FROM preguntas");
    if (result.rows.length === 0) {
      return res.status(404).send("No hay usuarios en la base de datos");
    }
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error("Error al conectar:", error);
    res.status(500).send("Error al conectar con la base de datos");
  }
});

// Iniciar el servidor con Bun
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT} (usando Bun)`);
});