// src/BucketQueue.ts
var BucketQueue = class {
  constructor(items = []) {
    this.buckets = /* @__PURE__ */ new Map();
    this.priorityMax = 0;
    this.priorityMin = 0;
    this._size = 0;
    for (let i = 0; i < items.length; i++) {
      const [item, priority] = items[i];
      this.push(item, priority);
    }
  }
  push(item, priority) {
    if (!this.buckets.has(priority)) {
      this.buckets.set(priority, []);
    }
    this.buckets.get(priority).push(item);
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
  popHighest() {
    if (!this._size)
      return void 0;
    const bucket = this.buckets.get(this.priorityMax);
    const item = bucket.pop();
    if (!bucket.length) {
      this.buckets.delete(this.priorityMax);
      const bucketKeys = Array.from(this.buckets.keys());
      this.priorityMax = Math.max(...bucketKeys);
      this.priorityMin = Math.min(...bucketKeys);
    }
    this._size--;
    return item;
  }
  popLowest() {
    if (!this._size)
      return void 0;
    const bucket = this.buckets.get(this.priorityMin);
    const item = bucket.pop();
    if (!bucket.length) {
      this.buckets.delete(this.priorityMin);
      const bucketKeys = Array.from(this.buckets.keys());
      this.priorityMax = Math.max(...bucketKeys);
      this.priorityMin = Math.min(...bucketKeys);
    }
    this._size--;
    return item;
  }
  get size() {
    return this._size;
  }
};
export {
  BucketQueue
};
//# sourceMappingURL=index.mjs.map