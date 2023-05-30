import {createRouter, createWebHistory} from 'vue-router'
import Home from './views/Home'
import Login from './views/Login'
import Logout from './views/Logout'
import Register from './views/Register'
import VariantList from './views/VariantList'
import addVariant from './views/addVariant'
import editVariant from './views/editVariant'
import EGETask1 from './views/EGETask1'
import EGETask2 from './views/EGETask2'
import EGETask3 from './views/EGETask3'
import EGETask4 from './views/EGETask4'
import Stats from './views/Stats'

import card_routes from './card_routes'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/logout',
        name: 'logout',
        component: Logout
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/:exam',
        name: 'exam',
        component: VariantList,
    },
    {
        path: '/:exam/add-variant',
        name: 'add-variant',
        component: addVariant,
    },
    {
        path: '/:exam/edit-variant/:id',
        name: 'edit-variant',
        component: editVariant,
    },
    {
        path: `/:exam/:id/1`,
        name: 'ege-task1',
        component: EGETask1,
    },
    {
        path: `/:exam/:id/2`,
        name: 'ege-task2',
        component: EGETask2,
    },
    {
        path: `/:exam/:id/3`,
        name: 'ege-task3',
        component: EGETask3,
    },
    {
        path: `/:exam/:id/4`,
        name: 'ege-task4',
        component: EGETask4,
    },
    {
        path: '/stats',
        name: 'stats',
        component: Stats,
    },
]

card_routes.forEach(root => {
    routes.push(root)
})

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router