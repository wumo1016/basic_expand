const http = require('http')
const path = require('path')
const fs = require('fs')

const server = http.createServer((req, res) => {
  console.log(req.headers)
  res.end(fs.readFileSync(path.resolve(__dirname, 'index.html')))
})

server.listen(3000)
