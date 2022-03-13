function* test() {
  console.log(1)
  yield console.log(2)
  yield console.log(3)
}

const t = test()
t.next() // 1 2
t.next() // 3
