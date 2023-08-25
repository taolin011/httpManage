
import { userStore } from './stores/userInfo'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'

import router from '@/router/index.js'
router.beforeEach((to, from, next) => {
    const userInfo = userStore()
    NProgress.start()
    const token = userInfo.token
    if (token) {
        next()

    } else {
        if (to.path === '/login') {
            next()
        } else {
            next('/login')
        }
    }

})
router.afterEach(() => {
    NProgress.done();
})