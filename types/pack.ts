import { Card } from "./card"

export type Pack = {
  id: any
  featuredCards: Partial<Card>[]
  name: string
  price: number
  cards: Card[]
}
