import { Request, Response, NextFunction } from "express";
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apiKey = req.headers["apikey"] as string;
  const expectedApiKey = process.env.API_KEY;

  // Verificar si se proporcionó la API key
  if (!apiKey) {
    return res.status(401).json({
      error: "No autorizado",
      message: 'API key requerida en los headers como "apiKey"',
    });
  }

  // Verificar si la API key está configurada en el servidor
  if (!expectedApiKey) {
    console.error("API_KEY no está configurada en las variables de entorno");
    return res.status(500).json({
      error: "Error de configuración del servidor",
      message: "API key no configurada",
    });
  }

  // Validar la API key
  if (apiKey !== expectedApiKey) {
    return res.status(403).json({
      error: "Prohibido",
      message: "API key inválida",
    });
  }

  // Si la validación es exitosa, continuar con el siguiente middleware
  next();
};
