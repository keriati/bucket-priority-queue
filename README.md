# Bucket Queue in TypeScript
[![npm](https://img.shields.io/npm/v/bucket-priority-queue.svg?style=flat-square)](https://www.npmjs.com/package/bucket-priority-queue)
[![Test Status](https://github.com/keriati/bucket-priority-queue/actions/workflows/coverage.yml/badge.svg)](https://github.com/keriati/bucket-priority-queue/actions/workflows/coverage.yml)
[![codecov](https://codecov.io/gh/keriati/bucket-priority-queue/graph/badge.svg?token=UYXBHXOSOV)](https://codecov.io/gh/keriati/bucket-priority-queue)

## Overview

`BucketQueue` is a priority queue implementation ideal for algorithms requiring efficient, priority-based item
management, such as Dijkstra's algorithm. It's designed to offer quick enqueue and dequeue operations, particularly
when the **priority key space is small and comprised of positive integers**, a common scenario in many programming puzzles.
See [Bucket queue on Wikipedia](https://en.wikipedia.org/wiki/Bucket_queue) for more.

## Benchmarks

Compared to other Heap-based priority queue implementations, `BucketQueue` can offer a significant performance boost
given the right conditions. The following benchmarks - about pop and push operations - were run on a 2021 MacBook Pro
with Apple M1 Max chip, Node.js 20.10.0:

    BucketQueue x 49,750,443 ops/sec ±0.14% (101 runs sampled)
    HeapJS x 12,203,990 ops/sec ±0.18% (99 runs sampled)
    HeapDS x 1,094,289 ops/sec ±0.09% (97 runs sampled)
    Heap x 4,401,016 ops/sec ±0.10% (98 runs sampled)
    MinPriorityQueue x 25,171,646 ops/sec ±0.09% (95 runs sampled)
    PriorityQueue x 15,892,132 ops/sec ±0.07% (96 runs sampled)

For more details, see the [benchmark source code](https://github.com/keriati/bucket-priority-queue/tree/main/benchmark).

## Installation

To install `BucketQueue`, simply include it in your project dependencies:

```bash
npm install bucket-priority-queue
```

## Usage

Here's how you can integrate BucketQueue into your project:

```typescript
import { MinBucketQueue, MaxBucketQueue } from "bucket-priority-queue";

// Initialize the queue with optional initial items
const queue = new MinBucketQueue<number>([
  [1, 1],
  [2, 2],
  [3, 3],
]);

// Adding items with priority
queue.push(5, 1); // item 5 with priority 1
queue.push(6, 2); // item 6 with priority 2

// Retrieve items with the highest or lowest priority
const lowest = queue.pop(); // returns item with lowest priority
```

## API Reference

### MinBucketQueue<T>

`MinBucketQueue` is a data structure that operates similarly to a priority queue. It organizes elements in a way such that the element with the minimum priority is always at the front.

#### Methods

- **constructor(items?: [T, Priority][]):** Initialize a new MinBucketQueue with optional initial items.
- **push(item: T, priority: Priority):** Adds an item to the queue with an associated priority.
- **pop(): T | undefined:** Removes and returns the item with the minimum priority. Returns undefined if the queue is empty.
- **add(item: T, priority: Priority):** Alias for push.
- **poll(): T | undefined:** Alias for pop.
- **peek(): T | undefined:** Returns the item with the minimum priority without removing it from the queue.
- **clear():** Removes all items from the queue.
- **refill(items: [T, Priority][]):** Clears the queue and adds the provided items.
- **has(item: T):** Checks if the queue contains the specified item.
- **contains(item: T):** Alias for has.
- **toArray(): T[]:** Returns an array containing all the items in the queue.
- **get size(): number:** Returns the number of items in the queue.

### MaxBucketQueue<T>

`MaxBucketQueue` is a data structure that operates similarly to a priority queue. It organizes elements in a way such that the element with the maximum priority is always at the front.

#### Methods

- **constructor(items?: [T, Priority][]):** Initialize a new MaxBucketQueue with optional initial items.
- **push(item: T, priority: Priority):** Adds an item to the queue with an associated priority.
- **pop(): T | undefined:** Removes and returns the item with the maximum priority. Returns undefined if the queue is empty.
- **add(item: T, priority: Priority):** Alias for push.
- **poll(): T | undefined:** Alias for pop.
- **peek(): T | undefined:** Returns the item with the maximum priority without removing it from the queue.
- **clear():** Removes all items from the queue.
- **refill(items: [T, Priority][]):** Clears the queue and adds the provided items.
- **has(item: T):** Checks if the queue contains the specified item.
- **contains(item: T):** Alias for has.
- **toArray(): T[]:** Returns an array containing all the items in the queue.
- **get size(): number:** Returns the number of items in the queue.

## License

This project is licensed under the MIT License - see the LICENSE file for details.