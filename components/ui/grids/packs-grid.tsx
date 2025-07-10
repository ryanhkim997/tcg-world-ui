import { cn } from "@/lib/utils"

export function PacksGrid({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={cn("grid grid-cols-6", className)}>{children}</div>
}
