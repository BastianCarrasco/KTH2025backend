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
import UA from "./routes/UA";
import Link from "./routes/Link";
import Profes from "./routes/Academicos";
import Cuestionario from "./routes/Cuestionario";
import respuestasQuest from "./routes/respuestasQuest";
import fondos from "./routes/fondos";
import Todo from "./routes/Todo";
import Estatus from "./routes/Estatus";
import Apoyo from "./routes/Apoyo";
import Tematicas from "./routes/Tematica";


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
Convocatorias.ALLConvocatorias(app);

//Proyectos
Proyectos.crear_proyecto(app);
Proyectos.BorrarProyecto(app);


//Unidad Academica
UA.UAdata(app);

//Link
Link.Links(app);
Link.crear_ProyectoAcademico(app);

//Academicos

Profes.Academicos(app);
Profes.POST_ACADEMICO(app);

//Cuestionario
Cuestionario.getAllCuestionarios(app);
Cuestionario.createNewCuestionario(app);
Cuestionario.deleteExistingCuestionario(app);
Cuestionario.updateExistingCuestionario(app);

//Respuestas Cuestionario
respuestasQuest.createNewRespuestaCuestionario(app);
respuestasQuest.deleteExistingRespuestaCuestionario(app);
respuestasQuest.getAllRespuestasCuestionarios(app);
respuestasQuest.getRespuestaByIdHandler(app);
respuestasQuest.updateExistingRespuestaCuestionario(app);

// Fondos
fondos.fondos(app);

// todo
Todo(app);
// Estatus
Estatus.Estatus(app);
// Apoyo
Apoyo.AllApoyo(app);
Apoyo.crearApoyo(app);
Apoyo.AllTags(app);
Apoyo.borrartag(app);
// Tematica
Tematicas.AllTematicas(app);
Tematicas.NuevaTematica(app);
Tematicas.ElminarTematica(app);
Tematicas.updateTematicaHandler(app);





// Si necesitas configuración personalizada (ej: solo permitir ciertos dominios):
// app.use(cors({ origin: ["http://localhost:5173", "https://tudominio.com"] }));
// Iniciar el servidor con Bun
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT} (usando Bun)`);
});
