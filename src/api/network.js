import axios from 'axios'
import Vue from 'vue'

// 进行一些全局配置
axios.defaults.baseURL = 'http://127.0.0.1:3000/'
axios.defaults.timeout = 5000
let count = 0
axios.interceptors.request.use(function (config) {
  count++
  Vue.showLoading()
  return config
}, function (error) {
  Vue.hiddenLoading()
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  count--
  if (count === 0) {
    Vue.hiddenLoading()
  }
  return response
}, function (error) {
  // 对响应错误做点什么
  Vue.hiddenLoading()
  return Promise.reject(error)
})
// 封装自己的get/post方法
export default {
  get: function (path = '', data = {}) {
    return new Promise(function (resolve, reject) {
      axios.get(path, {
        params: data
      })
        .then(function (response) {
          resolve(response.data)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  },
  post: function (path = '', data = {}) {
    return new Promise(function (resolve, reject) {
      axios.post(path, data)
        .then(function (response) {
          resolve(response.data)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  },
  all: function (list) {
    return new Promise(function (resolve, reject) {
      axios.all(list)
        .then(axios.spread(function (...result) {
          resolve(result)
        }))
        .catch(function (err) {
          reject(err)
        })
    })
  }
}
