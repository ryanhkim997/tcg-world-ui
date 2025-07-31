import Image from "next/image"
import { Card } from "@/types/card"

export const PullListCard = ({ card }: { card: Card }) => {
  return (
    <div className="flex w-full flex-col bg-blue-700">
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
