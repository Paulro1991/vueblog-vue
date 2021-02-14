// 路由器权限拦截
import router from "@/router";
import el from "element-ui/src/locale/lang/el";

router.beforeEach((to, from, next) => {
    // 拦截需要验证才可访问的页面
    if (to.matched.some(value => value.meta.requireAuth)) {
        const token = localStorage.getItem("token")
        console.log("-----------" + token)

        if (token) {
            if (to.path === '/login') {
              // request去login的无需拦截
            } else {
                // 有token放行
                next()
            }
        } else {
            // 没有token跳转会login
            next( {path: '/login'})
        }
    } else {
        // 无需验证的页面无需拦截
        next()
    }
})