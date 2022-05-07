const express = require('express')
const app = express()

// 以当前目录下的 index.html 页面作为启动页面
app.use(express.static(__dirname))

app.listen(3000)