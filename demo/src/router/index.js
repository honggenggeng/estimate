import Vue from 'vue'
import Router from 'vue-router'
import Opinion0 from '@/components/opinion0'
import Opinion1 from '@/components/opinion1'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/',
      name: 'Opinion0',
      component: Opinion0,
      meta: {
        title: '评价与反馈'
      }
    },
    {
      path: '/Opinion1',
      name: 'Opinion1',
      component: Opinion1,
      meta: {
        title: '意见与反馈'
      }
    }
  ]
})
