const express = require('express')

const app = express()
const path = require('path')

// 先去 public 目录下找 找不到再在当前目录下找
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.static(path.resolve(__dirname)))

// 解析请求体
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ // a=1&b=2 => { a:1, b:2 }
  extended: true
}))

// 解析cookie
const cookieParser = require('cookie-parser')
app.use(cookieParser())

// 用户列表
const userList = [{
    username: 'wyb',
    password: '123'
  },
  {
    username: 'admin',
    password: '123'
  },
]

const SESSION_ID = 'connect_xss'
const session = {} // 记录登录信息

app.post('/api/login', (req, res) => {
  const {
    username,
    password
  } = req.body
  const user = userList.find(v => v.username === username && v.password === password)
  if (user) {
    const cartId = Math.random() + Date.now()
    session[cartId] = {
      user
    }
    // httpOnly 表示表示前端不可操作
    res.cookie(SESSION_ID, cartId, {
      httpOnly: true
    }) // 写入浏览器 cookie
    res.json({
      code: 0
    })
  } else {
    res.json({
      code: 1,
      error: '用户名或密码错误'
    })
  }
})

// 反射型 http://localhost:3000/welcome?type=<script>alert(1)</script>
app.get('/welcome', (req, res) => {
  // res.send(req.query.type)
  // 解决方法1：编码 
  res.send(encodeURIComponent(req.query.type))
})

// 用户评论信息
const comments = [{
    username: 'wyb',
    content: '看见啊额嗲无法',
  },
  {
    username: 'zs',
    content: '三个色如果紫色如果',
  },
]

app.get('/api/list', (req, res) => {
  res.json({
    code: 0,
    data: comments
  })
})

app.post('/api/addlist', (req, res) => {
  // 先验证cookie
  const user = (session[req.cookies[SESSION_ID]] || {}).user
  if (user) { // 登陆过
    comments.push({
      username: user.username,
      content: req.body.content
    })
    res.json({
      code: 0
    })
  } else {
    res.json({
      code: 1,
      error: '用户未登录'
    })
  }
})

app.listen(3000)