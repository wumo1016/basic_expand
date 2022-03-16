// 请求封装
export function request(options) {
  const _defaultOptions = {
    method: 'GET',
    baseURL: 'http://localhost:8000',
    headers: {},
    data: {}
  }

  options = {
    ..._defaultOptions,
    ...options,
    headers: { ..._defaultOptions.headers, ...options.headers }
  }

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(options.method, options.baseURL + options.url)
    // 设置header
    const headers = options.headers
    for (const key in headers) {
      xhr.setRequestHeader(key, headers[key])
    }
    xhr.responseType = 'json'
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if (xhr.status === 200) {
          resolve(xhr.response)
        } else {
          reject(xhr.response)
        }
      }
    }

    xhr.send(options.data)
  })
}

// 文件验证
export const allowFile = file => {
  const validFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4']
  if (!validFileTypes.includes(file.type)) {
    message.error(`不支持${file.type}格式的文件上传`)
    return false
  }
  const size = file.size / 1024 / 1024 // m
  if (size > 1024 * 2) {
    message.error(`上传的文件不能大于2G`)
    return false
  }
  return true
}

// 分片
const defaultSize = 1024 * 1024 * 100 // 100m
let cur = 0
export const createChunks = file => {
  const partList = []
  while (cur < file.size) {
    partList.push({
      chunk: file.slice(cur, cur + defaultSize),
      size: defaultSize
    })
    cur += defaultSize
  }
  return partList
}
