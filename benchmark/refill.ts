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
const itemsPrio: [number, number][] = [];

for (let i = 0; i < itemNumber; i++) {
  items.push(i % priorityMax);
  itemsPrio.push([i % priorityMax, i % priorityMax]);
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
    bq.clear();
    for (let i = 0; i < items.length; i++) {
      bq.push(items[i], items[i]);
    }
  })
  .add("HeapJS", () => {
    heapjs.clear();
    for (let i = 0; i < items.length; i++) {
      heapjs.push(items[i]);
    }
  })
  .add("HeapDS", () => {
    heapds.clear();
    for (let i = 0; i < items.length; i++) {
      heapds.push(items[i]);
    }
  })
  .add("Heap", () => {
    heap.clear();
    for (let i = 0; i < items.length; i++) {
      heap.push(items[i]);
    }
  })
  .add("MinPriorityQueue", () => {
    mpq.refill(items);
  })
  .add("PriorityQueue", () => {
    pq.refill(items);
  })
  .on("cycle", function (e: Event) {
    console.log("" + e.target);
  })
  .on("complete", function () {
    // @ts-expect-error - no error expected
    console.log("Fastest is " + this.filter("fastest").map("name"));
  })
  .run();
