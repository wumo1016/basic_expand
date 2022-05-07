// node不支持es6 可以使用babel转义
// @babel/core @babel/preset-env
// jest会自动进行babel转换

import { parser, stringfy } from '../src/1.qs'

describe('测试qs库是否符合规范', () => {
  it('测试parser是否合法', () => {
    expect(parser('?name=wyb&age=18')).toEqual({ name: 'wyb', age: '18' })
  })
  it('测试stringfy是否合法', () => {
    expect(stringfy({ name: 'wyb', age: '18' })).toBe('name=wyb&age=18')
  })
})
