const TCP = require('net') // TCP模块
const Parser = require('./res-parser')
const HtmlParser = require('htmlparser2') // 解析html
const css = require('css')

class HTTPRequest {
  constructor(options = {}) {
    this.options = options
    this.host = options.host
    this.method = options.method || 'GET'
    this.path = options.path || '/'
    this.port = options.port || 80
    this.headers = options.headers
  }

  send() {
    return new Promise((resolve, reject) => {
      const rows = []
      // 请求行
      rows.push(`${this.method} ${this.path} HTTP/1.1`)
      // 请求头
      Object.entries(this.headers).forEach(([key, value]) => {
        rows.push(`${key}: ${value}`)
      })

      const data = rows.join('\r\n') + '\r\n\r\n'

      // 创建一个TCP连接
      const socket = TCP.createConnection(
        {
          host: this.host,
          port: this.port
        },
        () => {
          socket.write(data) // 传输http数据
        }
      )
      // 接受服务传过来的数据
      const parser = new Parser()
      socket.on('data', chunk => {
        parser.parse(chunk)
        if (parser.result) {
          resolve(parser.result)
        }
      })
    })
  }
}

const request = async () => {
  const request = new HTTPRequest({
    host: '127.0.0.1',
    methods: 'GET',
    port: 3000,
    path: '/',
    headers: {
      name: 'wyb',
      age: 18
    }
  })
  const { responseLine, headers, body } = await request.send()

  /* 1.解析html */
  // 根据相应类型类解析文件
  // html => html-parser => dom tree
  // 使用一个栈
  let stack = [
    {
      type: 'document',
      children: []
    }
  ]
  const parser = new HtmlParser.Parser({
    onopentag(name, attrbutes) {
      const parent = stack[stack.length - 1]
      const element = {
        type: 'element',
        tagName: name,
        attrbutes,
        children: [],
        parent
      }
      parent.children.push(element)
      stack.push(element)
    },
    ontext(text) {
      const parent = stack[stack.length - 1]
      const textNode = {
        type: 'text',
        text
      }
      parent.children.push(textNode)
    },
    onclosetag(name) {
      if (name === 'style') {
        const parent = stack[stack.length - 1]
        /* 2.解析样式 */
        parseCss(parent.children[0].text)
      }
      stack.pop()
    }
  })
  parser.end(body) // 将响应体写进去

  // console.dir(stack, { depth: null })
}

function parseCss(styleText) {
  const ast = css.parse(styleText)
  console.dir(ast, { depth: null })
}

request()
