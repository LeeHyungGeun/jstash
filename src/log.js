import StackTrace from './stacktrace';

class Log {
  constructor(state) {
    this.state = state;
    this.console = {};
    this.monkeyPatching();
    this.stackTrace = new StackTrace();
  }

  // Reference: https://kjwsx23.tistory.com/285
  getStackTrace () {
    let stack = new Error().stack || ''; stack = stack.split('\n').map(function (line) { return line.trim(); }); return stack.splice(stack[0] == 'Error' ? 2 : 1);
  }

  monkeyPatching() {
    const that = this;
    const methods = ['log', 'info', 'warn', 'debug', 'error'];
    const $window = window;

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
      window.console[method] = async (...args) => {
        that.state.set({
          logType: method,
          logs: args,
          // trace: that.getStackTrace()
          trace: await that.stackTrace.get()
        });
        that.console[method](...args);
      };
    });
  }
}

export default Log;