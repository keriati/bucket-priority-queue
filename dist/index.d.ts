type Integer = number;
type Priority = Integer;

declare abstract class BucketQueue<T> {
    protected buckets: T[][];
    protected pointer: number;
    protected _size: number;
    constructor(items?: [T, Priority][]);
    abstract push(item: T, priority: Priority): void;
    abstract pop(): T | undefined;
    add(item: T, priority: Priority): void;
    offer(item: T, priority: Priority): void;
    poll(): T | undefined;
    peek(): T | undefined;
    clear(): void;
    refill(items: [T, Priority][]): void;
    has(item: T): boolean;
    contains: (item: T) => boolean;
    toArray(): T[];
    isEmpty: () => boolean;
    get size(): number;
    get length(): number;
}

declare class MaxBucketQueue<T> extends BucketQueue<T> {
    push(item: T, priority: Priority): void;
    pop(): T | undefined;
}

declare class MinBucketQueue<T> extends BucketQueue<T> {
    push(item: T, priority: Priority): void;
    pop(): T | undefined;
}

export { type Integer, MaxBucketQueue, MinBucketQueue, type Priority };
