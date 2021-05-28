//
// Check if a variable is a JavaScript object.
//
export function isObject (variable: unknown) {
  return Object.prototype.toString.call(variable) === '[object Object]'
}


//
// Determines whether an object is Empty or not.
//
export function isEmptyObject(obj: Object) {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
}
