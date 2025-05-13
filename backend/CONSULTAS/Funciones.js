import { getHistoria, getNiveles } from "../queries/funciones";

// Configuración común de errores
const handleError = (res, error, endpointName) => {
  console.error(`Error en ${endpointName}:`, error.stack || error);
  res.status(500).json({ 
    success: false,
    error: "Error interno del servidor",
    details: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
};

const historiaRoutes = (app) => {
  app.get("/historia", async (_req, res) => {
    try {
      const categorias = await getHistoria();
      if (!categorias || categorias.length === 0) {
        return res.status(404).json({ 
          success: false,
          error: "No se encontraron datos"
        });
      }
      res.json({ success: true, data: categorias });
    } catch (error) {
      handleError(res, error, "GET /historia");
    }
  });
};

const nivelesRoutes = (app) => {
  app.get("/niveles", async (_req, res) => {
    try {
      const categorias = await getNiveles();
      if (!categorias || categorias.length === 0) {
        return res.status(404).json({
          success: false,
          error: "No se encontraron datos"
        });
      }
      res.json({ success: true, data: categorias });
    } catch (error) {
      handleError(res, error, "GET /niveles");
    }
  });
};

// Opción 1: Exportación como objeto (como tienes actualmente)
export default { historiaRoutes, nivelesRoutes };
