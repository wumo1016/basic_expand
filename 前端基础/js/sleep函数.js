/* ------------------ 伪死循环 ------------------ */

function sleep1(fn, wait) {
  const now = Date.now()
  while (Date.now() - now <= wait) {
    continue
  }
  fn()
}

sleep1(() => {
  console.log(12)
}, 2000)

/* ------------------ 定时器 ------------------ */
function sleep2(fn, wait) {
  setTimeout(fn, wait)
}
