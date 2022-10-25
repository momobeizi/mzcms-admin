import request from '@/utils/service'

// 获取文档类别
export function uploadFile (data) {
  return request({
    headers: {
      "Content-Type": "multipart/form-data"
    },
    url: '/setting/uploadFile',
    method: 'post',
    transformRequest: [
      function (data) {
        return data;
      }
    ],
    data
  })
}

// 下载大文件
export function downloadBigFile (data) {
  return request({
    url: '/setting/downloadBigFile',
    method: 'post',
    data
  })
}

