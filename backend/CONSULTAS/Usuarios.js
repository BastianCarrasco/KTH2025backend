import { getAllUsuarios, createUsuario } from "../queries/usuarios";
import express from "express";

const usuariosRoutes = (app) => {
  app.get("/usuarios", async (_req, res) => {
    try {
      const categorias = await getAllUsuarios(); // Usando la función importada
      if (categorias.length === 0) {
        return res.status(404).send("No hay Usuairios en la base de datos");
      }
      res.json({ success: true, data: categorias });
    } catch (error) {
      console.error("Error al obtener categorías:", error);
      res.status(500).send("Error al conectar con la base de datos");
    }
  });
};

const crear_usuario = (app) => {
  app.post("/usuarios", express.json(), async (req, res) => {
    try {
      const { nombre, email, clave } = req.body;
      if (!nombre || !email || clave === undefined) {
        return res.status(400).json({
          success: false,
          message: "Faltan campos requeridos",
        });
      }
      const nuevaPregunta = await createUsuario(nombre, email, clave);
      res.status(201).json({ success: true, data: nuevaPregunta });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ success: false, message: "error al crear user" });
    }
  });
};

export default { usuariosRoutes, crear_usuario };