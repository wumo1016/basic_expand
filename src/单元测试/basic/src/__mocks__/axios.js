function axios({ url }) {
  if (url === '/url') {
    return ['http://www.baidu.com']
  }
}

axios.get = function (url) {
  if (url === '/list') {
    return [1, 2, 3, 4]
  }
}

export default axios
