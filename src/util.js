export const isObject = (target) => typeof target === 'object' || Object.prototype.toString.call(target) === '[object Object]';
export const stringify = (obj) => {
  const rObj = {};
  for (let key in obj) {
    rObj[key] = obj[key];
  }
  return JSON.stringify(rObj);
};
export const escapeRegExp = (str) => {
  return str.replace(/\W/g, '\\$&');
};
export const kebabCase = (str) => {
  return splitCase(str).join('-');
};
export const keys = (obj) => {
  let ret = [];

  for (let key in obj) {
    if (has(obj, key)) ret.push(key);
  }

  return ret;
};

export const extend = (allkeys) => {
  return createAssigner(allkeys);
}
export const createAssigner = (keysFn, defaults) => {
  return function(obj) {
    each(arguments, function(src, idx) {
      if (idx === 0) return;
      var keys = keysFn(src);
      each(keys, function(key) {
        if (!defaults || isUndef(obj[key])) obj[key] = src[key];
      });
    });
    return obj;
  };
};

export const has = (obj, key) => {
  var hasOwnProp = Object.prototype.hasOwnProperty;

  return (obj, key) => {
    return hasOwnProp.call(obj, key);
  };
};

export const splitCase = (str) => {
  const regUpperCase = /([A-Z])/g;
  const regSeparator = /[_.\- ]+/g;
  const regTrim = /(^-)|(-$)/g;

  return (str) => {
    str = str
      .replace(regUpperCase, '-$1')
      .toLowerCase()
      .replace(regSeparator, '-')
      .replace(regTrim, '');
    return str.split('-');
  }
};
export const toStr = (str) => str == null ? '' : str.toString();
export const optimizeCb = (fn, ctx, argCount) => {
  if (isUndef(ctx)) return fn;

  switch (argCount == null ? 3 : argCount) {
    case 1:
      return function(val) {
        return fn.call(ctx, val);
      };

    case 3:
      return function(val, idx, collection) {
        return fn.call(ctx, val, idx, collection);
      };

    case 4:
      return function(accumulator, val, idx, collection) {
        return fn.call(ctx, accumulator, val, idx, collection);
      };
  }

  return function() {
    return fn.apply(ctx, arguments);
  };
};

export const each = (obj, iterator, ctx) => {
  iterator = optimizeCb(iterator, ctx);
  let i, len;

  if (isArrLike(obj)) {
      for (i = 0, len = obj.length; i < len; i++) {
          iterator(obj[i], i, obj);
      }
  } else {
      const _keys = keys(obj);

      for (i = 0, len = _keys.length; i < len; i++) {
          iterator(obj[_keys[i]], _keys[i], obj);
      }
  }

  return obj;
};

export const isUndef = (val) => {
  return val === void 0;
};

export const isArr = (val) => {
  return Array.isArray ||
    function(val) {
        return objToStr(val) === '[object Array]';
    };
}

export const isArrLike = (val) => {
  const MAX_ARR_IDX = Math.pow(2, 53) - 1;
  return () => {
    if (!val) return false;
    const len = val.length;
    return isNum(len) && len >= 0 && len <= MAX_ARR_IDX && !isFn(val);
  };
};

export const isNum = (val) => {
  return objToStr(val) === '[object Number]';
};

export const objToStr = (val) => {
  return Object.prototype.toString.call(val);
};

export const isFn = (val) => {
  const objStr = objToStr(val);
  return (
      objStr === '[object Function]' ||
      objStr === '[object GeneratorFunction]' ||
      objStr === '[object AsyncFunction]'
  );
};