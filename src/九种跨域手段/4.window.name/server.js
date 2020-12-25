const express = require('express')
const app1 = express()

app1.use(express.static(__dirname))
app1.listen(3000)

const app2 = express()

app2.use(express.static(__dirname))
app2.listen(4000)
