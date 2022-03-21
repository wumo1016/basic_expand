export function parser(str) {
  const obj = {}
  str.replace(/([^&=?]+)=([^&=?]+)/g, (match, p1, p2) => {
    obj[p1] = p2
  })
  return obj
}

export function stringfy(obj) {
  const list = []
  for (const key in obj) {
    list.push(key + '=' + obj[key])
  }
  return list.join('&')
}

// console.log(parser('?name=123&age=18'))
// console.log(stringfy({ name: 'wyb', age: 18 }))
