import { Priority } from "./types";

export abstract class BucketQueue<T> {
  protected buckets: T[][] = [];

  protected pointer = 0;

  protected _size = 0;

  constructor(items: [T, Priority][] = []) {
    for (let i = 0; i < items.length; i++) {
      this.push(items[i][0], items[i][1]);
    }
  }

  abstract push(item: T, priority: Priority): void;

  abstract pop(): T | undefined;

  add(item: T, priority: Priority): void {
    this.push(item, priority);
  }

  offer(item: T, priority: Priority): void {
    this.push(item, priority);
  }

  poll(): T | undefined {
    return this.pop();
  }

  peek(): T | undefined {
    if (!this._size) return undefined;

    const bucket = this.buckets[this.pointer];

    return bucket[bucket.length - 1];
  }

  clear(): void {
    this.buckets = [];
    this.pointer = 0;
    this._size = 0;
  }

  refill(items: [T, Priority][]): void {
    this.clear();
    for (let i = 0; i < items.length; i++) {
      this.push(items[i][0], items[i][1]);
    }
  }

  has(item: T): boolean {
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]?.includes(item)) return true;
    }
    return false;
  }

  contains: (item: T) => boolean = this.has;

  toArray(): T[] {
    const array: T[] = [];
    for (let i = 0; i < this.buckets.length; i++) {
      array.push(...this.buckets[i]);
    }
    return array;
  }

  isEmpty = (): boolean => this._size === 0;

  get size(): number {
    return this._size;
  }

  get length(): number {
    return this._size;
  }
}
