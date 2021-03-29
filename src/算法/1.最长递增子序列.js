const list = [2, 3, 1, 5, 6, 8, 7, 9, 4]

/* 求最大递增的个数
    1.准备一个新数组，遍历原数组
    2.如果当前比新数组的最后一个大，直接push
    3.否则找到新数组中第一个比当前项大的，替换掉
*/


function getSequence(list) { // 最终需要获取的都是索引
  let len = list.length
  const result = [0] // 先保存第一个
  const p = list.slice(0) // 用来存放索引
  let start
  let end
  let middle

  for (let i = 0; i < list.length; i++) {
    const arrI = list[i];
    if (arrI !== 0) {
      const resultLastIndex = result[result.length - 1]
      if (list[resultLastIndex] < arrI) {
        p[i] = resultLastIndex // 如果是新增 当前项的的前一个就是新数组中的最后一个
        result.push(i)
        continue
      }

      // 二分查找 找到第一个比当前值大的那一个
      start = 0
      end = result.length - 1
      while (start < end) {
        middle = ((start + end) / 2) | 0 // 找到中间位置 如果是小数 取前面一个
        if (list[result[middle]] < arrI) {
          start = middle + 1
        } else {
          end = middle
        }
      }
      if (list[result[start]] > arrI) { // 只有比当前项大才替换
        if (start > 0) { // 只有不是第一个 才需要标记前面一个是谁
          p[i] = result[start - 1]
        }
        result[start] = i // 替换掉
      }
    }
  }

  // 从后面开始找 因为最后一个肯定是最大得
  // 找到每个值的前一个值 替换掉
  len = result.length
  let last = result[len - 1]
  while (len-- > 0) {
    result[len] = last
    last = p[last]
  }

  return result

}

console.log(getSequence(list));

// 正确索引 [0, 1, 3, 4, 6, 7]

/* 
result中的每个记录都要记录自己前面的一个值是谁
等后来 从最后开始找 每个值都找自己对应前面的一个就行
*/