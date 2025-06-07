import express from "express";
import { insertProyecto , eliminar_proyecto} from "../queries/proyectos";

const crear_proyecto = (app) => {
  app.post("/proyectos", express.json(), async (req, res) => {
    try {
      const {
        nombre,
        monto,
        fecha_postulacion,
        comentarios,
        unidad,
        id_convocatoria,
        id_Proyecto,
        id_apoyo,
        id_estatus,
        id_kth,
      } = req.body;

      if (
        !nombre ||
        !monto ||
        !fecha_postulacion ||
        !comentarios || // ← Ahora es obligatorio
        !unidad ||
        !id_convocatoria ||
        !id_Proyecto || // ← Obligatorio
        !id_apoyo || // ← Obligatorio
        !id_estatus || // ← Obligatorio
        
        id_kth === undefined // ← Validación explícita para null/undefined
      ) {
        return res.status(400).json({
          success: false,
          message: "Faltan campos requeridos",
        });
      }

      const nuevoProyecto = await insertProyecto({
        nombre,
        monto,
        fecha_postulacion,
        comentarios,
        unidad,
        id_convocatoria,
        id_Proyecto,
        id_apoyo,
        id_estatus,
        id_kth,
      });

      res.status(201).json({ success: true, data: nuevoProyecto });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({
        success: false,
        message: "Error al crear proyecto",
        error: error.message,
      });
    }
  });
};

const BorrarProyecto = (app) => {
  app.delete("/proyectos/:id_proyecto", async (req, res) => {
    try {
      const { id_proyecto } = req.params;
      if (!id_proyecto) {
        return res.status(400).json({ 
          success: false, 
          message: "Falta el ID del proyecto" 
        });
      }
      const result = await eliminar_proyecto(id_proyecto);
      
      // Dependiendo de tu base de datos, podrías necesitar verificar diferente
      if (result.rowCount === 0) { // Para PostgreSQL
        return res.status(404).json({ 
          success: false, 
          message: "Proyecto no encontrado" 
        });
      }
      res.json({ success: true, message: "Proyecto eliminado correctamente" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Error al eliminar proyecto",
        error: error.message
      });
    }
  });
};


export default {
  crear_proyecto,
  BorrarProyecto
};
