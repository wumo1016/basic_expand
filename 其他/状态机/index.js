const test = "import(['test1.js', 'test2.js'], () => {})"

let res = []
let curValue = ''
let state = 'end'

for (let i = 0, len = test.length; i < len; i++) {
  const val = test[i]
  if (val === "'") {
    if (state === 'end') {
      state = 'start'
    } else {
      res.push(curValue)
      curValue = ''
      state = 'end'
    }
  } else {
    if (state === 'start') {
      curValue += val
    }
  }
}

console.log(res) // [ 'test1.js', 'test2.js' ]
