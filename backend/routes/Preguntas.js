import {
  getAllPreguntas,
  getPreguntaById,
  createPregunta,
  updatePregunta,
  deletePregunta,
} from "../queries/preguntas";
import express from "express";

const todas_las_preguntas = (app) => {
  app.get("/preguntas", async (req, res) => {
    try {
      const preguntas = await getAllPreguntas();
      res.json({ success: true, data: preguntas });
    } catch (error) {
      console.error("Error:", error);
      res
        .status(500)
        .json({ success: false, message: "Error al obtener preguntas" });
    }
  });
};

const pregunta_por_id = (app) => {
  app.get("/preguntas/:id", async (req, res) => {
    try {
      const pregunta = await getPreguntaById(parseInt(req.params.id));
      if (!pregunta) {
        return res
          .status(404)
          .json({ success: false, message: "Pregunta no encontrada" });
      }
      res.json({ success: true, data: pregunta });
    } catch (error) {
      console.error("Error:", error);
      res
        .status(500)
        .json({ success: false, message: "Error al obtener la pregunta" });
    }
  });
};

const crear_pregunta = (app) => {
  app.post("/preguntas", express.json(), async (req, res) => {
    try {
      const { texto, categoria, nivel } = req.body;
      if (!texto || !categoria || nivel === undefined) {
        return res.status(400).json({
          success: false,
          message: "Faltan campos requeridos",
        });
      }
      const nuevaPregunta = await createPregunta(texto, categoria, nivel);
      res.status(201).json({ success: true, data: nuevaPregunta });
    } catch (error) {
      console.error("Error:", error);
      res
        .status(500)
        .json({ success: false, message: "Error al crear pregunta" });
    }
  });
};

const actualizar_pregunta = (app) => {
  app.put("/preguntas/:id", express.json(), async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { texto, categoria, nivel } = req.body;

      // Validación de campos requeridos
      if (!texto || nivel === undefined || categoria === undefined) {
        return res.status(400).json({
          success: false,
          message: "Faltan campos requeridos: texto, categoria y nivel",
        });
      }

      // Validación de tipos
      if (typeof categoria !== "number" || !Number.isInteger(categoria)) {
        return res.status(400).json({
          success: false,
          message: "El campo 'categoria' debe ser un número entero",
        });
      }

      if (typeof nivel !== "number" || !Number.isInteger(nivel)) {
        return res.status(400).json({
          success: false,
          message: "El campo 'nivel' debe ser un número entero",
        });
      }

      // Validación adicional para valores positivos (opcional)
      if (categoria < 0 || nivel < 0) {
        return res.status(400).json({
          success: false,
          message: "Los valores de categoría y nivel deben ser positivos",
        });
      }

      const preguntaActualizada = await updatePregunta(
        id,
        texto,
        categoria,
        nivel
      );

      if (!preguntaActualizada) {
        return res.status(404).json({
          success: false,
          message: "Pregunta no encontrada",
        });
      }

      res.json({
        success: true,
        data: preguntaActualizada,
        message: "Pregunta actualizada correctamente",
      });
    } catch (error) {
      console.error("Error al actualizar pregunta:", error);
      res.status(500).json({
        success: false,
        message: "Error interno al actualizar la pregunta",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  });
};

const eliminar_pregunta = (app) => {
  app.delete("/preguntas/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const preguntaEliminada = await deletePregunta(id);

      if (!preguntaEliminada) {
        return res
          .status(404)
          .json({ success: false, message: "Pregunta no encontrada" });
      }
      res.json({ success: true, data: preguntaEliminada });
    } catch (error) {
      console.error("Error:", error);
      res
        .status(500)
        .json({ success: false, message: "Error al eliminar pregunta" });
    }
  });
};

export default {
  todas_las_preguntas,
  pregunta_por_id,
  crear_pregunta,
  actualizar_pregunta,
  eliminar_pregunta,
};
