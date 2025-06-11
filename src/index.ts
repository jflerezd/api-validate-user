import express from "express";
import dotenv from "dotenv";
import { authMiddleware } from "./middleware/authMiddleware";
import { validateUserRouter } from "./routes/validateUser";

// Cargar variables de entorno
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware global
app.use(express.json());

// Middleware de autenticación para todas las rutas de la API
app.use("/api", authMiddleware);

// Rutas
app.use("/api/v1", validateUserRouter);

// Ruta de salud básica (sin autenticación)
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    message: "API funcionando correctamente",
  });
});

// Manejo de rutas no encontradas
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Endpoint no encontrado",
    message: `La ruta ${req.originalUrl} no existe`,
  });
});

// Manejo global de errores
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Error:", err.message);
    res.status(500).json({
      error: "Error interno del servidor",
      message:
        process.env.NODE_ENV === "development" ? err.message : "Algo salió mal",
    });
  }
);

app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
  console.log(
    `📊 Endpoint principal: http://localhost:${port}/api/v1/validate-user?rut=233555`
  );
  console.log(`💚 Health check: http://localhost:${port}/health`);
});
