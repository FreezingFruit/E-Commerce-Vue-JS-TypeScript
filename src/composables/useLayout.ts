import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from '@/Layouts/DefaultLayout.vue'
import CheckoutLayout from '@/Layouts/CheckoutLayout.vue'
import ProfileLayout from '@/Layouts/ProfileLayout.vue'
import NotFoundLayout from '@/Layouts/NotFoundLayout.vue'

export function useLayout() {
  const route = useRoute()

  const layout = computed(() => {
    switch (route.meta.layout) {
      case 'checkout':
        return CheckoutLayout
      case 'cart':
        return CheckoutLayout
      case 'profile':
        return ProfileLayout
      case 'notfound':
        return NotFoundLayout

      default:
        return DefaultLayout
    }
  })

  return {
    layout,
  }
}
