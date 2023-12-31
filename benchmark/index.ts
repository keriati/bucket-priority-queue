import Benchmark from 'benchmark';
import {BucketQueue} from "../src";
import Heap from "heap-js";

const suit = new Benchmark.Suite();

const bq = new BucketQueue<string>();
const heap = new Heap<[string, number]>((a, b) => a[1] - b[1]);

const rounds = 100_000;
const priorityMax = 100;

const items: [string, number][] = [];

for (let i = 0; i < rounds; i++) {
  items.push([`item-${i}`, Math.floor(Math.random() * priorityMax)]);
}

suit.add('BucketQueue#popLowest()', () => {
  for (let i = 0; i < items.length; i++) {
    bq.push(items[i][0], items[i][1]);
  }
  while (bq.size) {
    bq.popLowest();
  }
}).add('BucketQueue#popHighest()', () => {
  for (let i = 0; i < items.length; i++) {
    bq.push(items[i][0], items[i][1]);
  }
  while (bq.size) {
    bq.popHighest();
  }
}).add('Heap#pop()', () => {
  for (let i = 0; i < items.length; i++) {
    heap.push(items[i]);
  }
  while (heap.size()) {
    heap.pop();
  }
}).on('cycle', function (e: Event) {
  console.log('' + e.target);
}).run();
