import type { Cart } from '@/types/Cart'
import type { Product } from '@/types/Product'
import type { PurchaseHistory } from '@/types/PurchaseHistory'
import { mockProducts } from '@/utils/ProductUtil'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { useAuthStore } from './AuthStore'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: mockProducts as Product[],
    searchQuery: '',
    cartItems: JSON.parse(localStorage.getItem('cartItems') || '[]') as Cart[],
    purchaseHistory: [] as PurchaseHistory[],
  }),
  getters: {
    filtheredProducts: (state) =>
      state.products.filter(
        (product) =>
          product.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(state.searchQuery.toLowerCase()),
      ),
    filtheredCategories: (state) => {
      return (category: string) => state.products.filter((product) => product.category === category)
    },

    totalProducts: (state) => state.cartItems.reduce((sum, cartItem) => sum + cartItem.quantity, 0),
    subTotal: (state) =>
      state.cartItems.reduce(
        (sum, cartItem) => sum + cartItem.product.price * cartItem.quantity,
        0,
      ),
  },

  actions: {
    addToCart(product: Product, quantity: number) {
      const existingItem = this.cartItems.find((cartItem) => cartItem.product.name === product.name)
      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        this.cartItems.push({ product, quantity })
      }
      this.saveToStorage()

      ElMessage.success('Added to Cart!')
    },
    //action for debugging
    displayCart() {
      this.cartItems.forEach((item) =>
        console.log(`${item.product.name} - Quantity: ${item.quantity}`),
      )
    },

    deleteCartItem(id: number) {
      this.cartItems = this.cartItems.filter((item) => item.product.id !== id)
      this.saveToStorage()
      ElMessage.info('Item Removed!')
    },

    saveToStorage() {
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems))
    },

    checkout() {
      const authStore = useAuthStore()
      if (!authStore.currentUser || this.cartItems.length === 0) return

      const history = {
        id: Date.now(),
        date: new Date().toISOString(),
        items: JSON.parse(JSON.stringify(this.cartItems)),
      } as PurchaseHistory

      authStore.currentUser.purchaseHistory ??= []
      authStore.currentUser.purchaseHistory.unshift(history)

      authStore.persistUserChanges()

      this.cartItems = []
      localStorage.removeItem('cartItems')
      ElMessage.success('Checkout Successful!')
    },
  },
})
