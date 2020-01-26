import { isObject, stringify } from '../util';
import evalCss from './evalCss';
class View {
  constructor(state) {
    this.state = state;
    this._constructor();
  }

  _constructor() {
    this._initContainer();
    this._initDevTools(this._$el);
    // const $div = document.createElement('div');
    // this._$el.appendChild($div)
  }

  _initContainer(el, useShadowDom = true) {
    if (!el) {
      el = document.createElement('div');
      document.documentElement.appendChild(el);
      el.style.all = 'initial';
    }

    let shadowRoot;
    if (useShadowDom) {
      if (el.attachShadow) {
        shadowRoot = el.attachShadow({ mode: 'open' });
      } else if (el.createShadowRoot) {
        shadowRoot = el.createShadowRoot();
      }
      if (shadowRoot) {
        el = document.createElement('div')
        shadowRoot.appendChild(el);
        this._shadowRoot = shadowRoot;
      }
    }

    Object.assign(el, {
      id: 'jstash',
      className: 'jstash-container',
      contentEditable: false
    });

    window.$el = this._$el = el;
  }

  _initDevTools(el) {
    this._style = evalCss(require('./style.scss'), el);
  }

  // setStyle() {
  //   this.$root.classList.add('ui-console');
  //   this.$wrap.classList.add('ui-console-wrap');
  // }

  // update() {
  //   const queue = this.state.get();
  //   if (queue.length) {
  //     queue.map((item) => {
  //       const $div = document.createElement('div');
  //       const $contentWrap = document.createElement('div');
  //       const $log = document.createElement('span');
  //       const $button = document.createElement('span');
  //       const $traceContent = document.createElement('div');
  //       $log.innerHTML = item.logs.map(l => isObject(l) ? stringify(l) : l).join(' ') || '';
  //       $button.innerHTML = 'trace';
  //       $button.onclick = (e) => this.toggleTrace($traceContent, item);
  //       $contentWrap.appendChild($log);
  //       $contentWrap.appendChild($button);
  //       $div.appendChild($contentWrap);
  //       $div.appendChild($traceContent);
  //       $contentWrap.classList.add('ui-console-log-wrap');
  //       $traceContent.classList.add('ui-console-trace--content');
  //       $button.classList.add('ui-console-log--button');
  //       $log.classList.add('ui-console-log--content');
  //       $div.classList.add('ui-console-log', item.logType);
  //       this.$root.appendChild($div);
  //     });
  //     this.$root.scrollTop = this.$root.scrollHeight - this.$root.clientHeight;
  //   }
  // }

  // toggleTrace($e, item) {
  //   const tpl = require('./trace.hbs');
  //   const r = data => tpl(data);
  //   $e.innerHTML = $e.innerHTML ? '' : r(item);
  // }

  render() {
    // setInterval(() => {
    //   this.update();
    // }, 60);
  }
}

export default View;