class Log {
  constructor(state) {
    this.state = state;
    this.console = {};
    this.monkeyPatching();
  }

  monkeyPatching() {
    const that = this;
    const methods = ['log', 'info', 'warn', 'debug', 'error'];

    if (!window.console) {
      window.console = {}
    } else {
      methods.map((method) => {
        that.console[method] = window.console[method];
      });
      that.console.time = window.console.time;
      that.console.timeEnd = window.console.timeEnd;
      that.console.clear = window.console.clear;
    }

    methods.map((method) => {
      window.console[method] = (...args) => {
        this.state.set({
          logType: method,
          logs: args
        });
        that.console[method](...args);
      };
    });
  }
}

export default Log;