
import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '@/views/dashboard.vue'
import Calculator from '@/views/calculator.vue'
import page404 from '@/views/page404.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard,
        },  
        {
            path: '/calculator',
            name: 'Calculator',
            component: Calculator
        },                                            
        { 
            path: '*', 
            name: 'Page404',
            component: page404, 
        },
    ]
  })

  
export default router