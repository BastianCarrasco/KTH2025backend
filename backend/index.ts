import express from "express";

import cors from "cors"; // Importa el paquete CORS

import Funcionescontrol from "./routes/Funciones"
import Preguntas from "./routes/Preguntas";
import Categoty from "./routes/Category"
import Usuarios from "./routes/Usuarios";
import Respuestas from "./routes/Respuestas";
import Alternativas from "./routes/Alternativas";
import Convocatorias from "./routes/Convocatorias";
import Proyectos from "./routes/Proyectos";


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware CORS (configuración básica para permitir todos los orígenes)
app.use(cors());
app.use(express.json());

//FUNCIONES

Funcionescontrol.historiaRoutes(app);
Funcionescontrol.nivelesRoutes(app);

//PREGUNTAS
Preguntas.todas_las_preguntas(app);
Preguntas.pregunta_por_id(app);
Preguntas.crear_pregunta(app);
Preguntas.actualizar_pregunta(app);     
Preguntas.eliminar_pregunta(app);

//Categoria
Categoty(app);

//Usuarios
Usuarios.crear_usuario(app);
Usuarios.usuariosRoutes(app);
//Respuestas
Respuestas.Todas_las_respeustas(app);
Respuestas.crear_respuesta(app);
//Alternativas
Alternativas.alternativa_por_id(app);
Alternativas.alternativa_por_pregunta(app);
Alternativas.crear_alternativa(app);
Alternativas.editar_alternativa(app);
Alternativas.eliminar_alternativa(app);
Alternativas.todas_las_alternativas(app); 

//Convocatorias
Convocatorias.InstConvocatorias(app);
Convocatorias.TipoConvocatorias(app);
Convocatorias.crearConvocatoria(app);

//Proyectos
Proyectos.crear_Proyecto(app);
Proyectos.get_Proyectos(app);




// Si necesitas configuración personalizada (ej: solo permitir ciertos dominios):
// app.use(cors({ origin: ["http://localhost:5173", "https://tudominio.com"] }));
// Iniciar el servidor con Bun
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT} (usando Bun)`);
});
