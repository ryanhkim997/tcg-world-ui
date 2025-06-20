import HeroArrows from "@/public/assets/hero/hero-arrows.svg"
import HeroLine from "@/public/assets/hero/hero-line.svg"

interface HeroProps {
  children: React.ReactNode
}

export function Hero({ children }: HeroProps) {
  return (
    <div className="flex w-full items-center">
      <HeroArrows className="-mr-6 flex-shrink-0" />
      <HeroLine className="-mr-3 flex-1" />
      <h1 className="flex-shrink-0 whitespace-nowrap text-2xl font-bold">
        {children}
      </h1>
      <HeroLine className="-ml-3 flex-1" />
      <HeroArrows className="-ml-6 flex-shrink-0 rotate-180" />
    </div>
  )
}
