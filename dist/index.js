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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BucketQueue
});
//# sourceMappingURL=index.js.map