import express from "express";

import {
  getAllAlternativas,
  createAlternativa,
  updateAlternativa,
  deleteAlternativa,
  getAlternativaById,
  getAlternativasByPregunta,
} from "../queries/alternativas";

const todas_las_alternativas = (app) => {
  app.get("/alternativas", async (_req, res) => {
    try {
      const categorias = await getAllAlternativas(); // Usando la función importada
      if (categorias.length === 0) {
        return res.status(404).send("No hay alternativas en la base de datos");
      }
      res.json({ success: true, data: categorias });
    } catch (error) {
      console.error("Error al obtener categorías:", error);
      res.status(500).send("Error al conectar con la base de datos");
    }
  });
};

const alternativa_por_id = (app) => {
  // Endpoint GET /alternativas/:id - Obtener alternativa por ID
  app.get("/alternativas/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const alternativa = await getAlternativaById(id);

      if (!alternativa) {
        return res.status(404).json({
          success: false,
          message: "Alternativa no encontrada",
        });
      }

      res.json({ success: true, data: alternativa });
    } catch (error) {
      console.error("Error al obtener alternativa:", error);
      res.status(500).json({
        success: false,
        message: "Error al conectar con la base de datos",
      });
    }
  });
};

const alternativa_por_pregunta = (app) => {
  // Endpoint GET /alternativas/pregunta/:id_pregunta - Obtener alternativas por pregunta
  app.get("/alternativas/pregunta/:id_pregunta", async (req, res) => {
    try {
      const id_pregunta = parseInt(req.params.id_pregunta);
      const alternativas = await getAlternativasByPregunta(id_pregunta);

      if (alternativas.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No se encontraron alternativas para esta pregunta",
        });
      }

      res.json({ success: true, data: alternativas });
    } catch (error) {
      console.error("Error al obtener alternativas por pregunta:", error);
      res.status(500).json({
        success: false,
        message: "Error al conectar con la base de datos",
      });
    }
  });
};

const crear_alternativa = (app) => {
  // Endpoint POST /alternativas - Crear nueva alternativa
  app.post("/alternativas", express.json(), async (req, res) => {
    try {
      const { texto, id_pregunta } = req.body;
      if (!texto || !id_pregunta === undefined) {
        return res.status(400).json({
          success: false,
          message: "Faltan campos requeridos",
        });
      }
      const nuevaalternativa = await createAlternativa(texto, id_pregunta);
      res.status(201).json({ success: true, data: nuevaalternativa });
    } catch (error) {
      console.error("Error:", error);
      res
        .status(500)
        .json({ success: false, message: "Error al crear ALTERNATIVA" });
    }
  });
};

const editar_alternativa = (app) => {
  // Endpoint PUT /alternativas/:id - Actualizar alternativa
  app.put("/alternativas/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { texto, id_pregunta } = req.body;

      if (!texto || !id_pregunta) {
        return res.status(400).json({
          success: false,
          message: "Texto e id_pregunta son campos requeridos",
        });
      }

      const alternativaActualizada = await updateAlternativa(
        id,
        texto,
        id_pregunta
      );

      if (!alternativaActualizada) {
        return res.status(404).json({
          success: false,
          message: "Alternativa no encontrada",
        });
      }

      res.json({ success: true, data: alternativaActualizada });
    } catch (error) {
      console.error("Error al actualizar alternativa:", error);
      res.status(500).json({
        success: false,
        message: "Error al actualizar la alternativa",
      });
    }
  });
};

const eliminar_alternativa = (app) => {
  // Endpoint DELETE /alternativas/:id - Eliminar alternativa
  app.delete("/alternativas/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const alternativaEliminada = await deleteAlternativa(id);

      if (!alternativaEliminada) {
        return res.status(404).json({
          success: false,
          message: "Alternativa no encontrada",
        });
      }

      res.json({
        success: true,
        message: "Alternativa eliminada correctamente",
        data: alternativaEliminada,
      });
    } catch (error) {
      console.error("Error al eliminar alternativa:", error);
      res.status(500).json({
        success: false,
        message: "Error al eliminar la alternativa",
      });
    }
  });
};

export default {
  todas_las_alternativas,
  alternativa_por_id,
  alternativa_por_pregunta,
  crear_alternativa,
  editar_alternativa,
  eliminar_alternativa,
};
