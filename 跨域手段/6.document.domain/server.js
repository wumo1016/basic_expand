const express = require('express')
const app1 = express()

app1.use(express.static(__dirname))
app1.listen(3000)