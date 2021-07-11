
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Dashboard from '@/views/dashboard.vue'
import About from '@/views/about.vue'
import page404 from '@/views/page404.vue'
//import FormAddExpense from '@/components/FormAddExpense.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/home',
            name: 'Home',
            component: Home,
        },       
        { 
            path: '/about', 
            name: 'About',
            component: About,            
        },           
        { 
            path: '/dashboard',           
            name: 'Dashboard',
            component: Dashboard, 
        },     
        { 
            path: '/dashboard/:page',           
            name: 'DashboardPage',
            component: Dashboard, 
        },            
        { 
            path: '/dashboard/add/payment/:category',           
            name: 'addPayment',
            component: Dashboard, 
            props: true
        },             
        { 
            path: '*', 
            name: 'Page404',
            component: page404, 
        },
    ]
  })

  
export default router