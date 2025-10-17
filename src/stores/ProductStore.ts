import type { Product } from '@/types/Product'
import type { PurchaseHistory } from '@/types/PurchaseHistory'
import { mockProducts } from '@/utils/ProductUtil'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { useUserStore } from './UserStore'
import type { Cart } from '@/types/Cart'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: mockProducts as Product[],
    searchQuery: '',
    selectedCartItemIds: [] as number[],
    checkoutReceiptItems: [] as Cart[],
  }),
  getters: {
    cartItems: () => useUserStore().cart,
    getSelectedCartItems(state): Cart[] {
      const userStore = useUserStore()
      return userStore.cart.filter((item) => state.selectedCartItemIds.includes(item.product.id))
    },
    // filteredProducts: (state) =>
    //   state.products.filter(
    //     (product) =>
    //       product.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
    //       product.description.toLowerCase().includes(state.searchQuery.toLowerCase()),
    //   ),
    filteredCategories: (state) => {
      return (category: string) => state.products.filter((product) => product.category === category)
    },

    totalProducts: () => useUserStore().cart.reduce((sum, cartItem) => sum + cartItem.quantity, 0),
    // subTotal: () =>
    //   useUserStore().cart.reduce(
    //     (sum, cartItem) => sum + cartItem.product.price * cartItem.quantity,
    //     0,
    //   ),

    getTotalSelectedCartItems(): number {
      return this.getSelectedCartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0,
      )
    },
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

      user.persistUserChanges()
    },

    saveToStorage() {
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems))
    },

    checkout() {
      const user = useUserStore()
      const selectedItems = this.getSelectedCartItems

      if (!user.currentUser || selectedItems.length === 0) return

      const history: PurchaseHistory = {
        id: Date.now(),
        date: new Date().toISOString(),
        items: JSON.parse(JSON.stringify(selectedItems)),
      }

      user.currentUser!.purchaseHistory ??= []
      user.currentUser!.purchaseHistory.unshift(history)

      this.checkoutReceiptItems = selectedItems

      const selectedIds = new Set(selectedItems.map((item) => item.product.id))
      user.currentUser.cartItems = user.currentUser.cartItems?.filter(
        (ci) => !selectedIds.has(ci.product.id),
      )

      this.selectedCartItemIds = []
      user.persistUserChanges()
      ElMessage.success('Selected items checked out!')
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

    createReceipt() {
      const userStore = useUserStore()
      this.checkoutReceiptItems = userStore.cart.filter((item) =>
        this.selectedCartItemIds.includes(item.product.id),
      )
    },
  },
})
