export enum TierEnum {
  TIER_1 = "TIER_1",
  TIER_2 = "TIER_2",
  TIER_3 = "TIER_3",
  TIER_4 = "TIER_4",
  TIER_5 = "TIER_5",
}

export type Card = {
  id: string
  cardName: string
  currentPriceInGems: number
  currentPrice: number
  tier: TierEnum
  weight: number
  imageUrl: string
}
