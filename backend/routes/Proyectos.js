import express from "express";
import { insertProyecto, getProyectos } from "../queries/proyectos";

const crear_Proyecto = (app) => {
  app.post("/proyecto", express.json(), async (req, res) => {
    try {
      const { 
        nombre, 
        monto = 0,  // Default value if not provided
        fecha_postulacion = null, 
        comentarios = null, 
        unidad, 
        id_convocatoria = null 
      } = req.body;
      
      // Validación de campos requeridos (only nombre, monto, and unidad)
      if (!nombre || monto === undefined || !unidad) {
        return res.status(400).json({
          success: false,
          message: "Faltan campos requeridos: nombre, monto o unidad",
        });
      }
      
      // Additional validation
      if (typeof nombre !== 'string' || nombre.trim() === '') {
        return res.status(400).json({
          success: false,
          message: "El nombre debe ser un texto válido"
        });
      }
      
      if (isNaN(Number(monto))) {
        return res.status(400).json({
          success: false,
          message: "El monto debe ser un número válido"
        });
      }
      
      const nuevoProyecto = await insertProyecto({
        nombre: nombre.trim(),
        monto: Number(monto),
        fecha_postulacion: fecha_postulacion || null,
        comentarios: comentarios ? comentarios.trim() : null,
        unidad: Number(unidad),
        id_convocatoria: id_convocatoria ? Number(id_convocatoria) : null
      });
      
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