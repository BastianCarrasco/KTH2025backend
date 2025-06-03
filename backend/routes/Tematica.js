import { getTematica } from "../queries/tematica";

const AllTematicas = (app) => {
  app.get("/AllTematicas", async (req, res) => {
    try {
      const inventos = await getTematica();
      res.json({ success: true, data: inventos });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ success: false, message: "Error al obtener inventos" });
    }
  });
};

export default {
  AllTematicas
};