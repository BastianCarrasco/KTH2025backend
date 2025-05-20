import { getfondos } from "../queries/fondos";

const fondos = (app) => {
  app.get("/fondos", async (req, res) => {
    try {
      const fondos = await getfondos();
      res.status(200).json({ 
        success: true, 
        data: fondos 
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Error al obtener fondos",
        error: error.message 
      });
    }
  });
} 


export default {
  fondos
};