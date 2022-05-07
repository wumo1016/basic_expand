import { getData, getPromiseData, getData1 } from '../src/3.async'

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
  // it('测试getData', done => {
  //   getData(data => {
  //     expect(data).toEqual({ name: 'wyb' })
  //     done()
  //   })
  //   jest.runAllTimers()
  // })

  // 测试 setInterval
  it('测试getData1', done => {
    getData1(data => {
      expect(data).toEqual({ name: 'wyb' })
      done()
    })
    // jest.advanceTimersByTime(4000) // 比setInterval间隔时间大一点可以
    jest.runOnlyPendingTimers() // 只运行当前等待的 timer 可以针对任何时间
  })
})
