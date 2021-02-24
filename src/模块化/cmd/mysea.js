const factories = {}
const modules = {}

function require(name) {
  let res = modules[name]
  if (res) return res
  const factory = factories[name]
  const exports = {}
  factory(require, exports)
  modules[name] = exports
  return exports
}

function define(name, factory) {
  factories[name] = factory
}

function use(name) {
  require(name)
}

define('addModule', function (require, exports) {
  exports.add = (a, b) => {
    return a + b
  }
})

define('index', function (require, exports) {
  const addmodule = require('addModule')
  const a = require('addModule')
  console.log(addmodule.add(1, 2));
})

use('index')
