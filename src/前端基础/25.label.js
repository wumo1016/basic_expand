// 使用 break [label] 可直接跳出外部循环 continue效果相同

!(function () {
  test1: for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      console.log(j)
      if (i + j === 10) {
        break test1
      }
    }
  }
})()
