import qs from 'qs'

export default function ({ $axios, redirect }) {
  // 基本配置
  $axios.defaults.timeout = 5000
  $axios.setHeader('Content-Type', 'application/x-www-form-urlencoded', ['post'])

  // 请求回调
  $axios.onRequest(config => {
    const { method, data } = config
    if (method === 'post') {
      config.data = qs.stringify(data)
    }
    return config
  })

  // 相应回调
  // $axios.onResponse(response => {})

  // 错误回调
  $axios.onError(error => {
    if (error.response.status === 500) {
      redirect('/error')
    }
  })
}
