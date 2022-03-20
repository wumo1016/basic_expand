describe('测试常用匹配器', () => {
  it('相等', () => {
    expect(1 + 1).toBe(2) // ===
    expect(1 + 1).toEqual(2) // 比较值是否相等
    expect(null).toBeNull() // 是否为null
    expect(true).toBeTruthy() // 除了 false, 0, '', null, undefined, NaN 都是true
  })

  it('不相等', () => {
    expect(1 + 1).not.toBe(3) // !==
    expect(1 + 1).toBeLessThan(3) // <
    expect(1 + 1).toBeLessThanOrEqual(2) // <=
    expect(1 + 1).toBeGreaterThan(1) // >
    expect(1 + 1).toBeGreaterThanOrEqual(1) // >=
  })

  it('包含关系', () => {
    expect('wyb').toContain('w')
    expect('wyb').toMatch(/yb/) // 效果包含toContain 可以使用正则
    // expect(1 + 1).toBeLessThanOrEqual(2) // <=
    // expect(1 + 1).toBeGreaterThan(1) // >
    // expect(1 + 1).toBeGreaterThanOrEqual(1) // >=
  })

  // 只测试only的 这个模块内其他的会跳过
  // it.only('包含关系', () => {
  //   expect('wyb').toContain('w')
  //   expect('wyb').toMatch(/yb/)
  // })
})
