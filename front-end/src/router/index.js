import { createRouter, createWebHistory } from 'vue-router'
import mainPage from '@/pages/mainPage'
import loginPage from '@/pages/loginPage'

const routes = [
    {
        path: '/',
        name: 'Main',
        component: mainPage
    },
    {
        path: '/login',
        name: 'Login',
        component: loginPage
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router