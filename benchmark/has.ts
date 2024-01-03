import Benchmark from "benchmark";
import { MinBucketQueue } from "../src";
import HeapJS from "heap-js";
import Heap from "heap";
import { MinHeap as HeapDS } from "@datastructures-js/heap";
import { PriorityQueue, MinPriorityQueue } from "priority-queue-typed";

const suit = new Benchmark.Suite();

const itemNumber = 1_000_000;
const priorityMax = 1000;

const items: number[] = [];

for (let i = 0; i < itemNumber; i++) {
  items.push(i % priorityMax);
}

const bq = new MinBucketQueue<number>();
const heapjs = new HeapJS<number>((a, b) => a - b);
const heap = new Heap<number>((a, b) => a - b);
const heapds = new HeapDS<number>();
const mpq = new MinPriorityQueue<number>();
const pq = new PriorityQueue<number>([], { comparator: (a, b) => a - b });

for (let i = 0; i < items.length; i++) {
  bq.push(items[i], items[i]);
  heapjs.push(items[i]);
  heap.push(items[i]);
  heapds.push(items[i]);
  mpq.add(items[i]);
  pq.add(items[i]);
}

suit
  .add("MinBucketQueue", () => {
    for (let i = 0; i < 1000; i++) {
      bq.has(i);
    }
  })
  .add("HeapJS", () => {
    for (let i = 0; i < 1000; i++) {
      heapjs.contains(i);
    }
  })
  .add("Heap", () => {
    for (let i = 0; i < 1000; i++) {
      heap.contains(i);
    }
  })
  .add("MinPriorityQueue", () => {
    for (let i = 0; i < 1000; i++) {
      mpq.has(i);
    }
  })
  .add("PriorityQueue", () => {
    for (let i = 0; i < 1000; i++) {
      pq.has(i);
    }
  })
  .on("cycle", function (e: Event) {
    console.log("" + e.target);
  })
  .on("complete", function () {
    // @ts-expect-error - no error expected
    console.log("Fastest is " + this.filter("fastest").map("name"));
  })
  .run();
