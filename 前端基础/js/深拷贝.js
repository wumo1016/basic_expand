// 需要递归的类型
const objectTag = 'Object'
const arrayTag = 'Array'
const mapTag = 'Map'
const setTag = 'Set'

const deepTag = [objectTag, arrayTag, mapTag, setTag]

// 需要特殊处理的类型
const regexpTag = 'RegExp'
const dateTag = 'Date'
const funcTag = 'Function'

function getType(target) {
  return Object.prototype.toString.call(target).slice(8, -1)
}

function cloneFunction(target) {
  return target
}

function cloneReg(target) {
  const reFlags = /\w*$/;
  const result = new target.constructor(target.source, reFlags.exec(target));
  result.lastIndex = target.lastIndex;
  return result;
}

function cloneFunction(target) {
  return eval('(' + target.toString() + ')');
}

function cloneOtherType(type, target) {
  const Ctor = target.constructor
  switch (type) {
    case funcTag:
      return cloneFunction(target)
    case regexpTag:
      return cloneReg(target)
    default:
      return new Ctor(target)
  }
}

function deepclone(target, map = new WeakMap()) {
  // 如果是原始类型
  if (typeof target !== 'object' && typeof target !== 'function' || target === null) {
    return target
  }

  const type = getType(target)
  // 不需要递归的
  if (!deepTag.includes(type)) {
    return cloneOtherType(type, target)
  }
  // 需要递归的
  const Ctor = target.constructor
  const cloneTarget = new Ctor()

  // 防止循环引用
  if (map.get(target)) {
    return map.get(target)
  }
  map.set(target, cloneTarget)

  // 克隆set
  if (type === setTag) {
    target.forEach(value => {
      cloneTarget.add(deepclone(value, map))
    })
    return cloneTarget
  }

  // 克隆map
  if (type === mapTag) {
    target.forEach((value, key) => {
      cloneTarget.set(key, deepclone(value, map))
    })
    return cloneTarget
  }

  // 克隆对象或数组
  const keys = Object.keys(target)
  let i = -1,
    length = keys.length;
  while (++i < length) {
    const key = keys[i]
    cloneTarget[key] = deepclone(target[key], map)
  }
  return cloneTarget
}

const target = {
  field1: 1,
  field2: undefined,
  field3: {
    child: 'child'
  },
  field4: [2, 4, 8],
  field5: true,
  field6: '123',
  empty: null,
  map: new Map(),
  set: new Set([1, 2, 3]),
  bool: new Boolean(true),
  num: new Number(2),
  str: new String(2),
  symbol: Symbol(1),
  date: new Date(),
  reg: /\d+/,
  error: new Error(),
  func1: () => {
    console.log('code秘密花园');
  },
  func2: function (a, b) {
    return a + b;
  }
};

target.func2.a = 123

const res = deepclone(target)

console.log(target, res);