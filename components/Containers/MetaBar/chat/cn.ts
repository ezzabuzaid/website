import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs));
};
