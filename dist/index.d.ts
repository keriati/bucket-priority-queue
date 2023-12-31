type Integer = number;
type Priority = Integer;
declare class BucketQueue<T> {
    buckets: Map<number, T[]>;
    private priorityMax;
    private priorityMin;
    private _size;
    constructor(items?: [T, Priority][]);
    push(item: T, priority: Priority): void;
    popHighest(): T | undefined;
    popLowest(): T | undefined;
    get size(): Integer;
}

export { BucketQueue };
