import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type Truthy<T> = T extends false | '' | 0 | null | undefined ? never : T;

export const truthy = <T>(value: T): value is Truthy<T> => {
  return !!value;
};
