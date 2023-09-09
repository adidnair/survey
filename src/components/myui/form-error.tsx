import { cn } from "@/lib/utils"

export const FormError = ({text, className} : {text:string, className?: string}) => {
  return <p className={cn("text-sm text-destructive font-medium", className)}>{text}</p>
}

