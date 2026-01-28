class PriorityQueue {
  items = [];

  size() {
    return this.items.length;
  }

  enqueue(item) {
    this.items.push(item);
  }

  dequeue() {
    const minIndex = this.items.reduce(
      (min, item, i) => (item.cost < this.items[min].cost ? i : min),
      0,
    );

    return this.items.splice(minIndex, 1)[0].value;
  }
}

class Scheduler {
  constructor(maxCapacity = 1) {
    this.queue = new PriorityQueue();
    this.capacity = maxCapacity;
  }

  schedule(task, expectedDuration) {
    this.queue.enqueue({ value: task, cost: expectedDuration });

    queueMicrotask(() => this.tryStartNextTask());
  }

  tryStartNextTask() {
    if (this.capacity === 0) return;
    if (this.queue.size() === 0) return;

    this.capacity--;

    const task = this.queue.dequeue();
    task().finally(() => {
      this.capacity++;
      this.tryStartNextTask();
    });
  }
}

const wait = (time) => new Promise((resolve) => setTimeout(resolve, time));
const msg = (text) => wait(100).then(() => console.log(text));

const scheduler = new Scheduler(3);

scheduler.schedule(() => msg('1st 100'), 100);
scheduler.schedule(() => msg('1st 300'), 300);
scheduler.schedule(() => msg('1st 200'), 200);

scheduler.schedule(() => msg('2nd 300'), 300);
scheduler.schedule(() => msg('2nd 100'), 100);
scheduler.schedule(() => msg('2nd 200'), 200);

scheduler.schedule(() => msg('3'), 3);
scheduler.schedule(() => msg('2'), 2);
scheduler.schedule(() => msg('1'), 1);

setTimeout(() => {
  scheduler.schedule(() => msg('another task 2'), 2);
  scheduler.schedule(() => msg('another task 3'), 3);
  scheduler.schedule(() => msg('another task 1'), 1);
}, 0);

/*
Expected output:
1
2
3
another task 1
another task 2
another task 3
1st 100
2nd 100
1st 200
2nd 200
1st 300
2nd 300
*/
