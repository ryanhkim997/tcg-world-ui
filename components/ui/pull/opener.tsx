"use client"

import React, { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion, useAnimation } from "framer-motion"
import { Pack } from "@/types/pack"

const cardWidth = 100
const gapWidth = 16 // from gap-x-4
const cardWidthWithGap = cardWidth + gapWidth
const repeatCount = 20

function getRepeatedCards(
  cards: { id: number; name: string; weight: number }[],
  repeat: number
) {
  return Array(repeat).fill(cards).flat()
}

export function PackOpener({ pack }: { pack: Pack }) {
  const { cards } = pack
  const containerRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const [containerWidth, setContainerWidth] = useState(0)
  const [visibleCards, setVisibleCards] = useState(3) // default fallback
  const [resultCard, setResultCard] = useState<{
    id: number
    name: string
    weight: number
  } | null>(null)

  const repeatedCards = React.useMemo(
    () => getRepeatedCards(cards, repeatCount),
    []
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

  // Update visibleCards when containerWidth changes
  useEffect(() => {
    if (containerWidth) {
      setVisibleCards(Math.floor(containerWidth / cardWidthWithGap))
    }
  }, [containerWidth])

  // Calculate center offset for animation
  const centerOffset = ((visibleCards - 1) / 2) * cardWidthWithGap

  function getStopIndex(
    repeatedCards: { id: number; name: string; weight: number }[],
    resultCard: { id: number; name: string; weight: number }
  ) {
    const middle = Math.floor(repeatedCards.length / 2)
    let closestIndex = middle
    let minDistance = repeatedCards.length

    for (let i = 0; i < repeatedCards.length; i++) {
      if (repeatedCards[i].id === resultCard.id) {
        const distance = Math.abs(i - middle)
        if (distance < minDistance) {
          minDistance = distance
          closestIndex = i
        }
      }
    }
    return closestIndex
  }

  const spin = () => {
    const result = deterministicResult()
    setResultCard(result)

    const stopIndex = getStopIndex(repeatedCards, result)
    const offset = stopIndex * cardWidthWithGap - centerOffset

    controls.start({
      x: -offset,
      transition: {
        duration: 3,
        ease: [0.22, 1, 0.36, 1],
      },
    })
  }

  function deterministicResult() {
    const total = cards.reduce(
      (sum: number, card: { weight: number }) => sum + card.weight,
      0
    )
    let rnd = Math.random() * total
    for (let i = 0; i < cards.length; i++) {
      if (rnd < cards[i].weight) return cards[i]
      rnd -= cards[i].weight
    }
    return cards[0]
  }

  return (
    <div className="flex h-full w-full flex-col items-center">
      <div
        ref={containerRef}
        className="relative w-full max-w-full overflow-hidden"
      >
        <motion.div
          className="flex gap-x-4"
          animate={controls}
          initial={{ x: 0 }}
          style={{ willChange: "transform" }}
        >
          {repeatedCards.map((card, idx) => (
            <Image
              key={idx}
              src={`https://tcg-world-assets.s3.us-west-1.amazonaws.com/card-assets/${card.id}.png`}
              alt={card.name}
              width={cardWidth}
              height={150}
              className="object-contain"
            />
          ))}
        </motion.div>
      </div>
      <button
        onClick={spin}
        className="mt-6 rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
      >
        Spin
      </button>
      {resultCard && (
        <div className="mt-4 text-xl font-bold text-green-600">
          You got: {resultCard.name}
        </div>
      )}
    </div>
  )
}
