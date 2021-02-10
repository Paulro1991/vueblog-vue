import axios from 'axios'
import router from './router'
import store from './store'
import Element from 'element-ui'
import el from "element-ui/src/locale/lang/el";

axios.defaults.baseURL = "http://localhost:8081"

axios.interceptors.request.use(config => {
    return config
})

axios.interceptors.response.use(response => {
        let res = response.data;

        if (res.code == 200) {
            return response
        } else {
            Element.Message.error('Oops, this is a error message.', {duration: 3 * 1000});
            return Promise.reject(response.data.msg())
        }
    },
    error => {
        console.log(error)
        if (error.response.data) {
            error.message = error.response.data.msg
        }
        if (error.response.status === 401) {
            store.commit("REMOVE_INFO")
            router.push("/login")
        }
        Element.Message.error(error.message, {duration: 3 * 1000});
        return Promise.reject(error)
    }
)