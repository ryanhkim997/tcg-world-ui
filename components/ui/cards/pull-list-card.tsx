import Image from "next/image"
import { Card } from "@/types/card"
import { convertSnakeToKebab } from "@/lib/utils"

export const PullListCard = ({ card }: { card: Card }) => {
  const tierImageUrl = `https://tcg-world-assets.s3.us-west-1.amazonaws.com/misc-assets/${convertSnakeToKebab(card.tier)}.png`

  return (
    <div
      className="relative flex w-full flex-col overflow-hidden"
      style={{
        backgroundImage: `url(${tierImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex w-full flex-col items-center px-4 py-3">
        <Image
          src={card.imageUrl}
          alt={card.cardName}
          width={116}
          height={0}
          className="w-full"
        />
      </div>
      <div className="flex w-full items-center justify-center gap-1 px-2.5 pb-2">
        <Image
          src={`https://tcg-world-assets.s3.us-west-1.amazonaws.com/misc-assets/gem2.png`}
          alt="gem"
          width={14}
          height={14}
        />
        <span className="text-xs font-bold">{card.currentPriceInGems}</span>
      </div>
    </div>
  )
}
