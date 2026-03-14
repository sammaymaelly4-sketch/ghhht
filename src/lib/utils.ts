import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fmtFull(n: number | null | undefined): string {
  if (n === null || n === undefined) return "—";
  if (n >= 1e6) return (n / 1e6).toFixed(2).replace(".", ",") + "M";
  if (n >= 1000) return n.toLocaleString("pt-BR");
  return n.toString();
}

export function fmtM(n: number | null | undefined): string {
  if (!n) return "—";
  return (n / 1e6).toFixed(1).replace(".", ",") + "M";
}
