// src/BucketQueue.ts
var BucketQueue = class {
  constructor(items = []) {
    this.buckets = new Array(100);
    this.priorityMax = 0;
    this.priorityMin = 0;
    this._size = 0;
    for (let i = 0; i < items.length; i++) {
      const [item, priority] = items[i];
      this.push(item, priority);
    }
  }
  push(item, priority) {
    if (!this.buckets[priority]) {
      this.buckets[priority] = new Array(1e3);
    }
    this.buckets[priority].push(item);
    if (this._size === 0) {
      this.priorityMin = priority;
      this.priorityMax = priority;
    } else {
      if (priority > this.priorityMax)
        this.priorityMax = priority;
      if (priority < this.priorityMin)
        this.priorityMin = priority;
    }
    this._size++;
  }
  pop(position) {
    var _a, _b;
    if (!this._size)
      return void 0;
    const bucket = this.buckets[this[position]];
    const item = bucket.pop();
    if (!bucket.length) {
      for (let i = 0; i < this.buckets.length; i++) {
        if (((_a = this.buckets[i]) == null ? void 0 : _a.length) > 0) {
          this.priorityMin = i;
          break;
        }
      }
      for (let i = this.buckets.length - 1; i >= 0; i--) {
        if (((_b = this.buckets[i]) == null ? void 0 : _b.length) > 0) {
          this.priorityMax = i;
          break;
        }
      }
    }
    this._size--;
    return item;
  }
  popHighest() {
    return this.pop("priorityMax");
  }
  popLowest() {
    return this.pop("priorityMin");
  }
  get size() {
    return this._size;
  }
};
export {
  BucketQueue
};
//# sourceMappingURL=index.mjs.map