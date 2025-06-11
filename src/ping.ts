import cron from "node-cron";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
// Configura la URL base y la API key
const API_BASE_URL = "https://api-validate-user.onrender.com/api/v1";
const API_KEY = process.env.API_KEY;

// Función para invocar la API
export const autoPing = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/ping`, {
      headers: {
        apiKey: API_KEY,
      },
    });
    console.log("Respuesta de la API:", response.data);
  } catch (error) {
    console.error("Error al invocar la API:", error);
  }
};
