import express from "express";
import { pool } from "./db";
import cors from "cors"; // Importa el paquete CORS

import { getAllCategorias } from "./queries/categorias";
import { getAllUsuarios } from "./queries/usuarios";
import { getAllRespuestas } from "./queries/respuestas";
import {   getAllPreguntas, 
  getPreguntaById,
  createPregunta, 
  updatePregunta,
  deletePregunta } from "./queries/preguntas";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware CORS (configuración básica para permitir todos los orígenes)
app.use(cors()); 

// Si necesitas configuración personalizada (ej: solo permitir ciertos dominios):
// app.use(cors({ origin: ["http://localhost:5173", "https://tudominio.com"] }));

// Endpoint /categorias (modificado para usar la función importada)
app.get("/categorias", async (_req, res) => {
  try {
    const categorias = await getAllCategorias(); // Usando la función importada
    if (categorias.length === 0) {
      return res.status(404).send("No hay categorías en la base de datos");
    }
    res.json({ success: true, data: categorias });
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    res.status(500).send("Error al conectar con la base de datos");
  }
});

// Endpoint /usuarios
app.get("/usuarios", async (_req, res) => {
  try {
    const categorias = await getAllUsuarios(); // Usando la función importada
    if (categorias.length === 0) {
      return res.status(404).send("No hay categorías en la base de datos");
    }
    res.json({ success: true, data: categorias });
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    res.status(500).send("Error al conectar con la base de datos");
  }
});


// Endpoint /respuestas
app.get("/respuestas", async (_req, res) => {
  try {
    const result = await getAllRespuestas(); // Usando la función importada
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
// GET todas las preguntas
app.get("/preguntas", async (req, res) => {
  try {
    const preguntas = await getAllPreguntas();
    res.json({ success: true, data: preguntas });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Error al obtener preguntas" });
  }
});

// GET una pregunta específica
app.get("/preguntas/:id", async (req, res) => {
  try {
    const pregunta = await getPreguntaById(parseInt(req.params.id));
    if (!pregunta) {
      return res.status(404).json({ success: false, message: "Pregunta no encontrada" });
    }
    res.json({ success: true, data: pregunta });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Error al obtener la pregunta" });
  }
});

// POST crear nueva pregunta
app.post("/preguntas", express.json(), async (req, res) => {
  try {
    const { texto, categoria, nivel } = req.body;
    if (!texto || !categoria || nivel === undefined) {
      return res.status(400).json({ 
        success: false, 
        message: "Faltan campos requeridos" 
      });
    }
    const nuevaPregunta = await createPregunta(texto, categoria, nivel);
    res.status(201).json({ success: true, data: nuevaPregunta });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Error al crear pregunta" });
  }
});

// PUT actualizar pregunta
app.put("/preguntas/:id", express.json(), async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { texto, categoria, nivel } = req.body;
    
    // Validación de campos requeridos
    if (!texto || nivel === undefined || categoria === undefined) {
      return res.status(400).json({ 
        success: false, 
        message: "Faltan campos requeridos: texto, categoria y nivel" 
      });
    }

    // Validación de tipos
    if (typeof categoria !== 'number' || !Number.isInteger(categoria)) {
      return res.status(400).json({ 
        success: false, 
        message: "El campo 'categoria' debe ser un número entero" 
      });
    }

    if (typeof nivel !== 'number' || !Number.isInteger(nivel)) {
      return res.status(400).json({ 
        success: false, 
        message: "El campo 'nivel' debe ser un número entero" 
      });
    }

    // Validación adicional para valores positivos (opcional)
    if (categoria < 0 || nivel < 0) {
      return res.status(400).json({ 
        success: false, 
        message: "Los valores de categoría y nivel deben ser positivos" 
      });
    }

    const preguntaActualizada = await updatePregunta(id, texto, categoria, nivel);
    
    if (!preguntaActualizada) {
      return res.status(404).json({ 
        success: false, 
        message: "Pregunta no encontrada" 
      });
    }
    
    res.json({ 
      success: true, 
      data: preguntaActualizada,
      message: "Pregunta actualizada correctamente" 
    });
    
  } catch (error) {
    console.error("Error al actualizar pregunta:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error interno al actualizar la pregunta",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// DELETE eliminar pregunta
app.delete("/preguntas/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const preguntaEliminada = await deletePregunta(id);
    
    if (!preguntaEliminada) {
      return res.status(404).json({ success: false, message: "Pregunta no encontrada" });
    }
    res.json({ success: true, data: preguntaEliminada });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Error al eliminar pregunta" });
  }
});

// Iniciar el servidor con Bun
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT} (usando Bun)`);
});