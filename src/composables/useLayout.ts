import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import CheckoutLayout from '@/layouts/CheckoutLayout.vue'
import ProfileLayout from '@/Layouts/ProfileLayout.vue'

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
      default:
        return DefaultLayout
    }
  })

  return {
    layout,
  }
}
