import { getEstatus } from "../queries/estatus";


const Estatus = (app) => {
  app.get("/Estatus", async (req, res) => {
    try {
      const estatus = await getEstatus();
      res.json({ success: true, data: estatus });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ success: false, message: "Error al obtener estatus" });
    }
  });
};

export default {
  Estatus
};