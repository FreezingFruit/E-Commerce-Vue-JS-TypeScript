// in AuthStore.ts (or a separate UiStore)
import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
  state: () => ({
    loginDialogVisible: false as boolean,
    loginDialogMode: 'login' as 'login' | 'register',
  }),
  actions: {
    showLoginDialog(mode: 'login' | 'register' = 'login') {
      this.loginDialogMode = mode
      this.loginDialogVisible = true
    },
    hideLoginDialog() {
      this.loginDialogVisible = false
    },
  },
})
