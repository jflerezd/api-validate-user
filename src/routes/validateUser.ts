import { Router, Request, Response, NextFunction } from "express";
import { validateRut } from "../utils/rutValidator";

export const validateUserRouter = Router();

interface ValidateUserResponse {
  code: string;
  message: string;
  data: {
    isPrime: boolean;
  };
}

/**
 * Genera un valor aleatorio para isPrime
 */
const generateRandomIsPrime = (): boolean => {
  return Math.random() >= 0.5;
};

validateUserRouter.get("/validate-user", (req: any, res: any) => {
  try {
    const { rut } = req.query;

    // Validar que se proporcione el RUT
    if (!rut || typeof rut !== "string") {
      return res.status(400).json({
        code: "PR400",
        message: "RUT es requerido como parámetro de consulta",
        data: {
          isPrime: generateRandomIsPrime(),
        },
      } as ValidateUserResponse);
    }

    // Limpiar el RUT (remover espacios y convertir a mayúsculas para el dígito K)
    const cleanRut = rut.trim().replace(/\./g, "");

    // Validar formato del RUT si contiene guión
    if (cleanRut.includes("-") && !validateRut(cleanRut)) {
      return res.status(400).json({
        code: "PR400",
        message: "Formato de RUT inválido",
        data: {
          isPrime: generateRandomIsPrime(),
        },
      } as ValidateUserResponse);
    }

    // Usuario encontrado - respuesta exitosa
    return res.status(200).json({
      code: "PR200",
      message: "Success",
      data: {
        rut,
        isPrime: generateRandomIsPrime(),
      },
    } as ValidateUserResponse);
  } catch (error) {
    console.error("Error validando usuario:", error);
    return res.status(500).json({
      code: "PR500",
      message: "Error interno del servidor",
      data: {
        isPrime: generateRandomIsPrime(),
      },
    } as ValidateUserResponse);
  }
});
