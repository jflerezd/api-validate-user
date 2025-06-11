import { Router, Request, Response, NextFunction } from "express";
import { validateRut } from "../utils/rutValidator";

export const validateUserRouter = Router();

interface ValidateUserResponse {
  code: string;
  message: string;
  data: {
    rut: string;
    isPrime: boolean;
  };
}

/**
 * Genera un valor aleatorio para isPrime
 */
const generateRandomIsPrime = (): boolean => {
  return Math.random() >= 0.5;
};

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

validateUserRouter.get("/validate-user", (req: any, res: any) => {
  try {
    const { rut, email } = req.query;

    // Validar que al menos uno de los dos parámetros esté presente
    if (!rut && !email) {
      return res.status(400).json({
        code: "PR400",
        message: "Debe proporcionar al menos un parámetro: rut o emai",
      });
    }

    // Validar que los parámetros no sean cadenas vacías
    if ((rut && rut.trim() === "") || (email && email.trim() === "")) {
      return res.status(400).json({
        code: "PR400",
        message: "Los parámetros rut y email no pueden estar vacíos",
      });
    }

    if (rut) {
      // Limpiar el RUT (remover espacios y convertir a mayúsculas para el dígito K)
      const cleanRut = rut.trim().replace(/\./g, "");

      // Validar formato del RUT si contiene guión
      if (cleanRut.includes("-") && !validateRut(cleanRut)) {
        return res.status(400).json({
          code: "PR400",
          message: "Formato de RUT inválido",
          // data: {
          //   isPrime: generateRandomIsPrime(),
          // },
        } as ValidateUserResponse);
      }
    }

    if (email && !isValidEmail(email)) {
      return res.status(400).json({
        code: "PR400",
        message: "El formato del email no es válido",
      });
    }

    // Usuario encontrado - respuesta exitosa
    return res.status(200).json({
      code: "PR200",
      message: "Success",
      data: {
        rut,
        email,
        isPrime: generateRandomIsPrime(),
      },
    } as ValidateUserResponse);
  } catch (error) {
    console.error("Error validando usuario:", error);
    return res.status(500).json({
      code: "PR500",
      message: "Error interno del servidor",
      // data: {
      //   isPrime: generateRandomIsPrime(),
      // },
    } as ValidateUserResponse);
  }
});

validateUserRouter.get("/ping", (req: any, res: any) => {
  res.status(200).send("OK");
});
