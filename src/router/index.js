import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '@/views/auth/LoginView.vue'
import ForgetPasswordView from '@/views/auth/ForgetPassword/ForgetPasswordView.vue'
import ResetPasswordView from '@/views/auth/ForgetPassword/ResetPasswordView.vue'

import LayoutsDashboard from '@/components/layouts/LayoutsDashboard.vue'

import HomeView from '@/views/HomeView.vue'
import ProfileView from '@/views/ProfileView.vue'
import CategoryView from '@/views/Category/CategoryView.vue'
import UserView from '@/views/User/UserView.vue'

import LandingView from '@/views/LandingView.vue'
import LandingFtView from '@/views/landingAllpage/LandingFtView.vue'
import LandingAboutView from '@/views/landingAllpage/LandingAboutView.vue'
import LandingHomeView from '@/views/landingAllpage/LandingHomeView.vue'
import DetailUser from '@/views/User/DetailUser.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      redirect: '/landing/homelanding',
    },
    {
      path: '/landing',
      component: LandingView,
      redirect: '/landing/homelanding',
      meta: { guestOnly: true },
      children: [
        {
          path: 'homelanding',
          name: 'landing',
          component: LandingHomeView,
          meta: { title: 'Landing Page', guestOnly: true },
        },
        {
          path: 'function',
          name: 'landingfunction',
          component: LandingFtView,
          meta: { title: 'Function Page', guestOnly: true },
        },
        {
          path: 'about',
          name: 'landingabout',
          component: LandingAboutView,
          meta: { title: 'About Page', guestOnly: true },
        },
      ],
    },

    // Auth — guestOnly
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { title: 'Login', guestOnly: true },
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgetPasswordView,
      meta: { title: 'Forgot Password', guestOnly: true },
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: ResetPasswordView,
      meta: { title: 'Reset Password', guestOnly: true },
    },

    // Dashboard — requiresAuth
    {
      path: '/dashboard',
      component: LayoutsDashboard,
      redirect: '/dashboard/home',
      meta: { requiresAuth: true },
      children: [
        {
          path: 'home',
          name: 'dashboard',
          component: HomeView,
          meta: { title: 'Dashboard', requiresAuth: true },
        },
        {
          path: 'profile',
          name: 'profile',
          component: ProfileView,
          meta: { title: 'Profile', requiresAuth: true },
        },
        {
          path: 'category',
          name: 'category',
          component: CategoryView,
          meta: { title: 'Categories', requiresAuth: true },
        },
        {
          path: 'user',
          name: 'user',
          component: UserView,
          meta: { title: 'User', requiresAuth: true },
        },
        {
          path: 'detail-user/:id',
          name: 'detailuser',
          component: DetailUser,
          meta: { title: 'Detail User', requiresAuth: true },
        },
      ],
    },

    // 404 — must be last
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
      meta: { title: '404 Not Found' },
    },
  ],
})

router.beforeEach((to) => {
  document.title = to.meta.title || 'Expense Tracker'

  // ✅ Skip guard for 404 — let NotFoundView render freely
  if (to.name === 'not-found') return

  const isAuthenticated =
    !!localStorage.getItem('token') || !!sessionStorage.getItem('token')

  const role =
    localStorage.getItem('role') || sessionStorage.getItem('role')
  const isAdmin = role === 'ADMIN'

  // Not logged in + requiresAuth → go to landing
  if (to.meta.requiresAuth && !isAuthenticated) {
    return { name: 'landing' }
  }

  // Logged in but not ADMIN + requiresAuth → clear + go to login
  if (to.meta.requiresAuth && isAuthenticated && !isAdmin) {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('role')
    return { name: 'login' }
  }

  // Logged in as ADMIN + guestOnly → go to dashboard
  if (to.meta.guestOnly && isAuthenticated && isAdmin) {
    return { name: 'dashboard' }
  }
})

export default router