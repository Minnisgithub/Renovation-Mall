import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import router from '../router'
// create an axios instance
const service = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? "/baseapi" : "", // url = base url + request url
  timeout: 5000
})
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Token'] = getToken()
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.status !== 0) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 3 * 1000
      })
      // if (res.code === 510) {
      //   store.dispatch('user/resetToken').then(() => {
      //     router.replace({ path: "/login" })
      //     // location.reload()
      //   })
      // }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    // router.replace({ path: "/login" })
    return Promise.reject(error)
  }
)

export default service