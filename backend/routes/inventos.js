import { getAllInventos, getInventoById, createInvento, deleteInvento, updateInvento } from "../queries/inventos";

const Allinventos = (app) => {
  app.get("/inventos", async (req, res) => {
    try {
      const inventos = await getAllInventos();
      res.json({ success: true, data: inventos });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ success: false, message: "Error al obtener inventos" });
    }
  });
};

const InventoById = (app) => {
  app.get("/inventos/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false,
          error: "ID debe ser un número válido" 
        });
      }

      const invento = await getInventoById(id);
      if (!invento) {
        return res.status(404).json({ 
          success: false,
          error: `Invento con ID ${id} no encontrado` 
        });
      }
      res.json({ success: true, data: invento });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ success: false, message: "Error al obtener el invento" });
    }
  });
};

const CreateInvento = (app) => {
  app.post("/inventos", async (req, res) => {
    try {
      const { nombre, financiamiento, empresas, industria } = req.body;
      
      if (!nombre || !financiamiento || !empresas || !industria === undefined) {
        return res.status(400).json({ 
          success: false,
          error: "Faltan campos obligatorios (nombre, financiamiento, empresas, industria)" 
        });
      }

      const fechaActual = new Date();
      const nuevoInvento = await createInvento({
        nombre,
        financiamiento,
        empresas,
        industria,
        fecha_registro: fechaActual,
        fecha_actualizacion: fechaActual
      });

      res.status(201).json({ success: true, data: nuevoInvento });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ success: false, message: "Error al crear el invento" });
    }
  });
};

const UpdateInvento = (app) => {
  app.put("/inventos/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false,
          error: "ID debe ser un número válido" 
        });
      }

      const { nombre, financiamiento, empresas, industria } = req.body;
      const updates = { nombre, financiamiento, empresas, industria };

      const inventoActualizado = await updateInvento(id, updates);
      if (!inventoActualizado) {
        return res.status(404).json({ 
          success: false,
          error: `Invento con ID ${id} no encontrado` 
        });
      }

      res.json({ success: true, data: inventoActualizado });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ success: false, message: "Error al actualizar el invento" });
    }
  });
};

const DeleteInvento = (app) => {
  app.delete("/inventos/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false,
          error: "ID debe ser un número válido" 
        });
      }

      const inventoEliminado = await deleteInvento(id);
      if (!inventoEliminado) {
        return res.status(404).json({ 
          success: false,
          error: `Invento con ID ${id} no encontrado` 
        });
      }

      res.json({ 
        success: true, 
        message: `Invento con ID ${id} eliminado correctamente`,
        data: inventoEliminado 
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ success: false, message: "Error al eliminar el invento" });
    }
  });
};

export default {
  Allinventos,
  InventoById,
  CreateInvento,
  UpdateInvento,
  DeleteInvento
};