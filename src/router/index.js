import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Front',
      component: () => import('../views/FrontView.vue'),
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('../views/front/HomeView.vue')
        },
        {
          path: 'products',
          name: 'Products',
          component: () => import('../views/front/ProductsView.vue')
        },
        {
          path: 'cart',
          name: 'Cart',
          component: () => import('../views/front/CartView.vue')
        },
        {
          path: 'about',
          name: 'About',
          component: () => import('../views/front/AboutView.vue')
        }
      ]
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: () => import('../views/DashboardView.vue'),
      children: [
        {
          path: 'products',
          name: 'AdminProduct',
          component: () => import('../views/dashboard/AdminProducts.vue')
        },
        {
          path: 'orders',
          name: 'AdminOrders',
          component: () => import('../views/dashboard/AdminOrders.vue')
        },
        {
          path: 'coupons',
          name: 'AdminCoupons',
          component: () => import('../views/dashboard/AdminCoupons.vue')
        },
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/:patchMatch(.*)',
      name: 'NotFound',
      component: () => import('../views/NotFound.vue')
    }
  ]
})

export default router
