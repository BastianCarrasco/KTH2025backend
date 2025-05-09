// index.ts
import express from "express";
import { pool } from "./db";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", async (_req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.send(`Hora del servidor PostgreSQL: ${result.rows[0].now}`);
  } catch (error) {
    console.error("Error al conectar:", error);
    res.status(500).send("Error al conectar con la base de datos");
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
