import Benchmark from "benchmark";
import { MinBucketQueue } from "../src";
import HeapJS from "heap-js";
import Heap from "heap";
import { MinHeap as HeapDS } from "@datastructures-js/heap";
import { PriorityQueue, MinPriorityQueue } from "priority-queue-typed";

const suit = new Benchmark.Suite();

const itemNumber = 10_000_000;
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
    const items: number[] = [];
    for (let i = 0; i < 1000; i++) {
      items.push(bq.pop() as number);
    }
    for (let i = 999; i >= 0; i--) {
      bq.push(items[i], items[i]);
    }
  })
  .add("HeapJS", () => {
    const items: number[] = [];
    for (let i = 0; i < 1000; i++) {
      items.push(heapjs.pop() as number);
    }
    for (let i = 999; i >= 0; i--) {
      heapjs.push(items[i]);
    }
  })
  .add("HeapDS", () => {
    const items: number[] = [];
    for (let i = 0; i < 1000; i++) {
      items.push(heapds.pop() as number);
    }
    for (let i = 999; i >= 0; i--) {
      heapds.push(items[i]);
    }
  })
  .add("Heap", () => {
    const items: number[] = [];
    for (let i = 0; i < 1000; i++) {
      items.push(heap.pop() as number);
    }
    for (let i = 999; i >= 0; i--) {
      heap.push(items[i]);
    }
  })
  .add("MinPriorityQueue", () => {
    const items: number[] = [];
    for (let i = 0; i < 1000; i++) {
      items.push(mpq.poll() as number);
    }
    for (let i = 999; i >= 0; i--) {
      mpq.add(items[i]);
    }
  })
  .add("PriorityQueue", () => {
    const items: number[] = [];
    for (let i = 0; i < 1000; i++) {
      items.push(pq.poll() as number);
    }
    for (let i = 999; i >= 0; i--) {
      pq.add(items[i]);
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
