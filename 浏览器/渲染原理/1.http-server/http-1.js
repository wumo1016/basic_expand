const http = require('http')
const path = require('path')
const fs = require('fs')

const baseUrl = 'http://localhost:3001'

const staticDir = path.resolve(__dirname, 'public')
const server = http.createServer((req, res) => {
  let { pathname } = new URL(req.url, baseUrl)
  if (pathname === '/') {
    pathname = '/index.html'
    fs.createReadStream(path.join(__dirname, pathname)).pipe(res)
  } else {
    let requestUrl = path.join(staticDir, pathname)
    try {
      fs.accessSync(requestUrl)
      fs.createReadStream(requestUrl).pipe(res)
    } catch {
      res.statusCode = 404
      res.end(`Not Found`)
    }
  }
})
server.listen(3001)
