import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // NOTE 返回后再次进入定位到最顶部
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/article/:id',
      name: 'ArticleDetail',
      component: () => import('@/pages/BeeArticle/ArticleDetail')
    }
  ]
})
