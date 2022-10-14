import request from '@/utils/service'

// 登录接口
export function login (data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

// 获取用户信息
export function getUserInfo (data) {
  return request({
    url: '/user/getUserInfo',
    method: 'post',
    data
  })
}


