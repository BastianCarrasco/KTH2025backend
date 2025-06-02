import { getTODO } from "../queries/todo";

const Todo = (app) => {
  app.get("/todo", async (req, res) => {
    try {
      const proyectos = await getTODO();
      res.json({ success: true, data: proyectos });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Error al obtener los proyectos" 
      });
    }
  });
};

export default Todo;