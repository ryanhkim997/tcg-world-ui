import { Card } from "./card"

export type Pack = {
  id: any
  featuredCards: Card[]
  name: string
  price: number
  cards: Card[]
}
