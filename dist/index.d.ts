type Integer = number;
type Priority = Integer;
declare class BucketQueue<T> {
    private buckets;
    private priorityMax;
    private priorityMin;
    private _size;
    constructor(items?: [T, Priority][]);
    push(item: T, priority: Priority): void;
    private pop;
    popHighest(): T | undefined;
    popLowest(): T | undefined;
    get size(): Integer;
}

export { BucketQueue };
