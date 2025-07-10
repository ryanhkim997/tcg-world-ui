import Image from "next/image"
import ContentDivider from "@/public/assets/card/content-divider.svg"
import { Card } from "@/types/card"
import { formatPrice, formatProbability } from "@/lib/utils"

export function PackListCard({ card }: { card: Card }) {
  return (
    <div className="flex flex-col rounded-xl bg-blue-400">
      <div className="flex flex-col items-center gap-y-4 px-4 pb-2 pt-4">
        <Image
          src={`https://tcg-world-assets.s3.us-west-1.amazonaws.com/card-assets/${card.id}.png`}
          alt={card.name}
          width={116}
          height={0}
          className="h-auto w-full px-4"
        />
        <span className="max-w-full truncate text-center text-xs">
          {card.name}
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
          <span className="text-xs font-bold">{formatPrice(card.price)}</span>
        </div>
        <span className="text-xs italic">
          {formatProbability(card.probability)}
        </span>
      </div>
    </div>
  )
}
