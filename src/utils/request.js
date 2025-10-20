import axios from 'axios'

/// 初始化配置 `axios`
export const request = axios.create({
  timeout: 6000,
  baseURL: import.meta.env.VITE_BASE_API_URL,
  headers: {
    ...headers,
    'Content-Type': 'application/json;charset=utf-8',
  }
})


/// 请求 & 响应 
/** 
 * 请求拦截器
 * @param {Object} config 请求配置
 * @returns {Object} 处理后的请求配置
 */
request.interceptors.request.use((config) => {
    /// 在发送请求之前做些什么

    // 取消重复请求
    deletePendingRequest(config)
    insertPendingRequest(config)

    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }

    return config
  }, (error) => {
    /// 对请求错误做些什么
    return Promise.reject(error)
  }
)

/** 
 * 响应拦截器
 * @param {Object} response 响应数据
 * @returns {Object} 处理后的响应数据
 */
request.interceptors.response.use((response) => {
    /// 对响应数据做点什么
    /// `2xx` 范围内的状态码都会触发该函数

    // 从响应数据中提取 `data` 和 `config`
    const { data, config } = response

    // 从 `pending` 列表移除请求
    deletePendingRequest(config)

    // 从 `data` 中提取 `code` 和 `message`
    const { code, message } = data

    // 处理业务逻辑错误
    if (code !== 200) {
      /// 打印错误信息
      // console.error(message || '业务逻辑错误!')
      return Promise.reject(new Error(message || '业务逻辑错误!'))
    }

    return Promise.resolve(response)
  }, (error) => {
    /// 对响应错误做点什么
    /// 超出 `2xx` 范围的状态码都会触发该函数

    // 响应错误处理
    deletePendingRequest(error.config || {})

    // 取消请求的错误不提示
    if (axios.isCancel(error)) {
      return Promise.reject(new Error('已取消重复请求!'))
    }

    // 处理不同状态码的错误
    let message = '网络错误,请稍后重试!'
    if (error.response) {
      const { status } = error.response
      switch (status) {
        case 404:
          message = '请求地址不存在!'
          break;
        case 500:
          message = '服务器内部错误!'
          break;
        case 502:
          message = '网关错误!'
          break;
        default:
          message = `请求错误: ${status}`
          break;
      }
    } else {
      message = error.message || '未知错误!'
    }

    /// 打印错误信息
    // console.error(message)

    return Promise.reject(error)
  }
)


/// 取消重复请求
/**
 * 存储请求标识，用于取消重复请求
 */
const pendingRequests = new Map()

/**
 * 生成请求唯一标识
 * @param {Object} config 请求配置
 * @returns {String} 唯一标识
 */
function generateResponseKey(config) {
  const { method, url, params, data } = config
  return [method, url, JSON.stringify(params), JSON.stringify(data)].join('&')
}

/**
 * 添加请求到 `pending` 列表
 * @param {Object} config 请求配置
 */
function insertPendingRequest(config) {
  const requestKey = generateResponseKey(config)
  config.cancelToken = config.cancelToken || new axios.CancelToken(cancel => {
    if (!pendingRequests.has(requestKey)) {
      pendingRequests.set(requestKey, cancel)
    }
  })
}

/**
 * 从 `pending` 列表移除请求
 * @param {Object} config 请求配置
 */
function deletePendingRequest(config) {
  const requestKey = generateResponseKey(config)
  if (pendingRequests.has(requestKey)) {
    const cancel = pendingRequests.get(requestKey)
    // 取消请求
    cancel(requestKey)
    pendingRequests.delete(requestKey)
  }
}