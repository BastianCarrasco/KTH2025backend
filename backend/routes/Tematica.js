import {createTematica,getTematicas, deleteTematica, updateTematica } from "../queries/tematica";
import express from "express";

const AllTematicas = (app) => {
  app.get("/AllTematicas", async (req, res) => {
    try {
      const inventos = await getTematicas();
      res.json({ success: true, data: inventos });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ success: false, message: "Error al obtener inventos" });
    }
  });
};

const NuevaTematica = (app) => {
  app.post("/AllTematicas", express.json(), async (req, res) => {
    try {
      const { nombre } = req.body;
      if (!nombre) {
        return res.status(400).json({ 
          success: false, 
          message: "Faltan campos requeridos" 
        });
      }
      const nuevaTematica = await createTematica(nombre);
      res.status(201).json({ success: true, data: nuevaTematica });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Error al insertar tematica",
        error: error.message // Opcional: incluir el mensaje de error
      });
    }
  });
};

const ElminarTematica = (app) => {
  app.delete("/AllTematicas/:id", async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ 
          success: false, 
          message: "Falta el ID de la tematica" 
        });
      }
      const result = await deleteTematica(id);
      if (result.affectedRows === 0) {
        return res.status(404).json({ 
          success: false, 
          message: "Tematica no encontrada" 
        });
      }
      res.json({ success: true, message: "Tematica eliminada correctamente" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Error al eliminar tematica",
        error: error.message // Opcional: incluir el mensaje de error
      });
    }
  });
};

const updateTematicaHandler = (app) => {
  app.put("/AllTematicas/:id", express.json(), async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre } = req.body;
      if (!id || !nombre) {
        return res.status(400).json({ 
          success: false, 
          message: "Faltan campos requeridos" 
        });
      }
      const updatedTematica = await updateTematica(id, nombre);
      if (updatedTematica.affectedRows === 0) {
        return res.status(404).json({ 
          success: false, 
          message: "Tematica no encontrada" 
        });
      }
      res.json({ success: true, data: updatedTematica });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Error al actualizar tematica",
        error: error.message // Opcional: incluir el mensaje de error
      });
    }
  });
};

export default {
  AllTematicas,
  NuevaTematica,
  ElminarTematica,
  updateTematicaHandler
};
