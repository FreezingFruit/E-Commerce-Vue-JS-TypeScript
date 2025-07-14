import type { Cart } from './Cart'

export interface PurchaseHistory {
  id: number
  date: string
  items: Cart[]
}
