"use client"

import React, { useState } from "react"
import { PackOpener } from "@/components/ui/pull/opener"
import { useParams } from "next/navigation"
import HeroDivider from "@/public/assets/pull/hero-divider.svg"
import Lottie from "lottie-react"
import pullPageLottie from "@/animations/pull-page-lottie.json"
import { HexButton } from "@/components/ui/hex-button"
import Image from "next/image"
import { SectionDivider } from "@/components/ui/section-divider"

const mockPackData = {
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
}

export default function PullPage() {
  const { id } = useParams()

  const pack = mockPackData // TODO: fetch from API
  const [showOpener, setShowOpener] = useState(false)
  return (
    <div className="flex w-full flex-col">
      <div className="relative my-6 flex w-full flex-col">
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
                  src={`https://tcg-world-assets.s3.us-west-1.amazonaws.com/card-assets/${pack.featuredCards[0].id}.png`}
                  alt={pack.featuredCards[0].name}
                  width={300}
                  height={420}
                  className="h-auto w-full rounded-md"
                />
              </div>
              {/* Background Right Card */}
              <div className="absolute left-[75%] top-1/2 z-10 w-[35%] -translate-x-1/2 -translate-y-1/2 transform">
                <Image
                  src={`https://tcg-world-assets.s3.us-west-1.amazonaws.com/card-assets/${pack.featuredCards[2].id}.png`}
                  alt={pack.featuredCards[2].name}
                  width={300}
                  height={420}
                  className="h-auto w-full rounded-md"
                />
              </div>
              {/* Center Card */}
              <div className="absolute left-1/2 top-1/2 z-20 w-2/5 -translate-x-1/2 -translate-y-1/2 transform shadow-[0px_0px_31px_0px_rgba(0,0,0,0.90)]">
                <Image
                  src={`https://tcg-world-assets.s3.us-west-1.amazonaws.com/card-assets/${pack.featuredCards[1].id}.png`}
                  alt={pack.featuredCards[1].name}
                  width={300}
                  height={420}
                  className="h-auto w-full rounded-md"
                />
              </div>
            </div>
          </div>
          <div className="flex w-full items-center justify-center">
            <HexButton color="#8B68FB" onClick={() => setShowOpener(true)}>
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
          {/* {showOpener && (
            <div className="fixed z-30 flex items-center justify-center bg-black bg-opacity-70">
              <div className="w-fullrounded-xl p-6 shadow-lg backdrop-blur-sm">
                <PackOpener pack={pack} />
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => setShowOpener(false)}
                    className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )} */}
        </div>
      </div>
      <div className="flex w-full flex-col gap-10 px-20 pt-10">
        <SectionDivider />
      </div>
    </div>
  )
}
