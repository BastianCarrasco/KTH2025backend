import { getUA } from "../queries/UA";

const UAdata = (app) => {
  app.get("/ua", async (req, res) => {
    try {
      const inventos = await getUA();
      res.json({ success: true, data: inventos });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ success: false, message: "Error al obtener inventos" });
    }
  });
};

export default {
  UAdata
};