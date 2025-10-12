/*
- 静态方法
  - Promise.resolve
  - Promise.reject
  - Promise.all
  - Promise.race
  - Promise.allSettled
  - Promise.any
  - Promise.try
- 实例方法
  - then
  - catch
  - finally
*/

/* ----------------------------------------- Promise.try ----------------------------------------- */
;(function () {
  function test() {
    const value = Math.random()
    if (value > 0.5) throw new Error('同步错误')
    return Promise.resolve(value)
  }

  Promise.try(test)
    .then(res => console.log(res))
    .catch(err => console.log(err))
})()
