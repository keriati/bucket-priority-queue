import { MinBucketQueue } from "../src";

describe("BucketQueue", () => {
  describe("#size()", () => {
    it("returns the number of items in the queue", () => {
      const bq = new MinBucketQueue();
      const item = "item";
      const priority = 0;
      const item2 = "item2";
      const priority2 = 1;

      bq.push(item, priority);
      bq.push(item2, priority2);

      expect(bq.size).toBe(2);
      expect(bq.length).toBe(2);
    });

    it("returns 0 if there are no items", () => {
      const bq = new MinBucketQueue();

      expect(bq.size).toBe(0);
      expect(bq.length).toBe(0);
    });

    it("returns 0 when all items are removed", () => {
      const items: [string, number][] = [
        ["item1", 0],
        ["item2", 1],
        ["item3", 2],
        ["item4", 3],
      ];
      const bq = new MinBucketQueue(items);

      while (bq.size > 0) {
        bq.pop();
      }

      expect(bq.size).toBe(0);
      expect(bq.length).toBe(0);
    });
  });

  describe("#clear()", () => {
    it("removes all items from the queue", () => {
      const items: [string, number][] = [
        ["item1", 0],
        ["item2", 1],
        ["item3", 2],
        ["item4", 3],
      ];
      const bq = new MinBucketQueue(items);

      bq.clear();

      expect(bq.size).toBe(0);
      expect(bq.pop()).toBeUndefined();
    });
  });

  describe("#refill()", () => {
    it("removes all items from the queue and adds new items", () => {
      const items: [string, number][] = [
        ["item1", 0],
        ["item2", 1],
        ["item3", 2],
        ["item4", 3],
      ];

      const bq = new MinBucketQueue(items);

      bq.refill([
        ["item5", 0],
        ["item6", 1],
        ["item7", 2],
        ["item8", 3],
      ]);

      expect(bq.size).toBe(4);
      expect(bq.pop()).toBe("item5");
      expect(bq.pop()).toBe("item6");
      expect(bq.pop()).toBe("item7");
      expect(bq.pop()).toBe("item8");
    });
  });

  describe("#has()", () => {
    it("returns true if the item is in the queue", () => {
      const items: [string, number][] = [
        ["item1", 0],
        ["item2", 2],
        ["item3", 3],
        ["item4", 4],
      ];
      const bq = new MinBucketQueue(items);

      expect(bq.has("item2")).toBe(true);
      expect(bq.contains("item2")).toBe(true);
    });

    it("returns false if the item is not in the queue", () => {
      const items: [string, number][] = [
        ["item1", 0],
        ["item2", 1],
        ["item3", 2],
        ["item4", 3],
      ];
      const bq = new MinBucketQueue(items);

      expect(bq.has("item5")).toBe(false);
      expect(bq.contains("item5")).toBe(false);
    });
  });

  describe("#toArray()", () => {
    it("returns an array of all items in the queue", () => {
      const items: [string, number][] = [
        ["item1", 0],
        ["item2", 1],
        ["item3", 2],
        ["item4", 3],
      ];
      const bq = new MinBucketQueue(items);

      expect(bq.toArray()).toEqual(["item1", "item2", "item3", "item4"]);
    });
  });

  describe("#isEmpty()", () => {
    it("returns true if the queue is empty", () => {
      const bq = new MinBucketQueue();

      expect(bq.isEmpty()).toBe(true);
    });

    it("returns false if the queue is not empty", () => {
      const bq = new MinBucketQueue([["item", 0]]);

      expect(bq.isEmpty()).toBe(false);
    });
  });
});
