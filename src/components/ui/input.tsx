import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-foreground/20 dark:selection:bg-blue-500/30 selection:text-foreground dark:selection:text-white bg-white/80 dark:bg-white/5 backdrop-blur-md border-input dark:border-white/10 h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow,background-color] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-foreground dark:focus-visible:border-blue-500 focus-visible:ring-foreground/20 dark:focus-visible:ring-blue-500/50 focus-visible:ring-[3px] dark:focus-visible:bg-white/10",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        "hover:bg-white/90 dark:hover:bg-white/8",
        className
      )}
      {...props}
    />
  )
}

export { Input }
