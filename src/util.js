export const isObject = (target) => typeof target === 'object' || Object.prototype.toString.call(target) === '[object Object]';
export const stringify = (obj) => {
  const rObj = {};
  for (let key in obj) {
    rObj[key] = obj[key];
  }
  return JSON.stringify(rObj);
};
export const toStr = (str) => str == null ? '' : str.toString();