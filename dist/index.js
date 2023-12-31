"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  BucketQueue: () => BucketQueue
});
module.exports = __toCommonJS(src_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BucketQueue
});
//# sourceMappingURL=index.js.map