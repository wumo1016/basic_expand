// openssl req -newkey rsa:2048 -nodes -keyout rsa_private.key -x509 -days 365 -out cert.crt
const http2 = require('http2')
const path = require('path')
const fs = require('fs')
const { HTTP2_HEADER_PATH, HTTP2_HEADER_STATUS } = http2.constants
const server = http2.createSecureServer({
  cert: fs.readFileSync(path.resolve(__dirname, './cert.crt')),
  key: fs.readFileSync(path.resolve(__dirname, './rsa_private.key'))
})
const staticDir = path.resolve(__dirname, 'public')
server.on('stream', async function (stream, headers) {
  let requestPath = headers[HTTP2_HEADER_PATH]
  if (requestPath == '/') {
    requestPath = '/index.html'
    let dirs = fs.readdirSync(staticDir)
    dirs.forEach(dir => {
      let pushPath = path.join(staticDir, dir)
      stream.pushStream(
        { [HTTP2_HEADER_PATH]: '/' + dir },
        (err, pushStream) => {
          fs.createReadStream(pushPath).pipe(pushStream)
        }
      )
    })
    stream.respondWithFile(path.join(__dirname, requestPath), {
      'Content-Type': 'text/html'
    })
  } else {
    stream.respond({
      [HTTP2_HEADER_STATUS]: 404
    })
    stream.end('Not Found')
  }
})
server.listen(3002)
