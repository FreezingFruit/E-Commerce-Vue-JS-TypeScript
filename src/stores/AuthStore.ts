import type { User } from '@/types/User'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    users: JSON.parse(localStorage.getItem('users') || '[]') as User[],
    currentUser: JSON.parse(localStorage.getItem('currentUser') || 'null') as User | null,
  }),

  actions: {
    register(user: User) {
      this.users.push(user)
      this.currentUser = user
      localStorage.setItem('users', JSON.stringify(this.users))
      localStorage.setItem('currentUser', JSON.stringify(user))
    },
    login(email: string, password: string) {
      const user = this.users.find((user) => user.email === email && user.password === password)

      if (!user) throw new Error('Invalid Credentials')
      this.currentUser = user
      localStorage.setItem('currentUser', JSON.stringify(user))
    },
    logout() {
      this.currentUser = null
      localStorage.removeItem('currentUser')
    },
    updateProfile(user: {
      firstName?: string
      lastName?: string
      phone?: number
      address?: {
        street?: string
        city?: string
        postalCode?: number
        country?: string
      }
    }) {
      if (!this.currentUser) return

      Object.assign(this.currentUser, {
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
      })

      console.log(user)

      this.currentUser.address ??= {}
      Object.assign(this.currentUser.address, user.address)

      this.persistUserChanges()
    },

    //function helper
    persistUserChanges() {
      const index = this.users.findIndex((u) => u.id === this.currentUser!.id)
      if (index !== -1) this.users[index] = { ...this.currentUser! }
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
      localStorage.setItem('users', JSON.stringify(this.users))
    },
  },
})
