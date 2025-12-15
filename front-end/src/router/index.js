import { createRouter, createWebHistory } from 'vue-router'
import mainPage from '@/pages/mainPage'
import loginPage from '@/pages/loginPage'
import signupPage from '@/pages/signupPage'
import contactsPage from '@/pages/contactsPage'
import { api } from "@/api";

const routes = [
    {
        path: '/',
        name: 'Main',
        component: mainPage,
        meta: {requiresAuth : true}
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
    },
    {
        path: '/contacts',
        name: 'Contacts',
        component: contactsPage
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

router.beforeEach(async (to, from, next) => {
    if (!to.meta.requiresAuth) return next();

    try {
        const r = await api("/auth/authenticate");
        if (r.authenticated) return next();
    } catch (e) { }

    next({ name: "Login" });
});

export default router