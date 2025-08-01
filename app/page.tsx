import { Hero } from "@/components/ui/hero"
import { SectionDivider } from "@/components/ui/section-divider"
import { PacksGrid } from "@/components/ui/grids"
import { PackDisplay } from "@/components/ui/pack-display"
import { findPacks } from "@/lib/api/packs"
import { Pack } from "@/types/pack"

export default async function Home() {
  const { data: packs } = await findPacks({ page: 1, limit: 10 })

  return (
    <div className="flex w-full flex-col gap-4">
      <Hero>Welcome to TCG World</Hero>
      <SectionDivider />
      <div className="flex w-full">
        <h2 className="text-xl font-bold">Open Packs</h2>
      </div>
      <PacksGrid>
        {packs.map((pack: Pack) => (
          <PackDisplay key={pack.id} pack={pack} />
        ))}
      </PacksGrid>
    </div>
  )
}
