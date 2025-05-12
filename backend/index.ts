import express from "express";
import { pool } from "./db";
import cors from "cors"; // Importa el paquete CORS
import { getAllAlternativas,createAlternativa,deleteAlternativa,updateAlternativa } from "./queries/alternativas";
import { getNiveles, getHistoria } from "./queries/funciones";
import { getAllCategorias } from "./queries/categorias";
import { getAllUsuarios, createUsuario } from "./queries/usuarios";
import { createRespuesta, getAllRespuestas } from "./queries/respuestas";
import {   getAllPreguntas, 
  getPreguntaById,
  createPregunta, 
  updatePregunta,
  deletePregunta } from "./queries/preguntas";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware CORS (configuración básica para permitir todos los orígenes)
app.use(cors()); 


//FUNCIONES

app.get("/historia", async (_req, res) => {
  try {
    const categorias = await getHistoria(); // Usando la función importada
    if (categorias.length === 0) {
      return res.status(404).send("No hay DATOS");
    }
    res.json({ success: true, data: categorias });
  } catch (error) {
    console.error("Error al No hay DATOS:", error);
    res.status(500).send("Error No hay DATOS");
  }
});

app.get("/niveles", async (_req, res) => {
  try {
    const categorias = await getNiveles(); // Usando la función importada
    if (categorias.length === 0) {
      return res.status(404).send("No hay DATOS");
    }
    res.json({ success: true, data: categorias });
  } catch (error) {
    console.error("Error al No hay DATOS:", error);
    res.status(500).send("Error No hay DATOS");
  }
});

// Si necesitas configuración personalizada (ej: solo permitir ciertos dominios):
// app.use(cors({ origin: ["http://localhost:5173", "https://tudominio.com"] }));

// Endpoint /categorias (modificado para usar la función importada)
app.get("/categorias", async (_req, res) => {
  try {
    const categorias = await getAllCategorias(); // Usando la función importada
    if (categorias.length === 0) {
      return res.status(404).send("No hay categorías en la base de datos");
    }
    res.json({ success: true, data: categorias });
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    res.status(500).send("Error al conectar con la base de datos");
  }
});

// Endpoint /usuarios
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

app.post("/usuarios", express.json(), async (req, res) => {
  try {
    const { nombre, email, clave } = req.body;
    if (!nombre || !email || clave === undefined) {
      return res.status(400).json({ 
        success: false, 
        message: "Faltan campos requeridos" 
      });
    }
    const nuevaPregunta = await createUsuario(nombre, email, clave);
    res.status(201).json({ success: true, data: nuevaPregunta });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "error al crear user" });
  }
});


// Endpoint /respuestas
// index.ts o tu archivo de rutas
app.get("/respuestas", async (_req, res) => {
  try {
    const respuestas = await getAllRespuestas(); // Esto ahora recibe directamente el array
    
    // Respuesta exitosa incluso si el array está vacío
    res.status(200).json({ 
      success: true, 
      data: respuestas,
      count: respuestas.length
    });
    
  } catch (error) {
    console.error("Error en GET /respuestas:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error al obtener las respuestas",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

 //id_user, claves_resp, crl, trl, team, brl, frl, iprl, fecha

app.post("/respuestas", express.json(), async (req, res) => {
  try {
    const { id_user, claves_resp, crl, trl, team, brl, frl, iprl } = req.body;

    // Validación corregida que permite 0 pero no undefined/null
    if (
      id_user === undefined || id_user === null ||
      claves_resp === undefined || claves_resp === null ||
      crl === undefined || crl === null ||
      trl === undefined || trl === null ||
      team === undefined || team === null ||
      brl === undefined || brl === null ||
      frl === undefined || frl === null ||
      iprl === undefined || iprl === null
    ) {
      return res.status(400).json({ 
        success: false, 
        message: "Faltan campos requeridos (se permiten ceros)" 
      });
    }

    const nuevaresp = await createRespuesta(
      id_user, 
      claves_resp, 
      crl, 
      trl, 
      team, 
      brl, 
      frl, 
      iprl
    );
    
    res.status(201).json({ success: true, data: nuevaresp });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Error al crear respuesta" });
  }
});

// Endpoint /preguntas
// GET todas las preguntas
app.get("/preguntas", async (req, res) => {
  try {
    const preguntas = await getAllPreguntas();
    res.json({ success: true, data: preguntas });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Error al obtener preguntas" });
  }
});

// GET una pregunta específica
app.get("/preguntas/:id", async (req, res) => {
  try {
    const pregunta = await getPreguntaById(parseInt(req.params.id));
    if (!pregunta) {
      return res.status(404).json({ success: false, message: "Pregunta no encontrada" });
    }
    res.json({ success: true, data: pregunta });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Error al obtener la pregunta" });
  }
});

// POST crear nueva pregunta
app.post("/preguntas", express.json(), async (req, res) => {
  try {
    const { texto, categoria, nivel } = req.body;
    if (!texto || !categoria || nivel === undefined) {
      return res.status(400).json({ 
        success: false, 
        message: "Faltan campos requeridos" 
      });
    }
    const nuevaPregunta = await createPregunta(texto, categoria, nivel);
    res.status(201).json({ success: true, data: nuevaPregunta });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Error al crear pregunta" });
  }
});

// PUT actualizar pregunta
app.put("/preguntas/:id", express.json(), async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { texto, categoria, nivel } = req.body;
    
    // Validación de campos requeridos
    if (!texto || nivel === undefined || categoria === undefined) {
      return res.status(400).json({ 
        success: false, 
        message: "Faltan campos requeridos: texto, categoria y nivel" 
      });
    }

    // Validación de tipos
    if (typeof categoria !== 'number' || !Number.isInteger(categoria)) {
      return res.status(400).json({ 
        success: false, 
        message: "El campo 'categoria' debe ser un número entero" 
      });
    }

    if (typeof nivel !== 'number' || !Number.isInteger(nivel)) {
      return res.status(400).json({ 
        success: false, 
        message: "El campo 'nivel' debe ser un número entero" 
      });
    }

    // Validación adicional para valores positivos (opcional)
    if (categoria < 0 || nivel < 0) {
      return res.status(400).json({ 
        success: false, 
        message: "Los valores de categoría y nivel deben ser positivos" 
      });
    }

    const preguntaActualizada = await updatePregunta(id, texto, categoria, nivel);
    
    if (!preguntaActualizada) {
      return res.status(404).json({ 
        success: false, 
        message: "Pregunta no encontrada" 
      });
    }
    
    res.json({ 
      success: true, 
      data: preguntaActualizada,
      message: "Pregunta actualizada correctamente" 
    });
    
  } catch (error) {
    console.error("Error al actualizar pregunta:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error interno al actualizar la pregunta",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// DELETE eliminar pregunta
app.delete("/preguntas/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const preguntaEliminada = await deletePregunta(id);
    
    if (!preguntaEliminada) {
      return res.status(404).json({ success: false, message: "Pregunta no encontrada" });
    }
    res.json({ success: true, data: preguntaEliminada });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Error al eliminar pregunta" });
  }
});


// Endpoint /alternativas
app.get("/alternativas", async (_req, res) => {
  try {
    const categorias = await getAllAlternativas(); // Usando la función importada
    if (categorias.length === 0) {
      return res.status(404).send("No hay alternativas en la base de datos");
    }
    res.json({ success: true, data: categorias });
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    res.status(500).send("Error al conectar con la base de datos");
  }
});

// Endpoint GET /alternativas/:id - Obtener alternativa por ID
app.get("/alternativas/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const alternativa = await getAlternativaById(id);
    
    if (!alternativa) {
      return res.status(404).json({ 
        success: false, 
        message: "Alternativa no encontrada" 
      });
    }
    
    res.json({ success: true, data: alternativa });
  } catch (error) {
    console.error("Error al obtener alternativa:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error al conectar con la base de datos" 
    });
  }
});

// Endpoint GET /alternativas/pregunta/:id_pregunta - Obtener alternativas por pregunta
app.get("/alternativas/pregunta/:id_pregunta", async (req, res) => {
  try {
    const id_pregunta = parseInt(req.params.id_pregunta);
    const alternativas = await getAlternativasByPregunta(id_pregunta);
    
    if (alternativas.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: "No se encontraron alternativas para esta pregunta" 
      });
    }
    
    res.json({ success: true, data: alternativas });
  } catch (error) {
    console.error("Error al obtener alternativas por pregunta:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error al conectar con la base de datos" 
    });
  }
});

// Endpoint POST /alternativas - Crear nueva alternativa
app.post("/alternativas", express.json(), async (req, res) => {
  try {
    const { texto, id_pregunta } = req.body;
    if (!texto || !id_pregunta === undefined) {
      return res.status(400).json({ 
        success: false, 
        message: "Faltan campos requeridos" 
      });
    }
    const nuevaalternativa = await createAlternativa(texto, id_pregunta);
    res.status(201).json({ success: true, data: nuevaalternativa });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Error al crear ALTERNATIVA" });
  }
});

// Endpoint PUT /alternativas/:id - Actualizar alternativa
app.put("/alternativas/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { texto, id_pregunta } = req.body;
    
    if (!texto || !id_pregunta) {
      return res.status(400).json({ 
        success: false, 
        message: "Texto e id_pregunta son campos requeridos" 
      });
    }
    
    const alternativaActualizada = await updateAlternativa(id, texto, id_pregunta);
    
    if (!alternativaActualizada) {
      return res.status(404).json({ 
        success: false, 
        message: "Alternativa no encontrada" 
      });
    }
    
    res.json({ success: true, data: alternativaActualizada });
  } catch (error) {
    console.error("Error al actualizar alternativa:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error al actualizar la alternativa" 
    });
  }
});

// Endpoint DELETE /alternativas/:id - Eliminar alternativa
app.delete("/alternativas/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const alternativaEliminada = await deleteAlternativa(id);
    
    if (!alternativaEliminada) {
      return res.status(404).json({ 
        success: false, 
        message: "Alternativa no encontrada" 
      });
    }
    
    res.json({ 
      success: true, 
      message: "Alternativa eliminada correctamente",
      data: alternativaEliminada 
    });
  } catch (error) {
    console.error("Error al eliminar alternativa:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error al eliminar la alternativa" 
    });
  }
});

// Iniciar el servidor con Bun
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT} (usando Bun)`);
});