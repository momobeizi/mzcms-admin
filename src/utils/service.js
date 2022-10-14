import router from '@/router';
import axios from 'axios'
import {
  Message
} from 'element-ui'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000 * 20,
  headers: {
    "Content-Type": "application/json", // 默认请求头
    // Authorization: `Bearer ${localStorage.getItem("token")}`
  },
  transformRequest: [function (data) {
    if (typeof data === "undefined") {
      return JSON.stringify({});
    } else {
      return JSON.stringify(data);
    }
  }]
})

service.interceptors.request.use(config => {
  return config
}, error => {
  Promise.reject(error)
})

service.interceptors.response.use(
  response => {
    if (response.data != '' && typeof response.data.code === 'undefined' && typeof response.data.status === 'undefined') { // 判断数据流
      return response;
    } else if (response.data.code === 0) {
      return response.data.data;
    } else {
      console.log(22222)
      // 登录失效
      if (response.data.code === 400) {
        Message({
          message: response.data.message,
          type: 'error',
          duration: 5 * 1000
        });
        localStorage.removeItem("token")
        router.push({ path: '/login' })
      } else {
        Message({
          message: response.data.message,
          type: 'error',
          duration: 5 * 1000
        });
      }
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error)
  });

export default service