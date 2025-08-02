"use client"

import React, { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion, useAnimation } from "framer-motion"
import { Pack } from "@/types/pack"
import { Card } from "@/types/card"
import Selector from "@/public/assets/pull/selector.svg"
import { PullListCard } from "../cards/pull-list-card"
import { HexButton } from "./hex-button"
import { usePullCard } from "@/lib/hooks/use-pull"

function getRepeatedCards(cards: Card[], repeat: number) {
  return Array(repeat).fill(cards).flat()
}

export function PackOpener({
  pack,
  cardWidth,
  gapPx = 2,
  pulledCard,
  setShowOpener,
}: {
  pack: Pack
  cardWidth: number
  gapPx?: number
  pulledCard?: Card | null
  setShowOpener: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const { cards } = pack
  const containerRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const [initialX, setInitialX] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)
  const [resultCard, setResultCard] = useState<Card | null>(null)
  const [repeatCount, setRepeatCount] = useState(20)
  // index in repeatedCards that is currently centred
  const [currentIndex, setCurrentIndex] = useState(0)

  // Use the pull card mutation hook
  const { mutate: pullCard } = usePullCard({
    onSuccess: (data) => {
      spin(data.pulledCard)
    },
    onError: (error) => {
      console.error("Pull failed:", error)
    },
  })

  // Pixel distance from container left edge to selector center
  const centerOffset = React.useMemo(
    () => containerWidth / 2 - cardWidth / 2,
    [containerWidth, cardWidth]
  )

  const repeatedCards = React.useMemo(
    () => getRepeatedCards(cards, repeatCount),
    [cards]
  )
  const middleIndex = React.useMemo(
    () => Math.floor(repeatedCards.length / 2),
    [repeatedCards]
  )

  // Update containerWidth on mount and window resize
  useEffect(() => {
    function updateWidth() {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth)
      }
    }
    updateWidth()
    window.addEventListener("resize", updateWidth)
    return () => window.removeEventListener("resize", updateWidth)
  }, [])

  // Reset animation when pack changes
  useEffect(() => {
    if (containerWidth > 0) {
      const slotWidth = cardWidth + gapPx
      const startOffset = -(middleIndex * slotWidth - centerOffset)
      setInitialX(startOffset)
      setCurrentIndex(middleIndex)
      controls.set({ x: startOffset })
    }
  }, [pack.id, containerWidth])

  useEffect(() => {
    if (containerWidth) {
      const slotWidth = cardWidth + gapPx
      const startOffset = -(middleIndex * slotWidth - centerOffset)
      setInitialX(startOffset)
      setCurrentIndex(middleIndex)
      controls.set({ x: startOffset })
    }
  }, [containerWidth, cardWidth, gapPx, centerOffset, repeatedCards, controls])

  useEffect(() => {
    if (pulledCard && containerWidth > 0) {
      spin(pulledCard)
    }
  }, [pulledCard, containerWidth])

  const spin = async (target: Card) => {
    const loopsAhead = 3 // a few full cycles for effect
    const cardsPerSet = cards.length
    setRepeatCount(repeatCount + 10)

    // Reset the result card while spinning
    setResultCard(null)

    // Calculate the target position in the current set of cards
    const targetPosInSet = cards.findIndex((c) => c.id === target.id)

    // Calculate the absolute stop index in the repeated cards array
    const stopIndex =
      Math.floor(currentIndex / cardsPerSet) * cardsPerSet +
      loopsAhead * cardsPerSet +
      targetPosInSet

    const slotWidth = cardWidth + gapPx
    const offset = stopIndex * slotWidth - centerOffset
    const finalX = Math.round(-offset)

    // Reset animation to current position before starting
    const currentX = -currentIndex * slotWidth + centerOffset
    controls.set({ x: currentX })

    // Animate to the new position
    await controls.start({ x: finalX }, {
      type: "spring",
      stiffness: 70,
      damping: 50,
      bounce: 0,
      overshootClamping: true,
      restDelta: 0.1,
    } as any)

    // Update the current index and set the result card
    setCurrentIndex(stopIndex)
    setResultCard(target)
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6">
      <Selector />
      <div ref={containerRef} className="relative w-full overflow-hidden">
        {/* Gradient overlays */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-36 bg-gradient-to-r from-black to-black/0" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-36 bg-gradient-to-l from-black to-black/0" />

        <motion.div
          className="flex"
          animate={controls}
          initial={{ x: initialX }}
          style={{ columnGap: gapPx, willChange: "transform" }}
        >
          {repeatedCards.map((card, idx) => (
            <div key={idx} className="flex-none" style={{ width: cardWidth }}>
              <PullListCard card={card} />
            </div>
          ))}
        </motion.div>
      </div>
      {resultCard ? (
        <div className="flex flex-col items-center gap-2">
          <span className="text-md">{resultCard.cardName}</span>
          <div className="flex items-center justify-center gap-1">
            <Image
              src={`https://tcg-world-assets.s3.us-west-1.amazonaws.com/misc-assets/gem.png`}
              alt="gem"
              width={14}
              height={14}
            />
            <span className="text-md">{resultCard.currentPriceInGems}</span>
          </div>
        </div>
      ) : (
        <Selector className="rotate-180" />
      )}
      {resultCard ? (
        <div className="flex w-full justify-center gap-2">
          <HexButton color="#7A7A7A" onClick={() => setShowOpener(false)}>
            Close
          </HexButton>
          <HexButton
            color="#8B68FB"
            onClick={() => {
              pullCard({
                userId: "demo",
                packId: String(pack.id),
                clientSeed: "demo-seed",
                nonce: Date.now(),
              })
            }}
          >
            <div className="flex items-center justify-center gap-1">
              <span>Open again </span>
              <Image
                src={`https://tcg-world-assets.s3.us-west-1.amazonaws.com/misc-assets/gem.png`}
                alt="gem"
                width={14}
                height={14}
              />
              <span className="text-md">{pack.price}</span>
            </div>
          </HexButton>
          <HexButton color="#7A7A7A">
            <div className="flex items-center justify-center gap-1">
              <span>Sell for </span>
              <Image
                src={`https://tcg-world-assets.s3.us-west-1.amazonaws.com/misc-assets/gem.png`}
                alt="gem"
                width={14}
                height={14}
              />
              <span className="text-md">{resultCard?.currentPriceInGems}</span>
            </div>
          </HexButton>
        </div>
      ) : (
        <HexButton color="#7A7A7A">Skip</HexButton>
      )}
    </div>
  )
}
