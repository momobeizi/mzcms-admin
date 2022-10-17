import request from '@/utils/service'

// 获取文档类别
export function getAllContentCategory () {
  return request({
    url: '/contentCategory/findAll',
    method: 'post'
  })
}

// 根据id文档类别
export function getOneContentCategory (data) {
  return request({
    url: '/contentCategory/findOne',
    method: 'post',
    data
  })
}

// 更新文档类别
export function editContentCategory (data) {
  return request({
    url: '/contentCategory/edit',
    method: 'post',
    data
  })
}

// 添加文档类别
export function addContentCategory (data) {
  return request({
    url: '/contentCategory/add',
    method: 'post',
    data
  })
}

// 删除文档类别
export function deleteContentCategory (data) {
  return request({
    url: '/contentCategory/delete',
    method: 'post',
    data
  })
}

// 获取文章列表
export function getContentList (data) {
  return request({
    url: '/content/findAll',
    method: 'post',
    data
  })
}

// 删除文章
export function deleteContent (data) {
  return request({
    url: '/content/delete',
    method: 'post',
    data
  })
}

// 获取单条文章
export function findOneContent (data) {
  return request({
    url: '/content/findOne',
    method: 'post',
    data
  })
}

// 添加文章
export function addContent (data) {
  return request({
    url: '/content/add',
    method: 'post',
    data
  })
}
