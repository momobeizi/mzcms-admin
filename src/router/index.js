import Vue from 'vue';
import Router from 'vue-router';
import constantRouter from './constantRouter'; // 无权限要求路由
import sysManageRouter from './modules/sysManageRouter'; // 系统管理
import docManageRouter from './modules/docManageRouter'; // 文档管理



/**
 * hidden: true, //不显示在菜单中
 * alwaysShow: true,
 * firstMenuHide: true, // 不显示第一层路由,显示下层路由
 * redirect: 'noredirect',  //在面包屑中不重定向，但会显示名称
 * name:'router-name'
 * meta : {
    title: 'title',
    icon: 'svg-name',
    noCache: true,
    load:true,                    默认加载该路由
  }
 **/

Vue.use(Router);
export const constantRouterMap = [
  ...constantRouter,
];

export const asyncRouterMap = [
  sysManageRouter,
  docManageRouter,
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
];

const createRouter = () =>
  new Router({
    scrollBehavior: () => ({
      y: 0
    }),
    routes: [...constantRouterMap, ...asyncRouterMap]
  });
const router = createRouter();
//解决重复登录时重复添加路由 或者 高级权限改低级权限时 某些路由已经注入的问题
export function resetRouter () {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
}

export default router;