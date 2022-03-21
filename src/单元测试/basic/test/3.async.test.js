import { getData, getPromiseData } from '../3.async'

jest.useFakeTimers()

describe('测试异步方法', () => {
  // it('测试getData', done => {
  //   getData(data => {
  //     expect(data).toEqual({ name: 'wyb' })
  //     done() // 如果不调用 done 方法 会直接成功
  //   })
  // })

  // 方法1
  // it('测试getPromiseData', done => {
  //   getPromiseData().then(data => {
  //     expect(data).toEqual({ name: 'wyb' })
  //     done()
  //   })
  // })

  // 方法2 promise可以采用 async + await
  // it('测试getPromiseData', async () => {
  //   const data = await getPromiseData()
  //   expect(data).toEqual({ name: 'wyb' })
  // })

  // 但是如果时间太长就会直接强制退出 jest.setTimeout
  // 可以使用模拟timer
  it('测试getData', done => {
    getData(data => {
      expect(data).toEqual({ name: 'wyb' })
      done()
    })
    jest.runAllTimers()
  })
})
