import { Hero } from "@/components/ui/hero"
import { SectionDivider } from "@/components/ui/section-divider"
import { PacksGrid } from "@/components/ui/grids"
import { PackDisplay } from "@/components/ui/pack-display"

const mockPacks = [
  {
    id: 1,
    featuredCards: [
      {
        id: 4637116,
        name: "Cynthia's Ambition #GG60 Pokemon Crown Zenith",
        weight: 20,
      },
      {
        id: 961514,
        name: "Lillie (Full Art) - SM - Ultra Prism (SM05)",
        weight: 0.1,
      },
      {
        id: 7800279,
        name: "Lisia's Appeal - #246 - SV08: Surging Sparks (SV08)",
        weight: 1,
      },
    ],
    name: "Trainer's Paradise",
    price: 20,
    portalType: "green",
    cards: [
      {
        id: 961514,
        name: "Lillie (Full Art) - SM - Ultra Prism (SM05)",
        weight: 0.1,
      },
      {
        id: 2572271,
        name: "Misty's Favor (Full Art) - SM - Unified Minds (SM11)",
        weight: 0.25,
      },
      {
        id: 7800279,
        name: "Lisia's Appeal - #246 - SV08: Surging Sparks (SV08)",
        weight: 1,
      },
      {
        id: 2336171,
        name: "Marnie (Secret) - SWSH01: Sword & Shield Base Set (SWSH01)",
        weight: 5,
      },
      {
        id: 4637116,
        name: "Cynthia's Ambition #GG60 Pokemon Crown Zenith",
        weight: 20,
      },
      {
        id: 7800267,
        name: "Lisia's Appeal - 234/191 - SV08: Surging Sparks (SV08)",
        weight: 5,
      },
      { id: 8244579, name: "Eri - SV: Prismatic Evolutions (PRE)", weight: 4 },
      {
        id: 7800265,
        name: "Drayton - 232/191 - SV08: Surging Sparks (SV08)",
        weight: 7,
      },
      {
        id: 8244585,
        name: "Raifort - SV: Prismatic Evolutions (PRE)",
        weight: 20,
      },
      {
        id: 8321670,
        name: "Carmine (Poke Ball Pattern) - SV: Prismatic Evolutions (PRE)",
        weight: 15,
      },
      {
        id: 7418617,
        name: "Briar - 132/142 - SV07: Stellar Crown (SV07)",
        weight: 14,
      },
      {
        id: 5809542,
        name: "Erika's Invitation - #160 - SV: Scarlet & Violet 151",
        weight: 9.65,
      },
    ],
  },
]

// trigger deploy 2

export default function Home() {
  return (
    <div className="flex w-full flex-col gap-4">
      <Hero>Welcome to TCG World</Hero>
      <SectionDivider />
      <div className="flex w-full">
        <h2 className="text-xl font-bold">Open Packs</h2>
      </div>
      <PacksGrid>
        <PackDisplay pack={mockPacks[0]} />
        <PackDisplay pack={mockPacks[0]} />
        <PackDisplay pack={mockPacks[0]} />
        <PackDisplay pack={mockPacks[0]} />
        <PackDisplay pack={mockPacks[0]} />
        <PackDisplay pack={mockPacks[0]} />
      </PacksGrid>
    </div>
  )
}
