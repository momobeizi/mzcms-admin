// 系统管理
const sysManageRouter = {
  path: '/sysManage',
  component: () => import('@/views/layout/index'),
  name: 'sysManage',
  meta: {
    title: '系统管理',
    icon: 'xitongguanli',
    nodropdown: true
  },
  redirect: {
    name: 'userManage'
  },
  children: [
    {
      path: 'userManage',
      component: () => import('@/views/sysManage/userManage/index'),
      name: 'userManage',
      meta: {
        title: '用户管理',
        icon: 'yonghuguanli'
      }
    },
    {
      path: 'systemOptionLog',
      component: () => import('@/views/sysManage/systemOptionLog/index'),
      name: 'systemOptionLog',
      meta: {
        title: '系统操作日志',
        icon: 'caozuorizhi'
      }
    }
  ]
}

export default sysManageRouter;