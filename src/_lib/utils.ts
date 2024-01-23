import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// export const fetcher = (...args: any) => fetch(...args).then(res => res.json())
export const Fetcher = (url: string) => fetch(url).then((res) => res.json());
