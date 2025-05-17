import express from "express";

import cors from "cors"; // Importa el paquete CORS

import Funcionescontrol from "./CONSULTAS/Funciones"
import Preguntas from "./CONSULTAS/Preguntas";
import Categoty from "./CONSULTAS/Category"
import Usuarios from "./CONSULTAS/Usuarios";
import Respuestas from "./CONSULTAS/Respuestas";
import Alternativas from "./CONSULTAS/Alternativas";


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware CORS (configuración básica para permitir todos los orígenes)
app.use(cors());

Funcionescontrol.historiaRoutes(app);
Funcionescontrol.nivelesRoutes(app);
Preguntas.todas_las_preguntas(app);
Preguntas.pregunta_por_id(app);
Preguntas.crear_pregunta(app);
Preguntas.actualizar_pregunta(app);     
Preguntas.eliminar_pregunta(app);
Categoty(app);
Usuarios.crear_usuario(app);
Usuarios.usuariosRoutes(app);
Respuestas.Todas_las_respeustas(app);
Respuestas.crear_respuesta(app);
Alternativas.alternativa_por_id(app);
Alternativas.alternativa_por_pregunta(app);
Alternativas.crear_alternativa(app);
Alternativas.editar_alternativa(app);
Alternativas.eliminar_alternativa(app);
Alternativas.todas_las_alternativas(app); 




// Si necesitas configuración personalizada (ej: solo permitir ciertos dominios):
// app.use(cors({ origin: ["http://localhost:5173", "https://tudominio.com"] }));
// Iniciar el servidor con Bun
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT} (usando Bun)`);
});
