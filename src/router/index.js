import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import ProductListing from '../components/ProductListing.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/product-listing',
    name: 'ProductListing',
    component: ProductListing,
    props: {}
  }
]

const router = new VueRouter({
  routes
})

export default router
