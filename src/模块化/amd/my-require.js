let moduleFactory = {};

function define(name, factory) {
  moduleFactory[name] = factory;
}

function require(dependencies, callback) {
  callback(...dependencies.map(item => moduleFactory[item]()));
}

define('addModule', function () {
  function add(a, b) {
    return a + b;
  }
  return {
    add
  };
});

define('minusModule', function () {
  function minus(a, b) {
    return a - b;
  }
  return {
    minus
  };
});

require(['addModule', 'minusModule'], function (addModule, minusModule) {
  console.log(addModule.add(2, 2), minusModule.minus(2, 2));
});
