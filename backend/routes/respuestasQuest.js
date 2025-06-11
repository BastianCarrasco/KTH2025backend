import { 
  createRespuestaCuestionario, 
  getRespuestasCuestionarios,
  getRespuestaById,
  updateRespuestaCuestionario,
  deleteRespuestaCuestionario 
} from "../queries/respuestasQuest";

// Obtener todas las respuestas de cuestionarios
const getAllRespuestasCuestionarios = (app) => {
  app.get("/respuestas-cuestionarios", async (req, res) => {
    try {
      const respuestas = await getRespuestasCuestionarios();
      res.json({ success: true, data: respuestas });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({
        success: false,
        message: "Error al obtener las respuestas de cuestionarios",
      });
    }
  });
};

// Obtener una respuesta por ID
const getRespuestaByIdHandler = (app) => {
  app.get("/respuestas-cuestionarios/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const respuesta = await getRespuestaById(id);

      if (respuesta) {
        res.json({ success: true, data: respuesta });
      } else {
        res.status(404).json({
          success: false,
          message: "Respuesta no encontrada",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({
        success: false,
        message: "Error al obtener la respuesta",
      });
    }
  });
};

// Crear una nueva respuesta de cuestionario
const createNewRespuestaCuestionario = (app) => {
  app.post("/respuestas-cuestionarios", async (req, res) => {
    try {
      const { nombre_investigador, escuela, respuestas } = req.body;

      if (!nombre_investigador || !escuela) {
        return res.status(400).json({
          success: false,
          message: "Todos los campos son requeridos (nombre_investigador, escuela)",
        });
      }

      if (!Array.isArray(respuestas) || respuestas.length !== 9) { // Check array and length
        return res.status(400).json({
          success: false,
          message: "Las respuestas deben ser un array de 9 elementos.",
        });
      }

      // Optional: Check if each item in the array is either a string or null
       if (!respuestas.every(item => typeof item === 'string' || item === null || item === undefined)) {
           return res.status(400).json({
               success: false,
               message: "Las respuestas deben ser cadenas de texto o nulas.",
           });
       }

      const nuevaRespuesta = await createRespuestaCuestionario(
        nombre_investigador,
        escuela,
        respuestas
      );

      res.status(201).json({
        success: true,
        data: nuevaRespuesta,
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({
        success: false,
        message: "Error al crear la respuesta del cuestionario",
      });
    }
  });
};

// Actualizar una respuesta de cuestionario
const updateExistingRespuestaCuestionario = (app) => {
  app.put("/respuestas-cuestionarios/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { nombre_investigador, escuela, respuestas } = req.body;

      if (!nombre_investigador || !escuela || !respuestas) {
        return res.status(400).json({
          success: false,
          message: "Todos los campos son requeridos (nombre_investigador, escuela, respuestas)",
        });
      }

      if (!Array.isArray(respuestas)) {
        return res.status(400).json({
          success: false,
          message: "Las respuestas deben ser un array",
        });
      }

      const respuestaActualizada = await updateRespuestaCuestionario(
        id,
        nombre_investigador,
        escuela,
        respuestas
      );

      if (respuestaActualizada) {
        res.json({
          success: true,
          data: respuestaActualizada,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Respuesta no encontrada",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({
        success: false,
        message: "Error al actualizar la respuesta",
      });
    }
  });
};

// Eliminar una respuesta de cuestionario
const deleteExistingRespuestaCuestionario = (app) => {
  app.delete("/respuestas-cuestionarios/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const respuestaEliminada = await deleteRespuestaCuestionario(id);

      if (respuestaEliminada) {
        res.json({
          success: true,
          message: "Respuesta eliminada correctamente",
          data: respuestaEliminada,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Respuesta no encontrada",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({
        success: false,
        message: "Error al eliminar la respuesta",
      });
    }
  });
};

export default {
  getAllRespuestasCuestionarios,
  getRespuestaByIdHandler,
  createNewRespuestaCuestionario,
  updateExistingRespuestaCuestionario,
  deleteExistingRespuestaCuestionario,
};