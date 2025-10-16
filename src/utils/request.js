import axios from 'axios'

/// 初始化配置 `axios`
export const request = axios.create({
  timeout: 6000,
  baseURL: import.meta.env.VITE_BASE_API_URL,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    ...headers
  }
})

/// 请求拦截器
request.interceptors.request.use((config) => {
    // 在发送请求之前做些什么
    return config
  }, (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

/// 响应拦截器
request.interceptors.response.use((response) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return Promise.resolve(response)
  }, (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)