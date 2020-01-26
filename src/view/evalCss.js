import { toStr, each, escapeRegExp, kebabCase, keys } from '../util';
import cssMap from './cssMap'
import themes from './themes';

let styleList = [];
let scale = 1

const evalCss = (css, container) => {
  css = toStr(css);

  for (let i = 0, len = styleList.length; i < len; i++) {
    if (styleList[i].css === css) return;
  }

  container = container || this.container || document.head;
  const el = document.createElement('style');

  el.type = 'text/css';
  container.appendChild(el);

  const style = { css, el, container };
  resetStyle(style);
  styleList.push(style);

  return style;
};

const resetStyle = ({ css, el }) => {
  css = css.replace(/(\d+)px/g, ($0, $1) => +$1 * scale + 'px')
  css = css.replace(/_/g, 'eruda-')
  each(cssMap, (val, key) => {
    css = css.replace(
      new RegExp(escapeRegExp(`$${val}:`), 'g'),
      ';' + key + ':'
    )
  })
  const _keys = keys(themes.Light)
  each(_keys, key => {
    css = css.replace(
      new RegExp(`var\\(--${kebabCase(key)}\\)`, 'g'),
      curTheme[key]
    );
  })
  el.innerText = css;
};

export default evalCss;