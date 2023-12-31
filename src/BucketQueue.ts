export type Integer = number;
export type Priority = Integer;

export class BucketQueue<T> {
  buckets: Map<number, T[]> = new Map();

  private priorityMax = 0;

  private priorityMin = 0;

  private _size = 0;

  constructor(items: [T, Priority][] = []) {
    for (let i = 0; i < items.length; i++) {
      const [item, priority] = items[i];
      this.push(item, priority);
    }
  }

  push(item: T, priority: Priority): void {
    if (!this.buckets.has(priority)) {
      this.buckets.set(priority, []);
    }
    this.buckets.get(priority)!.push(item);
    if (this._size === 0) {
      this.priorityMin = priority;
      this.priorityMax = priority;
    } else {
      if (priority > this.priorityMax) this.priorityMax = priority;
      if (priority < this.priorityMin) this.priorityMin = priority;
    }
    this._size++;
  }

  popHighest(): T | undefined {
    if (!this._size) return undefined;
    const bucket = this.buckets.get(this.priorityMax);
    const item = bucket!.pop();
    if (!bucket!.length) {
      this.buckets.delete(this.priorityMax);
      const bucketKeys = Array.from(this.buckets.keys());
      this.priorityMax = Math.max(...bucketKeys);
      this.priorityMin = Math.min(...bucketKeys);
    }
    this._size--;
    return item;
  }

  popLowest(): T | undefined {
    if (!this._size) return undefined;
    const bucket = this.buckets.get(this.priorityMin);
    const item = bucket!.pop();
    if (!bucket!.length) {
      this.buckets.delete(this.priorityMin);
      const bucketKeys = Array.from(this.buckets.keys());
      this.priorityMax = Math.max(...bucketKeys);
      this.priorityMin = Math.min(...bucketKeys);
    }
    this._size--;
    return item;
  }

  get size(): Integer {
    return this._size;
  }
}
