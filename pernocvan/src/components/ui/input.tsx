import * as React from "react"
import { cn } from "../../lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
            "flex h-14 w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 ...", // <- Asegúrate que el fondo aquí sea slate-50
            className
            )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }