/* --------------- 冒泡 -------------------- */
;(function () {
  function sort(list) {
    const len = list.length
    for (let i = 0; i < len - 1; i++) {
      for (let j = 0; j < len - 1 - i; j++) {
        if (list[j] > list[j + 1]) {
          ;[list[j], list[j + 1]] = [list[j + 1], list[j]]
        }
      }
    }
    return list
  }

  const data = [3, 4, 2, 5, 1, 7, 6, 10, 9, 8]
  console.log(sort(data))
})

/* --------------- 插入 -------------------- */
;(function () {
  function sort(nums) {
    const len = nums.length
    for (let i = 1; i < len; i++) {
      const val = nums[i]
      let j = i
      while (j > 0 && nums[j - 1] > val) {
        nums[j] = nums[j - 1]
        j--
      }
      if (j !== i) nums[j] = val
    }
    return nums
  }
  const data = [3, 4, 2, 5, 1, 7, 6, 10, 9, 8]
  console.log(sort(data))
})

/* --------------- 快速 -------------------- */
;(function () {
  const data = [3, 4, 4, 5, 3, 1, 5, 6, 4, 3, 2, 5]
  console.log(sort(data))

  function sort(list) {
    const len = list.length
    if (len < 2) return list
    const [left, center, right] = [[], [], []]
    const val = list[0]
    for (let i = 0; i < len; i++) {
      const cur = list[i]
      if (cur > val) {
        right.push(cur)
      } else if (cur < val) {
        left.push(cur)
      } else {
        center.push(cur)
      }
    }
    return sort(left).concat(center, sort(right))
  }
})

/* --------------- 归并 -------------------- */
;(function () {
  const data = [3, 4, 4, 5, 3, 1, 5, 6, 4, 3, 2, 5]
  console.log(sort(data))

  function sort(nums) {
    const len = nums.length
    if (len < 2) return nums
    const c = (len / 2) >> 0
    const [left, right, res] = [
      sortArray(nums.slice(0, c)),
      sortArray(nums.slice(c)),
      []
    ]
    while (left.length && right.length) {
      if (left[0] <= right[0]) {
        res.push(left.shift())
      } else {
        res.push(right.shift())
      }
    }
    return res.concat(left, right)
  }
})

/* --------------- 选择 -------------------- */
;(function () {
  function sort(list) {
    const len = list.length
    for (let i = 0; i < len - 1; i++) {
      let min = i
      for (let j = i + 1; j < len; j++) {
        if (list[j] < list[min]) min = j
      }
      if (min !== i) [list[i], list[min]] = [list[min], list[i]]
    }
    return list
  }

  const data = [3, 4, 4, 5, 3, 2, 5, 6, 4, 3, 22, 5, 3]
  console.log(sort(data))
})
