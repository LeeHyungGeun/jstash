class State {
  constructor() {
    this.queue = [];
    this.enableTrace = true;
  }

  set(item) {
    if (item) {
      this.queue.push({
        ...item,
        read: false
      });
    }
  }

  get() {
    const unreadQueue = this.queue.filter((i) => i && !i.read);
    this.queue = this.queue.map((i) => {
      return {
        ...i,
        read: true
      }
    });
    return unreadQueue;
  }
  
  flush() {
    const flushed = [].concat(...this.queue);
    this.queue = [];
    return flushed;
  }
}

export default State;