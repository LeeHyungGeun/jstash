class View {
  constructor(state) {
    this.state = state;
    this._constructor();
  }

  _constructor() {
    this.$wrap = document.createElement('div');
    this.$style = document.createElement('style');
    document.body.appendChild(this.$wrap);
    document.head.appendChild(this.$style);
  }

  update() {
    const queue = this.state.flush();
    queue.map((item) => {
      const $div = document.createElement('div');
      $div.innerHTML = item.message || '';
      this.$wrap.appendChild($div);
    });
  }

  render() {
    this.$style.innerHTML = `
      .uiConsole-wrap {
        position: fixed;
        width: 100%;
        height: 300px;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 999999999;
        background: red;
        overflow-y: scroll;
      }
    `
    this.$wrap.classList.add('uiConsole-wrap');

    setInterval(() => {
      this.update();
    }, 60);
  }
}

export default View;