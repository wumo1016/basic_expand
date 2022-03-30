function jsonStringify(data) {
  let type = typeof data;

  if (type !== 'object') {
    let result = data;
    //data 可能是基础数据类型的情况在这里处理
    if (Number.isNaN(data) || data === Infinity) {
      //NaN 和 Infinity 序列化返回 "null"
      result = "null";
    } else if (type === 'function' || type === 'undefined' || type === 'symbol') {
      // 由于 function 序列化返回 undefined，因此和 undefined、symbol 一起处理
      return undefined;
    } else if (type === 'string') {
      result = '"' + data + '"';
    }
    return String(result);
  } else if (type === 'object') {
    if (data === null) {
      return "null" // 第01讲有讲过 typeof null 为'object'的特殊情况
    } else if (data.toJSON && typeof data.toJSON === 'function') {
      return jsonStringify(data.toJSON());
    } else if (data instanceof Array) {
      let result = [];
      //如果是数组，那么数组里面的每一项类型又有可能是多样的
      data.forEach((item, index) => {
        if (typeof item === 'undefined' || typeof item === 'function' || typeof item === 'symbol') {
          result[index] = "null";
        } else {
          result[index] = jsonStringify(item);
        }
      });
      result = "[" + result + "]";
      return result.replace(/'/g, '"');
    } else {
      // 处理普通对象
      let result = [];
      Object.keys(data).forEach((item, index) => {
        if (typeof item !== 'symbol') {
          //key 如果是 symbol 对象，忽略
          if (data[item] !== undefined && typeof data[item] !== 'function' && typeof data[item] !== 'symbol') {
            //键值如果是 undefined、function、symbol 为属性值，忽略
            result.push('"' + item + '"' + ":" + jsonStringify(data[item]));
          }
        }
      });
      return ("{" + result + "}").replace(/'/g, '"');
    }
  }
}