// reduce
// 前提是数组不能为空
// 如果只有一个值 直接返回 不走循环

Array.prototype.myreduce = function (cb, prev) {
  for (let i = 0; i < this.length; i++) {
    if (!prev) {
      prev = this[i++]
    }
    prev = cb(prev, this[i], i, this)
  }
  return prev
};

(function () {
  const list = [1, 2, 3, 4]
  const total = list.myreduce((prev, next, index, array) => {
    console.log(prev, next);
    return prev + next
  }, 1)
  console.log(total);
});

// 实现一个 compose
(function () {

  function sum(a, b) {
    return a + b
  }

  function len(str) {
    return str.length
  }

  function addPrefix(str) {
    return '$' + str
  }

  // a b => $2
  console.log(addPrefix(len(sum('a', 'b'))));

  function compose(...fns) {
    return function (...args) {
      return fns.reduceRight((prev, current) => current(prev), fns.pop()(...args))
    }
  }

  console.log(compose(addPrefix, len, sum)('a', 'b'));

})();
