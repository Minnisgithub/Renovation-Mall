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
      meta: { title: '装修小百科', icon: 'dashboard' }
    }]
  },
  {
    path: '/designer',
    component: Layout,
    children: [{
      path: 'index',
      name: 'designer',
      component: () => import('@/views/designer/index'),
      meta: { title: '设计师服务', icon: 'dashboard' }
    },
    {
      path: 'designerdetail',
      name: '/designerdetail',
      component: () => import('@/views/designerdetail/index'),
      meta: { title: '设计师作品详情', icon: 'dashboard' },
      hidden: true
    }]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/foreman',
    meta: { title: '工长服务', icon: 'el-icon-s-help' },
    children: [{
      path: 'foreman',
      name: 'foreman',
      component: () => import('@/views/foreman/index'),
      meta: { title: '工长模式', icon: 'table' }
    },
    {
      path: 'territory',
      name: 'territory',
      component: () => import('@/views/territory/index'),
      meta: { title: '区域维护', icon: 'table' }
    },
    
    {
      path: 'foremanwh',
      name: 'foremanwh',
      component: () => import('@/views/foremanwh/index'),
      meta: { title: '工长维护', icon: 'table' }
    }
  ]
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
  {
    path: '/hardwareKnowledgePackage',
    component: Layout,
    children: [{
      path: 'index',
      name: 'hardwareKnowledgePackage',
      component: () => import('@/views/hardwareKnowledgePackage/index'),
      meta: { title: '付费咨询', icon: 'dashboard' }
    }]
  },
  {
    path: '/constructionSites',
    component: Layout,
    children: [{
      path: 'index',
      name: 'constructionSites',
      component: () => import('@/views/constructionSites/index'),
      meta: { title: '工地一览', icon: 'dashboard' }
    },
    {
      path: 'constructionSitesdetail',
      name: '/constructionSitesdetail',
      component: () => import('@/views/constructionSitesdetail/index'),
      meta: { title: '工地一览详情', icon: 'dashboard' },
      hidden: true
    }
  ]
  },
  // {
  //   path: '/partner',
  //   component: Layout,
  //   children: [{
  //     path: 'index',
  //     name: 'partner',
  //     component: () => import('@/views/partner/index'),
  //     meta: { title: '合作伙伴', icon: 'dashboard' }
  //   }]
  // },
  {
    path: '/partner',
    component: Layout,
    redirect: '/partner/supervisor',
    meta: { title: '合作伙伴', icon: 'el-icon-s-help' },
    children: [{
      path: 'supervisor',
      name: 'supervisor',
      component: () => import('@/views/supervisor/index'),
      meta: { title: '三方监理', icon: 'table' }
    },
    {
      path: 'cleaning',
      name: 'cleaning',
      component: () => import('@/views/cleaning/index'),
      meta: { title: '开荒保洁', icon: 'table' }
    },
    {
      path: 'intelligence',
      name: 'intelligence',
      component: () => import('@/views/intelligence/index'),
      meta: { title: '房屋智能服务', icon: 'table' }
    }
  ]
  },
  {
    path: '/whitelist',
    component: Layout,
    redirect: '/whitelist/supervisor',
    meta: { title: '合作白名单', icon: 'el-icon-s-help' },
    children: [{
      path: 'typeMaintenance',
      name: 'typeMaintenance',
      component: () => import('@/views/typeMaintenance/index'),
      meta: { title: '类型维护', icon: 'table' }
    },
    {
      path: 'merchantMaintenance',
      name: 'merchantMaintenance',
      component: () => import('@/views/merchantMaintenance/index'),
      meta: { title: '商家维护', icon: 'table' }
    },
    {
      path: 'commodityMaintenance',
      name: 'commodityMaintenance',
      component: () => import('@/views/commodityMaintenance/index'),
      meta: { title: '商品维护', icon: 'table' }
    }
  ]
  },
  {
    path: '/wholeHouseCustomizationPlanCase',
    component: Layout,
    children: [{
      path: 'index',
      name: 'wholeHouseCustomizationPlanCase',
      component: () => import('@/views/wholeHouseCustomizationPlanCase/index'),
      meta: { title: '全屋定制', icon: 'dashboard' }
    }]
  },
  {
    path: '/user',
    component: Layout,
    children: [{
      path: 'index',
      name: 'user',
      component: () => import('@/views/user/index'),
      meta: { title: '用户管理', icon: 'dashboard' }
    }]
  },
  {
    path: '/customer',
    component: Layout,
    children: [{
      path: 'index',
      name: 'customer',
      component: () => import('@/views/customer/index'),
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
