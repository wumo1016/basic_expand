const express = require('express')
const app = express()

app.get('/test', function (req, res) {
  const {
    wd,
    cb
  } = req.query
  res.end(`${cb}('me too')`)
})

app.listen(3000)