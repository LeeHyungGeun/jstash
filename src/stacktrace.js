import _StackTrace from 'stacktrace-js';

class StackTrace {
  get() {
    return _StackTrace.get().then(this.callback).catch(this.errback);
  }

  callback(stackframes) {
    const stringifiedStack = stackframes.map(function(sf) {
      return sf.toString();
    });
    return stringifiedStack;
  }

  errback(err) {
    return err.message;
  }
}

export default StackTrace;
