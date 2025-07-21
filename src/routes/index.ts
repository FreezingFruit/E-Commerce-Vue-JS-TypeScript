import { useUserStore } from '@/stores/UserStore'
import CartPage from '@/views/CartPage.vue'
import CategoryPage from '@/views/CategoryPage.vue'
import CheckoutPage from '@/views/CheckoutPage.vue'
import HomePage from '@/views/HomePage.vue'
import ProductDetailPage from '@/views/ProductDetailPage.vue'
import ProductPage from '@/views/ProductPage.vue'
import ProfilePage from '@/views/ProfilePage.vue'
import { createWebHistory, createRouter } from 'vue-router'
import LoginRegisterPage from '@/views/LoginRegisterPage.vue'
import NotFound from '@/views/NotFound.vue'

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

  {
    path: '/signin',
    name: 'Signin',
    component: LoginRegisterPage,
    meta: {
      guestOnly: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Notfound',
    component: NotFound,
    meta: { layout: 'notfound' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  if (to.matched.some((rec) => rec.meta.requiresAuth)) {
    if (!userStore.isLoggedIn) {
      sessionStorage.setItem('intendedRoute', to.fullPath)
      return next({ path: '/signin' })
    }
  }

  if (to.matched.some((rec) => rec.meta.guestOnly)) {
    if (userStore.isLoggedIn) {
      return next({ path: '/' })
    }
  }

  next()
})

export default router
