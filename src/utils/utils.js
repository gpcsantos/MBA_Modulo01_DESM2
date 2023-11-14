import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// formata numero comum, para padrão Brasil
export function formaNumber(value) {
  return Intl.NumberFormat("pt-br", { sytle: "number" }).format(value);
}

//formata porcentagem
export function formaPercent(value) {
  return Intl.NumberFormat("pt-br", {
    sytle: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
