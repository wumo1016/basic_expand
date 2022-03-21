// 异步代码测试

export function getData(cb) {
  setTimeout(() => {
    cb({ name: 'wyb' })
  }, 10000)
}

export function getPromiseData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ name: 'wyb' })
    }, 3000)
  })
}
