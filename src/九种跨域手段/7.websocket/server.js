const express = require('express')
const app = express()
const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 3000 })

wss.on('connection', function(ws){
  ws.on('message', function(data){
    console.log(`来自客户端的消息${data}`)
    ws.send('test')
  })
})
