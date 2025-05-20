import {
  getCuestionarios,
  getCuestionarioById,
  createCuestionario,
  updateCuestionario,
  deleteCuestionario,
} from "../queries/cuestionario";

// Obtener todos los cuestionarios
const getAllCuestionarios = (app) => {
  app.get("/cuestionarios", async (req, res) => {
    try {
      const cuestionarios = await getCuestionarios();
      res.json({ success: true, data: cuestionarios });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({
        success: false,
        message: "Error al obtener los cuestionarios",
      });
    }
  });
};

// Obtener un cuestionario por ID
const getCuestionarioByIdHandler = (app) => {
  app.get("/cuestionarios/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const cuestionario = await getCuestionarioById(id);

      if (cuestionario) {
        res.json({ success: true, data: cuestionario });
      } else {
        res.status(404).json({
          success: false,
          message: "Cuestionario no encontrado",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({
        success: false,
        message: "Error al obtener el cuestionario",
      });
    }
  });
};

// Crear un nuevo cuestionario
const createNewCuestionario = (app) => {
  app.post("/cuestionarios", async (req, res) => {
    try {
      const { pregunta } = req.body;

      if (!pregunta) {
        return res.status(400).json({
          success: false,
          message: "La pregunta es requerida",
        });
      }

      const nuevoCuestionario = await createCuestionario(pregunta);
      res.status(201).json({
        success: true,
        data: nuevoCuestionario,
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({
        success: false,
        message: "Error al crear el cuestionario",
      });
    }
  });
};

// Actualizar un cuestionario
const updateExistingCuestionario = (app) => {
  app.put("/cuestionarios/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { pregunta } = req.body;

      if (!pregunta) {
        return res.status(400).json({
          success: false,
          message: "La pregunta es requerida",
        });
      }

      const cuestionarioActualizado = await updateCuestionario(id, pregunta);

      if (cuestionarioActualizado) {
        res.json({
          success: true,
          data: cuestionarioActualizado,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Cuestionario no encontrado",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({
        success: false,
        message: "Error al actualizar el cuestionario",
      });
    }
  });
};

// Eliminar un cuestionario
const deleteExistingCuestionario = (app) => {
  app.delete("/cuestionarios/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const cuestionarioEliminado = await deleteCuestionario(id);

      if (cuestionarioEliminado) {
        res.json({
          success: true,
          message: "Cuestionario eliminado correctamente",
          data: cuestionarioEliminado,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Cuestionario no encontrado",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({
        success: false,
        message: "Error al eliminar el cuestionario",
      });
    }
  });
};

export default {
  getAllCuestionarios,
  getCuestionarioByIdHandler,
  createNewCuestionario,
  updateExistingCuestionario,
  deleteExistingCuestionario,
};