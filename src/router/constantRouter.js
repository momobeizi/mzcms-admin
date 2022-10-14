// 无权限要求路由
const constantRouter = [
  //   {
  //   path: '/404',
  //   component: () =>
  //     import('@/views/errorPage/404'),
  //   hidden: true
  // },
  {
    path: '/',
    component: () => import('@/views/layout/index'),
    redirect: '/home',
    onlyFirstMenu: true,
    meta: {
      title: '首页',
      icon: 'xitongguanli'
    },
    children: [{
      path: 'home',
      component: () => import('@/views/dashboard/index'),
      name: 'home',
      meta: {
        title: '首页',
        icon: 'xitongguanli'
      }
    }]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
]

export default constantRouter;