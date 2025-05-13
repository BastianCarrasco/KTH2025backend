import express from "express";
import { getAllRespuestas, createRespuesta } from "../queries/respuestas";

const Todas_las_respeustas = (app) => {
  app.get("/respuestas", async (_req, res) => {
    try {
      const respuestas = await getAllRespuestas(); // Esto ahora recibe directamente el array

      // Respuesta exitosa incluso si el array está vacío
      res.status(200).json({
        success: true,
        data: respuestas,
        count: respuestas.length,
      });
    } catch (error) {
      console.error("Error en GET /respuestas:", error);
      res.status(500).json({
        success: false,
        message: "Error al obtener las respuestas",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  });
};

const crear_respuesta = (app) => {
  app.post("/respuestas", express.json(), async (req, res) => {
    try {
      const { id_user, claves_resp, crl, trl, team, brl, frl, iprl } = req.body;

      // Validación corregida que permite 0 pero no undefined/null
      if (
        id_user === undefined ||
        id_user === null ||
        claves_resp === undefined ||
        claves_resp === null ||
        crl === undefined ||
        crl === null ||
        trl === undefined ||
        trl === null ||
        team === undefined ||
        team === null ||
        brl === undefined ||
        brl === null ||
        frl === undefined ||
        frl === null ||
        iprl === undefined ||
        iprl === null
      ) {
        return res.status(400).json({
          success: false,
          message: "Faltan campos requeridos (se permiten ceros)",
        });
      }

      const nuevaresp = await createRespuesta(
        id_user,
        claves_resp,
        crl,
        trl,
        team,
        brl,
        frl,
        iprl
      );

      res.status(201).json({ success: true, data: nuevaresp });
    } catch (error) {
      console.error("Error:", error);
      res
        .status(500)
        .json({ success: false, message: "Error al crear respuesta" });
    }
  });
};

export default { Todas_las_respeustas, crear_respuesta };
