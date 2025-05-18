import { getAcademicos } from "../queries/academicos";

const Academicos = (app) => {
  app.get("/academicos", async (req, res) => {
    try {
      const inventos = await getAcademicos();
      res.json({ success: true, data: inventos });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ success: false, message: "Error al obtener inventos" });
    }
  });
};

export default {
  Academicos
};