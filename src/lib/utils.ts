import { type ClassValue } from "clsx"
import clsx from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  // 合并 clsx 生成的类名并使用 tailwind-merge 解决冲突（如 px-2 与 px-4）
  return twMerge(clsx(inputs))
}