import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// utils/rut.ts
export const cleanRut = (rut: string): string =>
  rut.replace(/[.\s]/g, "").replace(/-/g, "").toUpperCase();

export const splitRut = (rut: string): { body: string; dv: string } => {
  const c = cleanRut(rut);
  const body = c.slice(0, -1);
  const dv = c.slice(-1);
  return { body, dv };
};

export const computeDV = (body: string): string => {
  // Algoritmo módulo 11
  let sum = 0;
  let multiplier = 2;

  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i], 10) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }

  const rest = 11 - (sum % 11);
  if (rest === 11) return "0";
  if (rest === 10) return "K";
  return String(rest);
};

export const validateRut = (rut: string): boolean => {
  const { body, dv } = splitRut(rut);
  if (!/^\d+$/.test(body) || body.length === 0) return false;
  const expected = computeDV(body);
  return dv === expected;
};

export const formatRut = (rut: string): string => {
  const { body, dv } = splitRut(rut);
  if (!body) return dv || "";
  // agrega puntos cada 3 desde la derecha
  const rev = body.split("").reverse();
  const withDots: string[] = [];
  for (let i = 0; i < rev.length; i++) {
    if (i > 0 && i % 3 === 0) withDots.push(".");
    withDots.push(rev[i]);
  }
  const bodyFormatted = withDots.reverse().join("");
  return dv ? `${bodyFormatted}-${dv}` : bodyFormatted;
};
