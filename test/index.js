const list = Array.from(document.querySelectorAll('.r-q4m81j')).slice(14, 16)
const submit = document.querySelector('#prd-botnav-rightbtn-txt div')
function run() {
  list.forEach((dom, i) => {
    if (i === 0) {
      dom.click()
    } else {
      dom.click()
      setTimeout(() => {
        const t = setInterval(() => {
          const text = submit.innerText
          if (text === '暂时缺货') {
            clearInterval(t)
            run()
          } else if (text === '立即购买') {
            clearInterval(t)
            submit.click()
          }
        }, 500)
      }, 500)
    }
  })
}
run()
