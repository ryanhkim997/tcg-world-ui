"use client"

import React, { useState } from "react"
import { PackOpener, HexButton } from "@/components/ui/pull"
import { useParams } from "next/navigation"
import HeroDivider from "@/public/assets/pull/hero-divider.svg"
import Lottie from "lottie-react"
import pullPageLottie from "@/animations/pull-page-lottie.json"
import { pull } from "@/lib/api/pull"
import { Card } from "@/types/card"
import Image from "next/image"
import { SectionDivider } from "@/components/ui/section-divider"
import { PackListCard } from "@/components/ui/cards/pack-list-card"
import { PacksGrid } from "@/components/ui/grids"
import { useQuery } from "@tanstack/react-query"
import { findPackById } from "@/lib/api/packs"

const mockPackData = {
  id: 1,
  featuredCards: [
    {
      id: 4637116,
      name: "Cynthia's Ambition #GG60 Pokemon Crown Zenith",
      weight: 20,
      price: 13.73,
      probability: 20,
    },
    {
      id: 961514,
      name: "Lillie (Full Art) - SM - Ultra Prism (SM05)",
      weight: 0.1,
      price: 444.0,
      probability: 0.1,
    },
    {
      id: 7800279,
      name: "Lisia's Appeal - #246 - SV08: Surging Sparks (SV08)",
      weight: 1,
      price: 62.83,
      probability: 1,
    },
  ],
  name: "Trainer's Paradise",
  price: 20,
  cards: [
    {
      id: 961514,
      name: "Lillie (Full Art) - SM - Ultra Prism (SM05)",
      weight: 0.1,
      price: 444.0,
      probability: 0.1,
    },
    {
      id: 2572271,
      name: "Misty's Favor (Full Art) - SM - Unified Minds (SM11)",
      weight: 0.25,
      price: 299.99,
      probability: 0.25,
    },
    {
      id: 7800279,
      name: "Lisia's Appeal - #246 - SV08: Surging Sparks (SV08)",
      weight: 1,
      price: 62.83,
      probability: 1,
    },
    {
      id: 2336171,
      name: "Marnie (Secret) - SWSH01: Sword & Shield Base Set (SWSH01)",
      weight: 5,
      price: 16.04,
      probability: 5,
    },
    {
      id: 4637116,
      name: "Cynthia's Ambition #GG60 Pokemon Crown Zenith",
      weight: 20,
      price: 13.73,
      probability: 20,
    },
    {
      id: 7800267,
      name: "Lisia's Appeal - 234/191 - SV08: Surging Sparks (SV08)",
      weight: 5,
      price: 7.29,
      probability: 5,
    },
    {
      id: 8244579,
      name: "Eri - SV: Prismatic Evolutions (PRE)",
      weight: 4,
      price: 5.46,
      probability: 4,
    },
    {
      id: 7800265,
      name: "Drayton - 232/191 - SV08: Surging Sparks (SV08)",
      weight: 7,
      price: 3.05,
      probability: 7,
    },
    {
      id: 8244585,
      name: "Raifort - SV: Prismatic Evolutions (PRE)",
      weight: 20,
      price: 1.77,
      probability: 20,
    },
    {
      id: 8321670,
      name: "Carmine (Poke Ball Pattern) - SV: Prismatic Evolutions (PRE)",
      weight: 15,
      price: 0.86,
      probability: 15,
    },
    {
      id: 7418617,
      name: "Briar - 132/142 - SV07: Stellar Crown (SV07)",
      weight: 14,
      price: 0.09,
      probability: 14,
    },
    {
      id: 5809542,
      name: "Erika's Invitation - #160 - SV: Scarlet & Violet 151",
      weight: 9.65,
      price: 0.06,
      probability: 9.65,
    },
  ],
}

export default function PullPage() {
  const { id } = useParams()
  const [showOpener, setShowOpener] = useState(false)
  const [pulledCard, setPulledCard] = useState<Card | null>(null)

  const {
    data: pack,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["packs", id], // page number as param
    queryFn: () => findPackById(id as string),
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="flex w-full flex-col items-center">
      <div className="relative flex w-full flex-col">
        <div className="flex w-full flex-col items-center">
          <h1 className="text-2xl font-bold">{pack.name}</h1>
          <HeroDivider />
          <div className="relative w-full overflow-hidden rounded-xl">
            <Lottie
              animationData={pullPageLottie}
              loop={false}
              autoplay={true}
            />
            {/* Featured cards overlay */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-64 -translate-x-1/2 -translate-y-1/2 sm:w-80 md:w-96 lg:w-[28rem]">
              {/* Background Left Card */}
              <div className="absolute left-[25%] top-1/2 z-10 w-[35%] -translate-x-1/2 -translate-y-1/2 transform">
                <Image
                  src={pack.featuredCards[0].imageUrl}
                  alt={pack.featuredCards[0].cardName}
                  width={300}
                  height={420}
                  className="h-auto w-full rounded-md"
                />
              </div>
              {/* Background Right Card */}
              <div className="absolute left-[75%] top-1/2 z-10 w-[35%] -translate-x-1/2 -translate-y-1/2 transform">
                <Image
                  src={pack.featuredCards[2].imageUrl}
                  alt={pack.featuredCards[2].cardName}
                  width={300}
                  height={420}
                  className="h-auto w-full rounded-md"
                />
              </div>
              {/* Center Card */}
              <div className="absolute left-1/2 top-1/2 z-20 w-2/5 -translate-x-1/2 -translate-y-1/2 transform shadow-[0px_0px_31px_0px_rgba(0,0,0,0.90)]">
                <Image
                  src={pack.featuredCards[1].imageUrl}
                  alt={pack.featuredCards[1].cardName}
                  width={300}
                  height={420}
                  className="h-auto w-full rounded-md"
                />
              </div>
            </div>
          </div>
          <div className="flex w-full items-center justify-center">
            <HexButton
              color="#8B68FB"
              onClick={async () => {
                // trigger pull API then show modal
                try {
                  const result = await pull({
                    userId: "demo",
                    packId: pack.id,
                    clientSeed: "demo-seed",
                    nonce: Date.now(),
                  })
                  setPulledCard(result.pulledCard)
                  setShowOpener(true)
                } catch (e) {
                  console.error("pull failed", e)
                }
              }}
            >
              <div className="flex items-center gap-3">
                <p className="whitespace-nowrap">Open pack</p>
                <div className="flex items-center gap-1">
                  <Image
                    src={`https://tcg-world-assets.s3.us-west-1.amazonaws.com/misc-assets/gem.png`}
                    alt="gem"
                    width={14}
                    height={14}
                  />
                  <p>{pack.price}</p>
                </div>
              </div>
            </HexButton>
            <HexButton color="#7A7A7A">Demo</HexButton>
          </div>
          {showOpener && (
            <div className="absolute z-20 flex h-full w-full items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
              <div className="flex h-full max-w-[1280px] items-center justify-center px-20">
                <PackOpener
                  pack={pack}
                  cardWidth={200}
                  pulledCard={pulledCard}
                  setShowOpener={setShowOpener}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex w-full max-w-[1280px] flex-col gap-4 px-20 pt-10">
        <SectionDivider />
        <h2 className="font-header text-xl font-bold">In this pack:</h2>
        <PacksGrid className="gap-2">
          {pack.cards.map((card: Card, idx: number) => (
            <PackListCard key={`${card.id}-${idx}`} card={card} />
          ))}
        </PacksGrid>
      </div>
    </div>
  )
}
