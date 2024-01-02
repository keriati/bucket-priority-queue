import Benchmark from "benchmark";
import { BucketQueue } from "../src";
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

const bq = new BucketQueue<number>();
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
  .add("BucketQueue", () => {
    const i1 = bq.popLowest() as number;
    const i2 = bq.popLowest() as number;
    const i3 = bq.popLowest() as number;

    bq.push(i3, i3);
    bq.push(i2, i2);
    bq.push(i1, i1);
  })
  .add("HeapJS", () => {
    const i1 = heapjs.pop() as number;
    const i2 = heapjs.pop() as number;
    const i3 = heapjs.pop() as number;

    heapjs.push(i3);
    heapjs.push(i2);
    heapjs.push(i1);
  })
  .add("HeapDS", () => {
    const i1 = heapds.pop() as number;
    const i2 = heapds.pop() as number;
    const i3 = heapds.pop() as number;

    heapds.push(i3);
    heapds.push(i2);
    heapds.push(i1);
  })
  .add("Heap", () => {
    const i1 = heap.pop() as number;
    const i2 = heap.pop() as number;
    const i3 = heap.pop() as number;

    heap.push(i3);
    heap.push(i2);
    heap.push(i1);
  })
  .add("MinPriorityQueue", () => {
    const i1 = mpq.poll() as number;
    const i2 = mpq.poll() as number;
    const i3 = mpq.poll() as number;

    mpq.add(i3);
    mpq.add(i2);
    mpq.add(i1);
  })
  .add("PriorityQueue", () => {
    const i1 = pq.poll() as number;
    const i2 = pq.poll() as number;
    const i3 = pq.poll() as number;

    pq.add(i3);
    pq.add(i2);
    pq.add(i1);
  })
  .on("cycle", function (e: Event) {
    console.log("" + e.target);
  })
  .on("complete", function () {
    // @ts-expect-error - no error expected
    console.log("Fastest is " + this.filter("fastest").map("name"));
  })
  .run();
