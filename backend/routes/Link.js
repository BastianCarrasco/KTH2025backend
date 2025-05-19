import { insertProyectoAcademico, getProyectoAcademico } from "../queries/link";

<template>
  <div class="projects">
    <h1>Conectar Proyectos con Académicos</h1>
    
    <div class="selection-container">
      <div class="select-group">
        <h2>Proyectos</h2>
        <select v-model="selectedProyecto" class="form-select">
          <option disabled value="">Seleccione un proyecto</option>
          <option 
            v-for="proyecto in proyectos" 
            :key="proyecto.id_proyecto" 
            :value="proyecto.id_proyecto"
          >
            {{ proyecto.nombre }} ({{ proyecto.id_proyecto }})
          </option>
        </select>
      </div>

      <div class="select-group">
        <h2>Académicos</h2>
        <select v-model="selectedAcademico" class="form-select">
          <option disabled value="">Seleccione un académico</option>
          <option 
            v-for="academico in academicos" 
            :key="academico.id_academico" 
            :value="academico.id_academico"
          >
            {{ academico.nombre }} {{ academico.apellido }} ({{ academico.id_academico }})
          </option>
        </select>
      </div>

      <div class="checkbox-group">
        <label>
          <input type="checkbox" v-model="esJefe"> ¿Es jefe de proyecto?
        </label>
      </div>

      <button 
        @click="crearConexion" 
        :disabled="!selectedProyecto || !selectedAcademico"
        class="submit-btn"
      >
        Crear Conexión
      </button>
    </div>

    <div v-if="message" class="message" :class="{ success: isSuccess, error: !isSuccess }">
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectsView',
  data() {
    return {
      proyectos: [],
      academicos: [],
      selectedProyecto: '',
      selectedAcademico: '',
      esJefe: false,
      message: '',
      isSuccess: false
    }
  },
  async created() {
    await this.cargarDatos();
  },
  methods: {
    async cargarDatos() {
      try {
        // Obtener datos de proyectos
        const proyectosResponse = await fetch('https://kth2025backend-production.up.railway.app/proyectos');
        const proyectosData = await proyectosResponse.json();
        this.proyectos = proyectosData.data;

        // Obtener datos de académicos
        const academicosResponse = await fetch('https://kth2025backend-production.up.railway.app/academicos');
        const academicosData = await academicosResponse.json();
        this.academicos = academicosData.data;

      } catch (error) {
        console.error('Error al obtener los datos:', error);
        this.mostrarMensaje('Error al cargar los datos', false);
      }
    },
    async crearConexion() {
      try {
        const response = await fetch('https://kth2025backend-production.up.railway.app/proyecto-academico', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id_proyecto: this.selectedProyecto,
            id_academico: this.selectedAcademico,
            jefe: this.esJefe ? 1 : 0
          })
        });

        if (response.ok) {
          const data = await response.json();
          this.mostrarMensaje('Conexión creada exitosamente', true);
          console.log('Conexión creada:', data);
          // Limpiar selección
          this.selectedProyecto = '';
          this.selectedAcademico = '';
          this.esJefe = false;
        } else {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Error al crear la conexión');
        }
      } catch (error) {
        console.error('Error al crear la conexión:', error);
        this.mostrarMensaje(error.message, false);
      }
    },
    mostrarMensaje(msg, success) {
      this.message = msg;
      this.isSuccess = success;
      setTimeout(() => {
        this.message = '';
      }, 3000);
    }
  }
}
</script>

<style scoped>
.projects {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.selection-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;
}

.select-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-select {
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.checkbox-group {
  margin: 15px 0;
}

.checkbox-group label {
  display: flex;
  align-items: center;
  gap: 8px;
}

.submit-btn {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.submit-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.submit-btn:hover:not(:disabled) {
  background-color: #45a049;
}

.message {
  margin-top: 20px;
  padding: 10px;
  border-radius: 4px;
}

.success {
  background-color: #dff0d8;
  color: #3c763d;
}

.error {
  background-color: #f2dede;
  color: #a94442;
}
</style>


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