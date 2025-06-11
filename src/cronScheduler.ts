import cron from "node-cron";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
// Configura la URL base y la API key
const API_BASE_URL = "https://api-validate-user.onrender.com/api/v1";
const API_KEY = process.env.API_KEY;

// Función para invocar la API
const callApi = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/validate-user?rut=12345678-9`,
      {
        headers: {
          apiKey: API_KEY,
        },
      }
    );
    console.log("Respuesta de la API:", response.data);
  } catch (error) {
    console.error("Error al invocar la API:", error);
  }
};

// Programa la tarea para que se ejecute cada 2 minutos
cron.schedule("*/1 * * * *", () => {
  console.log("Ejecutando tarea programada:", new Date().toISOString());
  callApi();
});

// Opcional: Llama a la API al iniciar
callApi();
