// 文档管理
const docManageRouter = {
  path: '/docManage',
  component: () => import('@/views/layout/index'),
  name: 'docManage',
  meta: {
    title: '文档管理',
    icon: 'wendang',
    nodropdown: true
  },
  redirect: {
    name: 'contentManage'
  },
  children: [
    {
      path: 'contentManage',
      component: () => import('@/views/docManage/content/index'),
      name: 'contentManage',
      meta: {
        title: '文档管理',
        icon: 'wendang'
      }
    },
    {
      path: 'editContent',
      component: () => import('@/views/docManage/content/edit'),
      name: 'editContent',
      hidden: true,
      meta: {
        title: '文档编辑',
        icon: 'wendang'
      }
    },
    {
      path: 'contentCategory',
      component: () => import('@/views/docManage/contentCategory/index'),
      name: 'contentCategory',
      meta: {
        title: '文档类别',
        icon: 'leibie1'
      }
    }
  ]
}

export default docManageRouter;