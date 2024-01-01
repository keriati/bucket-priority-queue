import Benchmark from "benchmark";
import { BucketQueue } from "../src";
import Heap from "heap-js";

const suit = new Benchmark.Suite({
  initCount: 1000,
});

const rounds = 1_000_000;
const priorityMax = 1_000;

const items: [string, number][] = [];

for (let i = 0; i < rounds; i++) {
  items.push([`item-${i}`, i % priorityMax]);
}

const bq = new BucketQueue<string>();
const heap = new Heap<[string, number]>((a, b) => a[1] - b[1]);

for (let i = 0; i < items.length; i++) {
  bq.push(items[i][0], items[i][1]);
  heap.push(items[i]);
}

suit
  .add("BucketQueue", () => {
    const i1 = bq.popLowest() as string;
    const i2 = bq.popLowest() as string;
    const i3 = bq.popLowest() as string;

    bq.push(i3, 0);
    bq.push(i2, 0);
    bq.push(i1, 0);
  })
  .add("Heap", () => {
    const i1 = heap.pop() as [string, number];
    const i2 = heap.pop() as [string, number];
    const i3 = heap.pop() as [string, number];

    heap.push(i3);
    heap.push(i2);
    heap.push(i1);
  })
  .on("cycle", function (e: Event) {
    console.log("" + e.target);
  })
  .on("complete", function () {
    // @ts-expect-error - no error expected
    console.log("Fastest is " + this.filter("fastest").map("name"));
  })
  .run();
