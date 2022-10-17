/* eslint-disable no-undef */
import router, {
  constantRouterMap,
  asyncRouterMap,
} from './router'
import store from './store'
import {
  Message
} from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


NProgress.configure({
  showSpinner: true
});

function resolvePath (arr, path, result) {
  let resultArr = result || [];
  arr.forEach((item) => {
    item.fullPath = path && path != '/' ? path + '/' + item.path : item.path;
    if (item.path == 'home') {
      return false;
    }
    if (item.children && item.children.length) {
      item.fullPath != '/' && resultArr.push(item.fullPath);
      resolvePath(item.children, item.fullPath, resultArr);
    } else {
      resultArr.push(item.fullPath);
    }
  })
  return resultArr
}

const whiteList = Array.from(new Set(resolvePath(constantRouterMap, '', [])));

function permissionsControl (to, from, next) {
  if (whiteList.indexOf(to.path) !== -1 || to.meta.api) { // 在免登录白名单，直接进入
    next();
  } else {
    if (store.getters.permission_routers.length === 0) { // 没有用户信息，请求获得用户信息
      store.dispatch('GetUserInfo').then(() => {
        // router.addRoutes(store.getters.permission_routers); //动态添加可访问路由表
        next({
          ...to,
          replace: true
        });
      })
    } else {
      next();
    }
  }
}

router.beforeEach((to, from, next) => {
  NProgress.start();
  permissionsControl(to, from, next);
});

router.afterEach(() => {
  NProgress.done() // 结束Progress
});