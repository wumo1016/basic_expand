const express = require('express')
const app = express()

const whiteList = [
  'http://localhost:3000'
]
app.use(function(req, res, next){
  const origin = req.headers.origin
  if(whiteList.includes(origin)){
    // 设置指定源
    res.setHeader('Access-Control-Allow-Origin', origin)
    // 设置允许请求头
    res.setHeader('Access-Control-Allow-Headers', 'name')
    res.setHeader('Access-Control-Allow-Methods', 'PUT')
    // 允许携带Cookie
    res.setHeader('Access-Control-Allow-Credentials', true)
    // 预检的存活时间
    // res.setHeader('Access-Control-Max-Age', 6000)
    // 允许前端获取哪个头
    res.setHeader('Access-Control-Expose-Headers', 'name')
  }
  next()
})
app.get('/test', function (req, res) {
  res.setHeader('name', 'wyb')
  res.end('test')
})
app.put('/test', function (req, res) {
  res.end('test')
})

app.listen(4000)
