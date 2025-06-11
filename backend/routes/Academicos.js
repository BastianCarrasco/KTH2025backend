import { getAcademicos, createAcademico } from "../queries/academicos";
import express from "express";
const Academicos = (app) => {
  app.get("/academicos", async (req, res) => {
    try {
      const inventos = await getAcademicos();
      res.json({ success: true, data: inventos });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ success: false, message: "Error al obtener inventos" });
    }
  });
};


const POST_ACADEMICO = (app) => {
  app.post("/academicos", express.json(), async (req, res) => {
    try {
      const { nombre, email, a_materno, a_paterno } = req.body;
      if (!nombre || !email || !a_materno || !a_paterno) {
        return res.status(400).json({
          success: false,
          message: "Faltan campos requeridos",
        });
      }
      // Pasa los parámetros correctamente (detalle primero, luego tipo)
      const nuevoAcademico = await createAcademico(nombre, email, a_materno, a_paterno);
      res.status(201).json({ success: true, data: nuevoAcademico });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({
        success: false,
        message: "Error al insertar Academico",
        error: error.message, // Opcional: incluir el mensaje de error
      });
    }
  });
};



export default {
  Academicos,
  POST_ACADEMICO
};