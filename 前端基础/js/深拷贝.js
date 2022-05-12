;(function () {
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
    const reFlags = /\w*$/
    const result = new target.constructor(target.source, reFlags.exec(target))
    result.lastIndex = target.lastIndex
    return result
  }

  function cloneFunction(target) {
    return eval('(' + target.toString() + ')')
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
    if (
      (typeof target !== 'object' && typeof target !== 'function') ||
      target === null
    ) {
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
      length = keys.length
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
      console.log('code秘密花园')
    },
    func2: function (a, b) {
      return a + b
    }
  }

  target.func2.a = 123

  const res = deepclone(target)

  console.log(target, res)
})
;(function () {
  let obj = {
    married: true,
    age: 10,
    name: 'zhufeng',
    girlfriend: null,
    boyfriend: undefined,
    flag: Symbol('man'),
    home: {
      name: '北京'
    },
    set: new Set(),
    map: new Map(),
    getName: function () {},
    hobbies: ['1', '2', '3'],
    error: new Error('我错了'),
    pattern: /^reg$/,
    math: Math,
    json: JSON,
    document: document,
    window: window
  }
  obj.set.add(1)
  obj.map.set('name', 'zhufeng')
  obj.obj = obj

  function getType(source) {
    return Object.prototype.toString.call(source)
  }

  // 对类型进行分类
  let OBJECT_TYPES = [
    {},
    [],
    new Map(),
    new Set(),
    new Error(),
    new Date(),
    /^$/
  ].map(item => getType(item))
  let MAP_TYPE = getType(new Map())
  let SET_TYPE = getType(new Set())
  let SYMBOL_TYPE = getType(Symbol('1'))
  let REGEXP_TYPE = getType(/^$/)
  let CONSTRUCT_TYPES = [new Error(), new Date()].map(item => getType(item))

  function clone(source, map = new Map()) {
    let type = getType(source)
    if (!OBJECT_TYPES.includes(type)) {
      // 基本类型 直接返回
      return source
    }
    if (map.get(source)) {
      return map.get(source)
    }
    if (CONSTRUCT_TYPES.includes(type)) {
      return new source.constructor(source)
    }
    const target = new source.constructor()
    map.set(source, target)
    if (SYMBOL_TYPE == type) {
      return Object(Symbol.prototype.valueOf.call(source))
    }
    if (REGEXP_TYPE == type) {
      const flags = /\w*$/
      const target = new RegExp(source.source, flags.exec(source))
      target.lastIndex = source.lastIndex
      return target
    }
    if (SET_TYPE == type) {
      source.forEach(value => target.add(clone(value, map)))
      return target
    }
    if (MAP_TYPE == type) {
      source.forEach((value, key) => target.set(key, clone(value, map)))
      return target
    }

    // 处理普通对象和数组 while比for循环快一点点
    // for (const key in source) {
    //   target[key] = clone(source[key], map)
    // }
    let keys = Object.keys(source)
    let length = keys.length
    let index = 0
    while (index < length) {
      let key = keys[index]
      target[key] = clone(source[key], map)
      index++
    }
    return target
  }

  console.time('cost')
  for (let i = 0; i < 100000; i++) {
    clone(obj)
  }
  console.timeEnd('cost')
})
