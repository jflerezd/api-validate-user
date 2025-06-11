/**
 * Valida el formato de un RUT chileno
 * @param rut - RUT a validar (formato: 12345678-9 o 12345678-k)
 * @returns true si el RUT tiene un formato válido, false en caso contrario
 */
export const validateRut = (rut: string): boolean => {
  // Remover espacios y convertir a minúsculas
  const cleanRut = rut.replace(/\s/g, "").toLowerCase();

  // Verificar formato básico (números-dígito verificador)
  const rutRegex = /^[0-9]+-[0-9kK]$/;
  if (!rutRegex.test(cleanRut)) {
    return false;
  }

  // Separar número y dígito verificador
  const [rutNumber, checkDigit] = cleanRut.split("-");

  // Verificar que el número tenga al menos 7 dígitos
  if (rutNumber.length < 7) {
    return false;
  }

  // Calcular dígito verificador
  const calculatedCheckDigit = calculateCheckDigit(rutNumber);

  // Comparar con el dígito proporcionado
  return calculatedCheckDigit === checkDigit;
};

/**
 * Calcula el dígito verificador de un RUT
 * @param rutNumber - Número del RUT sin dígito verificador
 * @returns El dígito verificador calculado
 */
const calculateCheckDigit = (rutNumber: string): string => {
  let sum = 0;
  let multiplier = 2;

  // Recorrer el RUT de derecha a izquierda
  for (let i = rutNumber.length - 1; i >= 0; i--) {
    sum += parseInt(rutNumber[i]) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }

  const remainder = sum % 11;
  const checkDigit = 11 - remainder;

  if (checkDigit === 11) {
    return "0";
  } else if (checkDigit === 10) {
    return "k";
  } else {
    return checkDigit.toString();
  }
};

/**
 * Formatea un RUT agregando puntos y guión
 * @param rut - RUT sin formato
 * @returns RUT formateado (ej: 12.345.678-9)
 */
export const formatRut = (rut: string): string => {
  const cleanRut = rut.replace(/[^\dkK]/g, "");
  const rutNumber = cleanRut.slice(0, -1);
  const checkDigit = cleanRut.slice(-1);

  // Agregar puntos cada 3 dígitos
  const formattedNumber = rutNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `${formattedNumber}-${checkDigit}`;
};
