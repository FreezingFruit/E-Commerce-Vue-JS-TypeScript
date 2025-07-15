import type { Product } from '@/types/Product'
import type { PurchaseHistory } from '@/types/PurchaseHistory'
import { mockProducts } from '@/utils/ProductUtil'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { useUserStore } from './UserStore'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: mockProducts as Product[],
    searchQuery: '',
  }),
  getters: {
    cartItems: () => useUserStore().cart,
    filtheredProducts: (state) =>
      state.products.filter(
        (product) =>
          product.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(state.searchQuery.toLowerCase()),
      ),
    filtheredCategories: (state) => {
      return (category: string) => state.products.filter((product) => product.category === category)
    },

    totalProducts: () => useUserStore().cart.reduce((sum, cartItem) => sum + cartItem.quantity, 0),
    subTotal: () =>
      useUserStore().cart.reduce(
        (sum, cartItem) => sum + cartItem.product.price * cartItem.quantity,
        0,
      ),
  },

  actions: {
    addToCart(product: Product, quantity: number) {
      this.loggedInChecker()
      const user = useUserStore()

      user.currentUser!.cartItems ??= []
      const existingItem = user.currentUser!.cartItems.find((ci) => ci.product.id === product.id)

      if (existingItem) existingItem.quantity += quantity
      else user.currentUser!.cartItems.push({ product, quantity })

      user.persistUserChanges()
      ElMessage.success('Added to Cart')
    },

    deleteCartItem(id: number) {
      this.loggedInChecker()

      const user = useUserStore()

      user.currentUser!.cartItems = user.currentUser!.cartItems?.filter(
        (ci) => ci.product.id !== id,
      )
    },

    saveToStorage() {
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems))
    },

    checkout() {
      const user = useUserStore()
      if (!user.currentUser || user.cart.length === 0) return

      const history: PurchaseHistory = {
        id: Date.now(),
        date: new Date().toISOString(),
        items: JSON.parse(JSON.stringify(user.cart)),
      }

      user.currentUser!.purchaseHistory ??= []
      user.currentUser!.purchaseHistory.unshift(history)
      user.currentUser!.cartItems = []

      user.persistUserChanges()
      ElMessage.success('Checkout Successful!')
    },

    updateQuantity(productId: number, quantity: number) {
      this.loggedInChecker()
      const user = useUserStore()
      const item = user.currentUser!.cartItems?.find((ci) => ci.product.id === productId)

      if (item) {
        item.quantity = Math.max(1, quantity)
        user.persistUserChanges()
      }
    },

    loggedInChecker() {
      const auth = useUserStore()
      if (!auth.currentUser) return
    },
  },
})
