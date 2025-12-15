import { createRouter, createWebHistory } from 'vue-router'
import mainPage from '@/pages/mainPage'
import loginPage from '@/pages/loginPage'
import signupPage from '@/pages/signupPage'

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
    },
    {
        path: '/signup',
        name: 'Signup',
        component: signupPage
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router