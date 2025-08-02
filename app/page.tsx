import { Hero } from "@/components/ui/hero"
import { SectionDivider } from "@/components/ui/section-divider"
import { PacksGrid } from "@/components/ui/grids"
import { PackDisplay } from "@/components/ui/pack-display"
import { findPacks } from "@/lib/api/packs"
import { Pack } from "@/types/pack"

export default async function Home() {
  try {
    const response = await findPacks({ page: 1, limit: 10 })
    const packs = response?.data || []
    console.log(packs, response)

    return (
      <div className="flex w-full flex-col gap-4">
        <Hero>Welcome to TCG World</Hero>
        <SectionDivider />
        <div className="flex w-full">
          <h2 className="text-xl font-bold">Open Packs</h2>
        </div>
        {packs.length > 0 ? (
          <PacksGrid>
            {packs.map((pack: Pack) => (
              <PackDisplay key={pack.id} pack={pack} />
            ))}
          </PacksGrid>
        ) : (
          <div className="flex w-full justify-center py-8">
            <p className="text-muted-foreground">
              No packs available at this time. Check back soon!
            </p>
          </div>
        )}
      </div>
    )
  } catch (error) {
    console.error("Error loading packs:", error)
    return (
      <div className="flex w-full flex-col gap-4">
        <Hero>Welcome to TCG World</Hero>
        <SectionDivider />
        <div className="flex w-full justify-center py-8">
          <p className="text-muted-foreground">
            Unable to load packs. Please try again later.
          </p>
        </div>
      </div>
    )
  }
}
