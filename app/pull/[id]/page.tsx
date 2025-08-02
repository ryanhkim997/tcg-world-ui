"use client"

import React, { useState } from "react"
import { PackOpener, HexButton } from "@/components/ui/pull"
import { useParams } from "next/navigation"
import HeroDivider from "@/public/assets/pull/hero-divider.svg"
import Lottie from "lottie-react"
import pullPageLottie from "@/animations/pull-page-lottie.json"
import { usePullCard } from "@/lib/hooks/use-pull"
import { Card } from "@/types/card"
import Image from "next/image"
import { SectionDivider } from "@/components/ui/section-divider"
import { PackListCard } from "@/components/ui/cards/pack-list-card"
import { PacksGrid } from "@/components/ui/grids"
import { usePackById } from "@/lib/hooks/use-pack-by-id"

export default function PullPage() {
  const { id } = useParams()
  const [showOpener, setShowOpener] = useState(false)
  const [pulledCard, setPulledCard] = useState<Card | null>(null)

  const { data: pack, isLoading, error } = usePackById(id as string)

  const { mutate, isPending } = usePullCard({
    onSuccess: (data) => {
      setPulledCard(data.pulledCard)
      setShowOpener(true)
    },
    onError: (error) => {
      console.error("Pull failed:", error)
    },
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
              onClick={() =>
                mutate({
                  userId: "demo",
                  packId: pack.id,
                  clientSeed: "demo-seed",
                  nonce: Date.now(),
                })
              }
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
