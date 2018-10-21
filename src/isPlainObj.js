function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false

  let proto = obj
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto)
  }

  return Object.getPrototypeOf(obj) === proto
}

let a = {
  firstName: 'Abhishek',
  lastName: 'Das',
};
let b = Object.create(a);
console.log(isPlainObject(a)); // true
console.log(isPlainObject(b)); // false

// plain object are object that have one level in prototype chain,
// mostly it is Object.

// in the above example `b` is not a plain object as it is
// created from `a`
