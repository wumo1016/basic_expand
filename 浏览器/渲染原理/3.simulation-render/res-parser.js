const LF = 10
const CR = 13
const SPACE = 32
const COLON = 58
class Parser {
  constructor() {
    this.RESPONSE_LINE_START = 0
    this.RESPONSE_LINE_END = 1
    this.RESPONSE_HEADER_NAME = 2
    this.RESPONSE_HEADER_SPACE = 3
    this.RESPONSE_HEADER_VALUE = 4
    this.RESPONSE_HEADER_LINE_END = 5
    this.RESPONSE_HEADER_END = 6
    this.RESPONSE_BODY_START = 7
    this.RESPONSE_BODY_END = 8
    this.state = this.RESPONSE_LINE_START
    this.responseLine = []
    this.headerName = []
    this.headerValue = []
    this.headers = {}
    this.body = []
    this.bodyLength = 0
  }
  // 状态机
  processChar(char) {
    switch (this.state) {
      case this.RESPONSE_LINE_START:
        if (char === CR) {
          this.state = this.RESPONSE_LINE_END
          this.responseLine = Buffer.from(this.responseLine).toString()
        } else {
          this.responseLine.push(char)
        }
        break
      case this.RESPONSE_LINE_END:
        if (char == LF) {
          this.state = this.RESPONSE_HEADER_NAME
        }
        break
      case this.RESPONSE_HEADER_NAME:
        if (char == COLON) {
          this.state = this.RESPONSE_HEADER_SPACE
        } else if (char === CR) {
          this.state = this.RESPONSE_HEADER_END
        } else {
          this.headerName.push(char)
        }
        break
      case this.RESPONSE_HEADER_SPACE:
        if (char == SPACE) {
          this.state = this.RESPONSE_HEADER_VALUE
        }
        break
      case this.RESPONSE_HEADER_VALUE:
        if (char === CR) {
          this.state = this.RESPONSE_HEADER_LINE_END
          let key = Buffer.from(this.headerName).toString()
          let value = Buffer.from(this.headerValue).toString()
          this.headers[key] = value
          this.headerName = []
          this.headerValue = []
        } else {
          this.headerValue.push(char)
        }
        break
      case this.RESPONSE_HEADER_LINE_END:
        if (char == LF) {
          this.state = this.RESPONSE_HEADER_NAME
        }
        break
      case this.RESPONSE_HEADER_END:
        if (char == LF) {
          this.bodyLength = this.headers['Content-Length']
          this.state = this.RESPONSE_BODY_START
        }
        break
      case this.RESPONSE_BODY_START:
        this.body.push(char)
        if (--this.bodyLength == 0) {
          this.state = this.RESPONSE_BODY_END
          this.body = Buffer.from(this.body).toString()
        }
      default:
        break
    }
  }
  get result() {
    if (this.RESPONSE_BODY_END === this.state) {
      return {
        responseLine: this.responseLine,
        body: this.body,
        headers: this.headers
      }
    }
  }
  parse(chars) {
    // 解析的是二进制流
    for (let i = 0; i < chars.length; i++) {
      this.processChar(chars[i])
    }
  }
}

module.exports = Parser
