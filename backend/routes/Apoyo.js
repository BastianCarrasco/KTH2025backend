import { getApoyo } from "../queries/apoyo";

const AllApoyo = (app) => {
  app.get("/AllApoyo", async (req, res) => {
    try {
      const inventos = await getApoyo();
      res.json({ success: true, data: inventos });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ success: false, message: "Error al obtener inventos" });
    }
  });
};

export default {
  AllApoyo
};