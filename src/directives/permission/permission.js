import store from '@/store'
import Vue from 'vue'

Vue.directive('permission', {
    inserted (el, binding) {
        let roles = ['test']
        // roles = store.getters.roles
        // console.log(roles.includes(binding.value))
        if(!roles.includes(binding.value)) {
            el.parentNode.removeChild(el)
        }
    }
})