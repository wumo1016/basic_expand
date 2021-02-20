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
obj.set.add(1);
obj.map.set('name', 'zhufeng');
obj.obj = obj;

function getType(source) {
  return Object.prototype.toString.call(source)
}

// 对类型进行分类
let OBJECT_TYPES = [{},
  [], new Map(), new Set(), new Error(), new Date(), /^$/
].map(item => getType(item))
let MAP_TYPE = getType(new Map());
let SET_TYPE = getType(new Set());
let SYMBOL_TYPE = getType(Symbol('1'));
let REGEXP_TYPE = getType(/^$/);
let CONSTRUCT_TYPES = [new Error(), new Date()].map(item => getType(item));

function clone(source, map = new Map()) {
  let type = getType(source)
  if (!OBJECT_TYPES.includes(type)) { // 基本类型 直接返回
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
    const flags = /\w*$/;
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
  let keys = Object.keys(source);
  let length = keys.length;
  let index = 0;
  while (index < length) {
    let key = keys[index];
    target[key] = clone(source[key], map);
    index++;
  }
  return target

}

console.time('cost');
for (let i = 0; i < 100000; i++) {
  clone(obj);
}
console.timeEnd('cost');
