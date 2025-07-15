import type { Cart } from './Cart'
import type { PurchaseHistory } from './PurchaseHistory'

export interface User {
  id?: number
  email: string
  password: string
  firstName?: string
  lastName?: string
  phone?: number
  purchaseHistory?: PurchaseHistory[]
  cartItems?: Cart[]
  address?: {
    street?: string
    city?: string
    postalCode?: number
    country?: string
  }
}
