import axios from 'axios'
import ENV from '../ENV'
import storage from './storage';
const { stringify } = require('qs')

axios.defaults.baseURL = ENV.BASE_URL
axios.defaults.withCredentials = true
// 获取 { id, openid }
const USER = () => storage.get('user') || {}

axios.interceptors.request.use(config => {
  const defaultParams = {
    userid: USER().id,
    openid: USER().openid,
  }
  if (config.method.toLowerCase() === 'get') {
    config.params = {
      ...defaultParams,
      ...config.params
    }
  } else {
    config.data = stringify({
      ...defaultParams,
      ...config.data
    })
    config.headers = {
      'Content-type': 'application/x-www-form-urlencoded'
    }
  }
  return config
})

axios.interceptors.response.use(
  res => {
    return res.data && +res.data.code === 0 
      ? Promise.resolve(res)
      : Promise.reject(res.data)
  },
  error => {
    console.error('【request error】 ', error)
    return Promise.reject(error)
  }
)

export default {
  get(url, params = {}, configs = {}) {
    return axios.get(url, Object.assign({
      params
    }, configs))
  },
  post: axios.post,
}