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

    xhr.send()
  })
}
