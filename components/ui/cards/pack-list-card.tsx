import Image from "next/image"
import ContentDivider from "@/public/assets/card/content-divider.svg"
import { Card } from "@/types/card"
import { formatWeight } from "@/lib/utils"

export function PackListCard({ card }: { card: Card }) {
  return (
    <div className="flex flex-col rounded-xl bg-blue-400">
      <div className="flex flex-col items-center gap-y-4 px-4 pb-2 pt-4">
        <Image
          src={card.imageUrl}
          alt={card.cardName}
          width={116}
          height={0}
          className="h-auto w-full px-4"
        />
        <span className="max-w-full truncate text-center text-xs">
          {card.cardName}
        </span>
      </div>
      <ContentDivider className="mx-4 w-full" />
      <div className="flex w-full items-center justify-between px-2.5 py-2">
        <div className="flex items-center gap-1">
          <Image
            src={`https://tcg-world-assets.s3.us-west-1.amazonaws.com/misc-assets/gem2.png`}
            alt="gem"
            width={14}
            height={14}
          />
          <span className="text-xs font-bold">{card.currentPriceInGems}</span>
        </div>
        <span className="text-xs italic">{formatWeight(card.weight)}</span>
      </div>
    </div>
  )
}
