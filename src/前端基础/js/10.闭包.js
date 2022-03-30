function one() {
  var a = {
    name: 1
  };

  function two() {
    var b = 2;

    function three() {
      var c = 3;
      return () => console.log(a, b, c);
    }
    return three();
  }
  return two();
}
var fn = one();
fn();

let globalEC = {
  this: globalThis,
  outer: null,
  VE: {
    one: () => {},
    fn: undefined
  }
}
//globalEC.VE.fn = globalEC.VE.one();
let oneEC = {
  outer: globalEC,
  VE: {
    a: 1,
    two: () => {}
  }
}

let twoEC = {
  outer: oneEC,
  VE: {
    b: 2,
    three: () => {}
  }
}

let threeEC = {
  outer: twoEC,
  VE: {
    c: 3
  }
}

var closures = [{
  c: 3
}, {
  b: 2
}, {
  a: 1
}];

let fnEc = {
  outer: globalEC,
  closures,
  VE: {
    d: 4
  }
}