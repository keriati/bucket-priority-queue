import { MinBucketQueue } from "../src";

describe("MinBucketQueue", () => {
  it("returns items by priority and LIFO", () => {
    const bq = new MinBucketQueue();
    const items: [string, number][] = [
      ["item1", 0],
      ["item2", 0],
      ["item3", 2],
      ["item4", 2],
    ];

    for (const item of items) {
      bq.push(item[0], item[1]);
    }

    expect(bq.pop()).toBe("item2");
    expect(bq.pop()).toBe("item1");
    expect(bq.pop()).toBe("item4");
    expect(bq.pop()).toBe("item3");
    expect(bq.pop()).toBeUndefined();
  });

  it("can be initialized with items", () => {
    const items: [string, number][] = [
      ["item1", 1],
      ["item3", 2],
      ["item2", 0],
      ["item4", 3],
    ];

    const bq = new MinBucketQueue(items);

    expect(bq.size).toBe(4);
  });

  describe("#push()", () => {
    it("adds an item with priority", () => {
      const bq = new MinBucketQueue();
      const item = "item";
      const priority = 0;

      bq.push(item, priority);

      expect(bq.pop()).toBe(item);
    });
  });

  describe("#add()", () => {
    it("adds an item with priority", () => {
      const bq = new MinBucketQueue();
      const item = "item";
      const priority = 0;

      bq.add(item, priority);

      expect(bq.poll()).toBe(item);
    });
  });

  describe("#pop()", () => {
    it("returns the lowest priority item", () => {
      const bq = new MinBucketQueue();
      const item = "item";
      const priority = 0;
      const item2 = "item2";
      const priority2 = 1;

      bq.push(item, priority);
      bq.push(item2, priority2);

      expect(bq.pop()).toBe(item);
    });

    it("returns undefined if there are no items", () => {
      const bq = new MinBucketQueue();

      expect(bq.pop()).toBeUndefined();
    });
  });

  describe("#poll()", () => {
    it("returns the lowest priority item", () => {
      const bq = new MinBucketQueue();
      const item = "item";
      const priority = 0;
      const item2 = "item2";
      const priority2 = 1;

      bq.add(item, priority);
      bq.add(item2, priority2);

      expect(bq.poll()).toBe(item);
    });

    it("returns undefined if there are no items", () => {
      const bq = new MinBucketQueue();

      expect(bq.poll()).toBeUndefined();
    });
  });

  describe("#peek()", () => {
    it("returns the lowest priority item without removing it", () => {
      const bq = new MinBucketQueue();
      const item = "item";
      const priority = 0;
      const item2 = "item2";
      const priority2 = 1;

      bq.add(item, priority);
      bq.add(item2, priority2);

      expect(bq.peek()).toBe(item);
      expect(bq.peek()).toBe(item);
    });

    it("returns undefined if there are no items", () => {
      const bq = new MinBucketQueue();

      expect(bq.peek()).toBeUndefined();
    });
  });
});
