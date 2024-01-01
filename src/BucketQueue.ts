export type Integer = number;
export type Priority = Integer;

export class BucketQueue<T> {
  private buckets: T[][] = [];

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
    if (!this.buckets[priority]) {
      this.buckets[priority] = [];
    }
    this.buckets[priority].push(item);
    if (this._size === 0) {
      this.priorityMin = priority;
      this.priorityMax = priority;
    } else {
      if (priority > this.priorityMax) this.priorityMax = priority;
      if (priority < this.priorityMin) this.priorityMin = priority;
    }
    this._size++;
  }

  private pop(position: "priorityMin" | "priorityMax"): T | undefined {
    if (!this._size) return undefined;
    const bucket = this.buckets[this[position]];
    const item = bucket!.pop();
    if (bucket.length === 0) {
      for (let i = 0; i < this.buckets.length; i++) {
        if (this.buckets[i]?.length > 0) {
          this.priorityMin = i;
          break;
        }
      }
      for (let i = this.buckets.length - 1; i >= 0; i--) {
        if (this.buckets[i]?.length > 0) {
          this.priorityMax = i;
          break;
        }
      }
    }
    this._size--;
    return item;
  }

  popHighest(): T | undefined {
    return this.pop("priorityMax");
  }

  popLowest(): T | undefined {
    return this.pop("priorityMin");
  }

  get size(): Integer {
    return this._size;
  }
}
