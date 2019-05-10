import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout'


import Login from '@/pages/login'
import index from '@/pages/index/Index'
import analysis from '@/pages/index/analysis'
import product from '@/pages/products/productLists'

Vue.use(Router)

export default new Router({
  routes: [
    
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          name: 'index',
          component: index
        },

        {
          path: 'analysis',
          name: 'analysis',
          component: analysis
        },

        {
          path: 'product',
          name: 'product',
          component: product
        },

      ]
    },
    
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
  ]
})
