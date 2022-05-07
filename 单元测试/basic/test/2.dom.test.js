/**
 * @jest-environment jsdom
 */

import { removeNode } from '../src/2.dom'

describe('测试dom库', () => {
  it('测试删除节点', () => {
    // js-dom 可以在dom环境下模拟一套dom结构

    // 先创建一个节点放到页面中 然后调用删除方法 再看一下这个元素是否还存在
    const div = document.createElement('div')
    div.id = 'test'
    document.body.appendChild(div)
    let ele = document.getElementById('test')
    expect(ele).not.toBeNull() // 是否加到页面中了
    removeNode(ele)
    ele = document.getElementById('test')
    expect(ele).toBeNull()
  })
})
