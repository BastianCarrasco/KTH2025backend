import { getApoyo, insertarApoyo, getTags, ElminarTag } from "../queries/apoyo";
import express from "express";

const AllApoyo = (app) => {
  app.get("/apoyo", async (req, res) => {
    try {
      const inventos = await getApoyo();
      res.json({ success: true, data: inventos });
    } catch (error) {
      console.error("Error:", error);
      res
        .status(500)
        .json({ success: false, message: "Error al obtener inventos" });
    }
  });
};

const crearApoyo = (app) => {
  app.post("/tag", express.json(), async (req, res) => {
    try {
      const { tipo, detalle } = req.body;
      if (!tipo || !detalle) {
        return res.status(400).json({
          success: false,
          message: "Faltan campos requeridos",
        });
      }
      // Pasa los parámetros correctamente (detalle primero, luego tipo)
      const nuevoApoyo = await insertarApoyo(detalle, tipo);
      res.status(201).json({ success: true, data: nuevoApoyo });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({
        success: false,
        message: "Error al insertar apoyo",
        error: error.message, // Opcional: incluir el mensaje de error
      });
    }
  });
};

const AllTags = (app) => {
  app.get("/tag", async (req, res) => {
    try {
      const tags = await getTags();
      res.json({ success: true, data: tags });
    } catch (error) {
      console.error("Error:", error);
      res
        .status(500)
        .json({ success: false, message: "Error al obtener tags" });
    }
  });
};

const borrartag = (app) => {
  app.delete("/tag", async (req, res) => {
    try {
      const tag = await ElminarTag();
      res.json({ success: true, data: tag });
    } catch (error) {
      console.error("error:", error);
      res
        .status(500)
        .json({ success: false, message: "Error al eliminar tags" });
    }
  });
};

export default {
  AllApoyo,
  crearApoyo,
  AllTags,
  borrartag
};
