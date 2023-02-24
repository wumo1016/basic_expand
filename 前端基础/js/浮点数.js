/* 
- js采用二进制浮点数表示数字 (所有遵循IEEE 754规范的语言都是如此)
- 整数范围是: -2^53 ~ 2^53
*/

/* ---------------------------- 0.1 + 0.2 !== 0.3的问题 ---------------------------- */
;(function () {
  // 1.原生方法
  console.log(parseFloat((0.1 + 0.2).toFixed(10)))

  // 2.先放大, 再缩小
  function accAdd(n1, n2) {
    // 拿到小数点后数字的个数
    const getNum = (n) => {
      try {
        return n.toString().split('.')[1].length
      } catch (e) {
        return 0
      }
    }
    let r1 = getNum(n1),
      r2 = getNum(n2),
      m = Math.pow(10, Math.max(r1, r2)) // 需要方法缩小多少倍

    return Number(BigInt(n1 * m) + BigInt(n2 * m)) / m
  }
  console.log(accAdd(0.1, 0.2))

  // 3.使用 Number.EPSILON(无限接近于0) - 缺点: 兼容性问题
  // 解决兼容性问题
  Number.EPSILON = (function () {
    return Number.EPSILON ? Number.EPSILON : Math.pow(2, -52)
  })()
  console.log(0.1 + 0.2 - 0.3 < Number.EPSILON)

  // 5.使用第三方库 decimal.js bignumber.js
})()
