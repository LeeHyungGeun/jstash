import './style.css';
class View {
  constructor(state) {
    this.state = state;
    this._constructor();
  }

  _constructor() {
    this.$wrap = document.createElement('div');
    this.$root = document.createElement('div');
    this.$wrap.appendChild(this.$root);
    document.body.appendChild(this.$wrap);
    this.setStyle();
  }

  setStyle() {
    this.$root.classList.add('ui-console');
    this.$wrap.classList.add('ui-console-wrap');
  }

  update() {
    const queue = this.state.get();
    if (queue.length) {
      queue.map((item) => {
        const $div = document.createElement('div');
        const $contentWrap = document.createElement('div');
        const $log = document.createElement('span');
        const $button = document.createElement('span');
        const $traceContent = document.createElement('div');
        $log.innerHTML = item.logs.join(' ') || '';
        $button.innerHTML = 'trace';
        $button.onclick = (e) => this.toggleTrace($traceContent, item);
        $contentWrap.appendChild($log);
        $contentWrap.appendChild($button);
        $div.appendChild($contentWrap);
        $div.appendChild($traceContent);
        $contentWrap.classList.add('ui-console-log-wrap');
        $traceContent.classList.add('ui-console-trace--content');
        $button.classList.add('ui-console-log--button');
        $log.classList.add('ui-console-log--content');
        $div.classList.add('ui-console-log', item.logType);
        this.$root.appendChild($div);
      });
      this.$root.scrollTop = this.$root.scrollHeight - this.$root.clientHeight;
    }
  }

  toggleTrace($e, item) {
    if ($e.innerHTML) {
      $e.innerHTML = '';
      return;
    } else {
      const $div = document.createElement('div');
      $e.innerHTML = '';
      item.trace.forEach(i => {
        $div.innerHTML += `<div>${i}</div>`;
      });
      $e.appendChild($div);
    }
  }

  render() {
    setInterval(() => {
      this.update();
    }, 60);
  }
}

export default View;