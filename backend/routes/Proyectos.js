import express from "express";
import { insertProyecto , eliminar_proyecto} from "../queries/proyectos";

const crear_proyecto = (app) => {
  app.post("/proyectos", express.json(), async (req, res) => {
    try {
      const {
        nombre,
        monto = 0, // Valor por defecto si no se proporciona
        fecha_postulacion = null,
        comentarios = null,
        unidad = null,
        id_convocatoria = null,
        id_tematica = null, // ← Corregido (antes era `id_Proyecto`, que parece incorrecto)
        id_apoyo = null,
        id_estatus = null,
        id_kth = null,
        academicos = [], // ← Campo obligatorio para académicos
      } = req.body;

      // Validación de campos obligatorios
      if (!nombre || !academicos || academicos.length === 0) {
        return res.status(400).json({
          success: false,
          message: "El nombre del proyecto y al menos un académico son obligatorios",
        });
      }

      // Insertar proyecto
      const nuevoProyecto = await insertProyecto({
        nombre,
        monto,
        fecha_postulacion,
        comentarios,
        unidad,
        id_convocatoria,
        id_tematica, // ← Corregido
        id_apoyo,
        id_estatus,
        id_kth,
      });

      // Asociar académicos al proyecto (si hay)
      if (academicos && academicos.length > 0) {
        await asociarAcademicos(nuevoProyecto.id_proyecto, academicos);
      }

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

// Función auxiliar para asociar académicos (si es necesario)
async function asociarAcademicos(idProyecto, academicos) {
  // Implementación dependiendo de tu base de datos
  // Ejemplo con Knex:
  for (const idAcademico of academicos) {
    await knex("proyecto_academico").insert({
      id_proyecto: idProyecto,
      id_academico: idAcademico,
      jefe: 1, // O algún otro valor por defecto
    });
  }
}

module.exports = crear_proyecto;

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
