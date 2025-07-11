import type { Cart } from '@/types/Cart'
import type { Product } from '@/types/Product'
import { mockProducts } from '@/utils/ProductUtil'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: mockProducts as Product[],
    searchQuery: '',
    cartItems: JSON.parse(localStorage.getItem('cartItems') || '[]') as Cart[],
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
      this.cartItems = []
      localStorage.removeItem('cartItems')
      ElMessage.success('Checkout successful!')
    },
  },
})
