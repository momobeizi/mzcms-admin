import request from '@/utils/service'

// 获取用户列表
export function getUserList (data) {
  return request({
    url: '/user/getList',
    method: 'post',
    data
  })
}

// 删除用户
export function deleteUser (data) {
  return request({
    url: '/user/deleteUser',
    method: 'post',
    data
  })
}

