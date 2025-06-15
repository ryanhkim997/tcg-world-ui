import HeroArrows from "@/public/assets/hero/hero-arrows.svg"
import HeroLine from "@/public/assets/hero/hero-line.svg"
import { cn } from "@/lib/utils"

interface HeroProps {
  children: React.ReactNode
}

export function Hero({ children }: HeroProps) {
  return (
    <div className="flex w-full items-center">
      <HeroArrows className="flex-shrink-0" />
      <HeroLine className="flex-1" />
      <h1 className="flex-shrink-0 whitespace-nowrap font-header text-2xl font-bold">
        {children}
      </h1>
      <HeroLine className="flex-1" />
      <HeroArrows className="flex-shrink-0 rotate-180" />
    </div>
  )
}
