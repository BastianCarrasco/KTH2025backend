import { getAllCategorias } from "../queries/categorias";

const categoriasRoutes2 = (app) => {
  app.get("/categorias", async (_req, res) => {
    try {
      const categorias = await getAllCategorias();
      
      if (!categorias || categorias.length === 0) {
        return res.status(404).json({ 
          success: false, 
          message: "No hay categorías disponibles" 
        });
      }
      
      res.json({ 
        success: true, 
        data: categorias 
      });
      
    } catch (error) {
      console.error("Error en GET /categorias:", error);
      res.status(500).json({
        success: false,
        error: "Error interno del servidor",
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  });
};

export default categoriasRoutes2;