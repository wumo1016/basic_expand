
const { createApp } = Vue

const login = () => {
  return Get(API.login).then(res => {
    window.token = res.msg
  })
}

const app = {
  async setup(){
    // 登录
    // await login()

    const getGoodsList = () => {
      Get(API.goodsList).then(res => {
        console.log(res.content)
      })
    }
    getGoodsList()

  }
}

createApp(app).mount('#app')

// function login() {
//   Get(
//     ''
//   ).then(res => {
//     console.log(res);
//   })
// }
// // login()

// function getGoodsList(){

//   Get(
//     `&nid=ID-0200&key=&ca1=&ca2=&order=6&ty=&lq=0&ml=0&xy=0&smoney=&emoney=&jp=&ishb=&iscard=&show=N&pageIndex=1&pageSize=8&dp=`
//   ).then(res => {
//     console.log(res.content);
//   })
  
// }

// getGoodsList()