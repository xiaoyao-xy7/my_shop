import request from "../utils/request";
import store from '../store'
import Vue from 'vue'

var getUrl = (path) => {
    // let url = `${store.getters.baseUrl}/${path}`
    let url = `http://127.0.0.1:8888/api/private/v1/${path}`
    return url
}

export function loginByUser (data) {
    return request({
        url: getUrl('login'),
        method: 'post',
        data
    })
}