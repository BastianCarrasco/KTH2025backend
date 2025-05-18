import express from "express";
import { insertProyecto, getProyectos } from "../queries/proyectos";

const crear_Proyecto = (app) => {
  app.post("/proyecto", express.json(), async (req, res) => {
    try {
      const { nombre, monto, fecha_postulacion, comentarios, unidad, id_convocatoria } = req.body;
      
      // Validación de campos requeridos
      if (!nombre || !monto || !fecha_postulacion || !unidad || !id_convocatoria) {
        return res.status(400).json({
          success: false,
          message: "Faltan campos requeridos",
        });
      }
      
      const nuevoProyecto = await insertProyecto(
        nombre, 
        monto, 
        fecha_postulacion, 
        comentarios, 
        unidad, 
        id_convocatoria
      );
      
      res.status(201).json({ 
        success: true, 
        data: nuevoProyecto 
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Error al crear proyecto",
        error: error.message 
      });
    }
  });
};

const get_Proyectos = (app) => {
  app.get("/proyectos", async (req, res) => {
    try {
      const proyectos = await getProyectos();
      res.status(200).json({ 
        success: true, 
        data: proyectos 
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Error al obtener proyectos",
        error: error.message 
      });
    }
  });
}    

export default { crear_Proyecto, get_Proyectos };