import './style.css';
class View {
  constructor(state) {
    this.state = state;
    this._constructor();
  }

  _constructor() {
    this.$wrap = document.createElement('div');
    this.$root = document.createElement('div');
    this.$style = document.createElement('style');
    this.$wrap.appendChild(this.$root);
    document.body.appendChild(this.$wrap);
    document.head.appendChild(this.$style);

    this.setStyle();
  }

  setStyle() {
    this.$root.classList.add('ui-console');
    this.$wrap.classList.add('ui-console-wrap');
  }

  update() {
    const queue = this.state.flush();
    if (queue.length) {
      queue.map((item) => {
        const $div = document.createElement('div');
        // const $trace = document.createElement('div');
        // $trace.innerHTML = item.trace;
        $div.innerHTML = item.logs.join(' ') || '';
        $div.classList.add('ui-console-log', item.logType);
        // $div.appendChild($trace);

        this.$root.appendChild($div);
      });
      this.$root.scrollTop = this.$root.scrollHeight - this.$root.clientHeight;
    }
  }

  render() {

    setInterval(() => {
      this.update();
    }, 60);
  }
}

export default View;