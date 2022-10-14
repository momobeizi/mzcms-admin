import { asyncRouterMap, constantRouterMap } from '@/router'
import { getUserInfo } from '@/api/login'

function resolveRouter (router, basePath) {
  router.forEach(routerItem => {
    if (routerItem.children) {
      resolveRouter(routerItem.children, routerItem.path)
    }
    routerItem.webLink = `${basePath === '/' ? '' : basePath}${routerItem.path.indexOf('/') ? '/' : ''}${routerItem.path}`
  });
  console.log(router)
}

const user = {
  state: {
    userInfo: {},
    routers: []
  },

  mutations: {
    //设置用户信息
    SET_USERINFO: (state, res) => {
      console.log(res)
      state.userInfo = res.data
    },
    // 设置用户菜单权限
    SET_ROUTERS: (state, res) => {
      state.routers = res
    },
    // 清空用户信息
    CLEAR_USERINFO: (state) => {
      state.userName = '';
      state.loginInfo = {};
    }
  },

  actions: {
    // 获取用户信息
    GetUserInfo ({ commit }) {
      return new Promise(resolve => {
        getUserInfo().then(res => {
          // 请求接口获取用户信息，处理返回数据
          commit('SET_USERINFO', res)
          let routers = [...asyncRouterMap];
          resolveRouter(routers, '')
          commit('SET_ROUTERS', routers)
          resolve();
        }
        )

      })
    },
    // 前端登出
    FedLogOut ({
      commit
    }) {
      return new Promise(resolve => {
        commit('CLEAR_USERINFO');
        commit('CLEAR_PERMISSIONS_URL');
        commit('CLEAR_ALLBUTTON');
        resolve();
      });
    }
  }
};

export default user;