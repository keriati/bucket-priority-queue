import { Priority } from "./types";
import { BucketQueue } from "./BucketQueue";

export class MaxBucketQueue<T> extends BucketQueue<T> {
  push(item: T, priority: Priority): void {
    if (!this.buckets[priority]) this.buckets[priority] = [];

    this.buckets[priority].push(item);

    if (this._size === 0) {
      this.pointer = priority;
    } else {
      if (priority > this.pointer) this.pointer = priority;
    }

    this._size++;
  }

  pop(): T | undefined {
    if (!this._size) return undefined;

    const bucket = this.buckets[this.pointer];
    const item = bucket!.pop();

    if (bucket.length === 0) {
      for (let i = this.buckets.length - 1; i >= 0; i--) {
        if (this.buckets[i]?.length > 0) {
          this.pointer = i;
          break;
        }
      }
    }

    this._size--;

    return item;
  }
}
