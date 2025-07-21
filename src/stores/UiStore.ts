import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

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
    async handleSuccessfulLogin() {
      this.hideLoginDialog()

      const intendedRoute = sessionStorage.getItem('intendedRoute')
      if (intendedRoute) {
        sessionStorage.removeItem('intendedRoute')
        const router = useRouter()
        await router.push(intendedRoute)
      }
    },
  },
})
