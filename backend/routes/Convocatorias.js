import {
  getTipoConvocatorias,
  getInstConvocatorias,
  insertConvocatoria,
} from "../queries/convocatorias";

const TipoConvocatorias = (app) => {
  app.get("/tconvo", async (req, res) => {
    try {
      const Convos = await getTipoConvocatorias();
      res.json({ success: true, data: Convos });
    } catch (error) {
      console.error("Error:", error);
      res
        .status(500)
        .json({ success: false, message: "Error al obtener Convos" });
    }
  });
};

const InstConvocatorias = (app) => {
  app.get("/iconvo", async (req, res) => {
    try {
      const Convos = await getInstConvocatorias();
      res.json({ success: true, data: Convos });
    } catch (error) {
      console.error("Error:", error);
      res
        .status(500)
        .json({ success: false, message: "Error al obtener Convos" });
    }
  });
};

const crearConvocatoria = (app) => {
  app.post("/convocatorias", async (req, res) => {
    try {
      const { nombre, tipo, institucion } = req.body;
      if (!nombre || !tipo || !institucion) {
        return res.status(400).json({
          success: false,
          error: "Faltan campos obligatorios (nombre, tipo, institucion)",
        });
      }
      const nuevaCOnvocatoria = await insertConvocatoria({
        nombre,
        tipo,
        institucion,
      });
      res.status(201).json({ success: true, data: nuevaCOnvocatoria });
    } catch (error) {
      console.error("Error:", error);
      res
        .status(500)
        .json({ success: false, message: "Error al crear la convocatoria" });
    }
  });
};

export default { TipoConvocatorias, InstConvocatorias, crearConvocatoria };
