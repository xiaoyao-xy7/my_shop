import store from '@/store'
import { from } from 'core-js/core/array'
import router from './router'

const checkRouter = (toPath) => {
    const userRouter = ['/users']
}

export default function () {
    const whiteList = ['/403']
    router.beforeEach((to, from, next) => {
        console.log('跳转', to)
    })
}