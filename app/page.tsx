import { Hero } from "@/components/ui/hero"
import { SectionDivider } from "@/components/ui/section-divider"

export default function Home() {
  return (
    <div className="flex w-full flex-col gap-4">
      <Hero>Welcome to TCG World</Hero>
      <SectionDivider />
    </div>
  )
}
