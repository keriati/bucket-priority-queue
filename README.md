# Bucket Queue in TypeScript
![npm](https://img.shields.io/npm/v/bucket-priority-queue.svg?style=flat-square)
![Test Status](https://github.com/keriati/bucket-priority-queue/actions/workflows/coverage.yml/badge.svg)
[![codecov](https://codecov.io/gh/keriati/bucket-priority-queue/graph/badge.svg?token=UYXBHXOSOV)](https://codecov.io/gh/keriati/bucket-priority-queue)
## Overview

`BucketQueue` is a priority queue implementation ideal for algorithms requiring efficient, priority-based item
management, such as Dijkstra's algorithm. It's designed to offer quick enqueue and dequeue operations, particularly
when the priority key space is small and comprised of positive integers, a common scenario in many programming puzzles.
See [Bucket queue on Wikipedia](https://en.wikipedia.org/wiki/Bucket_queue) for more.

## Installation

To install `BucketQueue`, simply include it in your project dependencies:

```bash
npm install bucket-priority-queue
```

## Usage

Here's how you can integrate BucketQueue into your project:

```typescript
import { BucketQueue } from "bucket-priority-queue";

// Initialize the queue with optional initial items
const queue = new BucketQueue<number>([
  [1, 1],
  [2, 2],
  [3, 3],
]);

// Adding items with priority
queue.push(5, 1); // item 5 with priority 1
queue.push(6, 2); // item 6 with priority 2

// Retrieve items with the highest or lowest priority
const highest = queue.popHighest(); // returns item with highest priority
const lowest = queue.popLowest(); // returns item with lowest priority
```

## API Reference

**constructor(items?: [T, Priority][]): void** - Initializes the queue, optionally with an array of items and their priorities.

**push(item: T, priority: Priority): void** - Adds an item with an associated priority to the queue.

**popHighest(): T | undefined** - Removes and returns the item with the highest priority.

**popLowest(): T | undefined** - Removes and returns the item with the lowest priority.

**size: number** - Returns the current size of the queue.
