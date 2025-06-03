import express from "express";
import { insertProyecto, getProyectos } from "../queries/proyectos";

const crear_Proyecto = (app) => {
  app.post("/proyecto", express.json(), async (req, res) => {
    try {
      const { 
        nombre, 
        monto = 0,
        fecha_postulacion = null, 
        comentarios = null, 
        unidad, 
        id_convocatoria = null,
        id_tematica = null,
        id_apoyo = null,
        id_estatus = null,
        id_kth = null
      } = req.body;
      
      // Validación de campos requeridos
      if (!nombre || monto === undefined || !unidad) {
        return res.status(400).json({
          success: false,
          message: "Faltan campos requeridos: nombre, monto o unidad",
        });
      }
      
      // Validaciones adicionales
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
      
      // Generar un nuevo ID si no se proporciona (o manejarlo según tu lógica)
      const id_proyecto = req.body.id_proyecto || generarNuevoId(); // Implementa tu propia lógica para generar IDs
      
      const nuevoProyecto = await insertProyecto({
        id_proyecto,
        nombre: nombre.trim(),
        monto: Number(monto),
        fecha_postulacion: fecha_postulacion || null,
        comentarios: comentarios ? comentarios.trim() : null,
        unidad: Number(unidad),
        id_convocatoria: id_convocatoria ? Number(id_convocatoria) : null,
        id_tematica: id_tematica ? Number(id_tematica) : null,
        id_apoyo: id_apoyo ? Number(id_apoyo) : null,
        id_estatus: id_estatus ? Number(id_estatus) : null,
        id_kth: id_kth ? Number(id_kth) : null
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

// Función de ejemplo para generar IDs (ajusta según tus necesidades)
function generarNuevoId() {
  return Math.floor(Math.random() * 1000000); // Esto es solo un ejemplo
}

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