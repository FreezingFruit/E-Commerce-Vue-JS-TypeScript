import { useUserStore } from '@/stores/UserStore'
import { useUiStore } from '@/stores/UiStore'
import CartPage from '@/views/CartPage.vue'
import CategoryPage from '@/views/CategoryPage.vue'
import CheckoutPage from '@/views/CheckoutPage.vue'
import HomePage from '@/views/HomePage.vue'
import ProductDetailPage from '@/views/ProductDetailPage.vue'
import ProductPage from '@/views/ProductPage.vue'
import ProfilePage from '@/views/ProfilePage.vue'
import { createWebHistory, createRouter } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/product', name: 'Product', component: ProductPage },
  {
    path: '/checkout',
    name: 'Checkout',
    component: CheckoutPage,
    meta: {
      layout: 'checkout',
      requiresAuth: true,
    },
  },
  { path: '/product/:name', name: 'ProductDetail', component: ProductDetailPage },
  {
    path: '/cart',
    name: 'Cart',
    component: CartPage,
    meta: {
      layout: 'cart',
      requiresAuth: true,
    },
  },
  { path: '/category/:name', name: 'Category', component: CategoryPage },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfilePage,
    meta: {
      layout: 'profile',
      requiresAuth: true,
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _from, next) => {
  const userStore = useUserStore()
  const uiStore = useUiStore()

  if (to.matched.some((rec) => rec.meta.requiresAuth)) {
    if (!userStore.isLoggedIn) {
      uiStore.showLoginDialog('login')
      return next('/')
    }
  }
  next()
})

export default router
