
var a = 0
var b = 1
let d = 1

setTimeout(() => {
  b = 2
  d = 2
}, 1000)

// export { } 并非对象的意思 它表示批量导出
export {
  a as aa,
  b
}

export default d
