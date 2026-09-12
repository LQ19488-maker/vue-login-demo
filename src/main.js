import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import LoginView from './views/LoginView.vue'
import HomeView from './views/HomeView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/login', name: 'login', component: LoginView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫：未登录用户访问非登录页自动跳转
router.beforeEach((to, from, next) => {
  const user = localStorage.getItem('user')
  if (to.path === '/login' && user) {
    next('/')
  } else if (to.path !== '/login' && !user) {
    next('/login')
  } else {
    next()
  }
})

const app = createApp(App)
app.use(router)
app.mount('#app')
