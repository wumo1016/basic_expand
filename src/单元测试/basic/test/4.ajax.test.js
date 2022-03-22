import { getList } from '../src/4.ajax'

/* 方案1 mock整个方法 */
// 还需要在被测试的文件夹 建立一个 __mocks__ 的文件夹 然后建立一个同名文件 将测试的方法导出
// 相当于直接使用了 mocks 中的文件
// jest.mock('../src/4.ajax.js')

/* 方案2 只mock接口 */
jest.mock('axios') // 会去直接使用 __mocks__ 文件下的 axios

describe('测试能否正确获取数据', () => {
  it('测试getList', async () => {
    const list = await getList()
    expect(list).toEqual([1, 2, 3, 4])
  })
})
