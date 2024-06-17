import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '广告栏', icon: 'dashboard' }
    }]
  },
  {
    path: '/constructionKnowledge',
    component: Layout,
    children: [{
      path: 'index',
      name: 'constructionKnowledge',
      component: () => import('@/views/constructionKnowledge/index'),
      meta: { title: '施工知识库', icon: 'dashboard' }
    }]
  },
  {
    path: '/constructionKnowledge',
    component: Layout,
    children: [{
      path: 'index',
      name: 'constructionKnowledge',
      component: () => import('@/views/constructionKnowledge/index'),
      meta: { title: '设计师服务', icon: 'dashboard' }
    }]
  },
  {
    path: '/constructionKnowledge',
    component: Layout,
    children: [{
      path: 'index',
      name: 'constructionKnowledge',
      component: () => import('@/views/constructionKnowledge/index'),
      meta: { title: '工长服务', icon: 'dashboard' }
    }]
  },
  {
    path: '/constructionKnowledge',
    component: Layout,
    children: [{
      path: 'index',
      name: 'constructionKnowledge',
      component: () => import('@/views/constructionKnowledge/index'),
      meta: { title: '硬装知识包', icon: 'dashboard' }
    }]
  },
  {
    path: '/constructionKnowledge',
    component: Layout,
    children: [{
      path: 'index',
      name: 'constructionKnowledge',
      component: () => import('@/views/constructionKnowledge/index'),
      meta: { title: '工地一览', icon: 'dashboard' }
    }]
  },
  {
    path: '/constructionKnowledge',
    component: Layout,
    children: [{
      path: 'index',
      name: 'constructionKnowledge',
      component: () => import('@/views/constructionKnowledge/index'),
      meta: { title: '合作伙伴', icon: 'dashboard' }
    }]
  },
  {
    path: '/constructionKnowledge',
    component: Layout,
    children: [{
      path: 'index',
      name: 'constructionKnowledge',
      component: () => import('@/views/constructionKnowledge/index'),
      meta: { title: '合作白名单', icon: 'dashboard' }
    }]
  },
  {
    path: '/constructionKnowledge',
    component: Layout,
    children: [{
      path: 'index',
      name: 'constructionKnowledge',
      component: () => import('@/views/constructionKnowledge/index'),
      meta: { title: '全屋定制', icon: 'dashboard' }
    }]
  },
  {
    path: '/constructionKnowledge',
    component: Layout,
    children: [{
      path: 'index',
      name: 'constructionKnowledge',
      component: () => import('@/views/constructionKnowledge/index'),
      meta: { title: '用户管理', icon: 'dashboard' }
    }]
  },
  {
    path: '/constructionKnowledge',
    component: Layout,
    children: [{
      path: 'index',
      name: 'constructionKnowledge',
      component: () => import('@/views/constructionKnowledge/index'),
      meta: { title: '客服管理', icon: 'dashboard' }
    }]
  },
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },
  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       name: 'Menu2',
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },
  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
