import {BucketQueue} from "../src";

describe('BucketQueue', () => {
  it('returns items by priority and LIFO', () => {
    const bq = new BucketQueue();
    const items: [string, number][] = [
      ['item1', 0],
      ['item2', 0],
      ['item3', 2],
      ['item4', 2],
    ];

    for (const item of items) {
      bq.push(item[0], item[1]);
    }

    expect(bq.popLowest()).toBe('item2');
    expect(bq.popLowest()).toBe('item1');
    expect(bq.popLowest()).toBe('item4');
    expect(bq.popLowest()).toBe('item3');
    expect(bq.popLowest()).toBeUndefined();
  });

  it('can be initialized with items', () => {
    const items: [string, number][] = [
      ['item1', 1],
      ['item3', 2],
      ['item2', 0],
      ['item4', 3],
    ];

    const bq = new BucketQueue(items);

    expect(bq.size).toBe(4);
  });

  describe('#push()', () => {
    it('adds an item with priority', () => {
      const bq = new BucketQueue();
      const item = 'item';
      const priority = 0;

      bq.push(item, priority);

      expect(bq.popHighest()).toBe(item);
    });
  });

  describe('#popHighest()', () => {
    it('returns the highest priority item', () => {
      const bq = new BucketQueue();
      const item = 'item';
      const priority = 0;
      const item2 = 'item2';
      const priority2 = 1;

      bq.push(item, priority);
      bq.push(item2, priority2);

      expect(bq.popHighest()).toBe(item2);
    });
    it('returns undefined if there are no items', () => {
      const bq = new BucketQueue();

      expect(bq.popHighest()).toBeUndefined();
    });
  });

  describe('#popLowest()', () => {
    it('returns the lowest priority item', () => {
      const bq = new BucketQueue();
      const item = 'item';
      const priority = 0;
      const item2 = 'item2';
      const priority2 = 1;

      bq.push(item, priority);
      bq.push(item2, priority2);

      expect(bq.popLowest()).toBe(item);
    });

    it('returns undefined if there are no items', () => {
      const bq = new BucketQueue();

      expect(bq.popLowest()).toBeUndefined();
    });
  });

  describe('#size()', () => {
    it('returns the number of items in the queue', () => {
      const bq = new BucketQueue();
      const item = 'item';
      const priority = 0;
      const item2 = 'item2';
      const priority2 = 1;

      bq.push(item, priority);
      bq.push(item2, priority2);

      expect(bq.size).toBe(2);
    });

    it('returns 0 if there are no items', () => {
      const bq = new BucketQueue();

      expect(bq.size).toBe(0);
    });
  });
});