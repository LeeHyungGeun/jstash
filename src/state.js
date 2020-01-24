class State {
  constructor() {
    this.queue = [];
    this.enableTrace = true;
  }

  set(item) {
    this.queue.push(item);
  }

  get() {
    return this.queue.map(i => i);
  }
  
  flush() {
    const flushed = [].concat(...this.queue);
    this.queue = [];
    return flushed;
  }
}

export default State;