import { insertProyectoAcademico, getProyectoAcademico } from "../queries/link";

const crear_ProyectoAcademico = (app) => {
  app.post("/proyecto-academico", async (req, res) => {
    try {
      const { id_proyecto, id_academico, jefe } = req.body;

      // Validate required fields
      if (!id_proyecto || !id_academico || jefe === undefined) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Insert new record
      const nuevoProyecto = await insertProyectoAcademico(
        id_proyecto, 
        id_academico, 
        jefe
      );

      // Return the created record
      res.status(201).json(nuevoProyecto);
    } catch (error) {
      console.error("Error creating proyecto academico:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
};

const Links = (app) => {
  app.get("/links", async (req, res) => {
    try {
      const links = await getProyectoAcademico();
      res.status(200).json({ 
        success: true, 
        data: links 
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Error al obtener links",
        error: error.message 
      });
    }
  });
} 

export default {
  crear_ProyectoAcademico,
  Links
};