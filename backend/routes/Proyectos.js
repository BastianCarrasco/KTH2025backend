import express from "express";
import { insertProyecto } from "../queries/proyectos";

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
        id_tematica,
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
        !id_tematica || // ← Obligatorio
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
        id_tematica,
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

export default {
  crear_proyecto,
};
