export interface User {
  id?: number
  email: string
  password: string
  firstName?: string
  lastName?: string
  phone?: string
  address?: {
    street?: string
    city?: string
    postalCode?: string
    country?: string
  }
}
