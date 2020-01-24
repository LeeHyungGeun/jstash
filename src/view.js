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
    this.$style.innerHTML = `
      .ui-console-wrap {
        font-size: 14px;
        position: fixed;
        width: 100%;
        height: 20%;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 999999999;
        color: #727579;
        background: #242424;
      }

      .ui-console {
        font-size: 2em;
        height: 100%;
        width: 100%;
        overflow-y: scroll;
      }

      .ui-console-log {
        padding: 0.2em 0.5em;
      }

      .ui-console-log.info {

      }

      .ui-console-log.warn {
        width: 100%;
        color: #74663C;
        background: #322B08;
      }
    `
    this.$root.classList.add('ui-console');
    this.$wrap.classList.add('ui-console-wrap');
  }

  update() {
    const queue = this.state.flush();
    if (queue.length) {
      queue.map((item) => {
        const $div = document.createElement('div');
        $div.innerHTML = item.logs.join(' ') || '';
        $div.classList.add('ui-console-log', item.logType);
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