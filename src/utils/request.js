import axios from 'axios'
import { Message } from 'element-ui'
import { getLocalStorage } from '@/utils/auth'
import store from '../router'
import router from '../router'

function responseError (res) {
    if(res.meta.status === 4000) {
        router.push({
            path: '/403'
        })
    }
    Message.closeAll()
    const code = `<span style="font-size: 12px; vertical-align: baseline;">${res.code ? '[' + res.code + ']' : ''}</span>`
    const message = res.meta.msg || '系统异常'
    Message({ message: code + ' ' + message, type: 'warning', offset: 60, dangerouslyUseHTMLString: true })
}

const request = axios.create({
    // baseURL: process.env.VUE_APP_API_BASE
    baseURL: "http://127.0.0.1:8888/api/private/v1/"
})

// 配置请求的跟路径
// axios.defaults.baseURL = "http://127.0.0.1:8888/api/private/v1/";
request.interceptors.request.use(config => {
  // console.log(config);
  config.headers.Authorization = window.sessionStorage.getItem("token");
  // 最后必须return
  return config;
});

// request.interceptors.request.use(
//     config => {
//         config.headers['Authorization'] = getLocalStorage('Authorization')
//         return config
//     },

//     error => {
//         Promise.reject(error)
//     }
// )

// request.interceptors.request.use(
//     response => {
//         const res = response.meta || {}
//         if(res.status === 400) {
//             // store.dispatch('logOutConfirm', '用户登录失败，请重新登录！')
//             return Promise.reject(response)
//         } else if(res.status === 200) {
//             return response
//         } else {
//             // responseError(res)
//             return Promise.reject(response)
//         }
//     },
//     error => {
//         debugger
//     }
// )

export default request

