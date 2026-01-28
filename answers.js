/* Task 1 */
function getSchema(json, indent = 0) {
  if (Array.isArray(json)) {
    if (json.length === 0) return '[]';

    const elementSchema = getSchema(json[0], indent);

    return `${elementSchema}[]`;
  }

  if (json === null) return 'null';

  if (typeof json === 'object') {
    const prefix = ' '.repeat(indent * 2);

    const body = Object.entries(json)
      .map(([key, value]) => {
        const fieldSchema = getSchema(value, indent + 1);

        return `  ${prefix}${key}: ${fieldSchema}`;
      })
      .join('\n');

    return `{\n${body}\n${prefix}}`;
  }

  return String(typeof json);
}

/* Task 2 */
function normalize(data, name, ...childrenNames) {
  const result = { [name]: {} };

  for (const childName of childrenNames) {
    result[childName] = {};
  }

  for (const item of data) {
    result[name][item.id] = Object.fromEntries(
      Object.entries(item).filter(([key]) => !childrenNames.includes(key)),
    );

    for (const childName of childrenNames) {
      for (const child of item[childName]) {
        result[childName][child.id] = {
          ...child,
          [`${name}Id`]: item.id,
        };
      }
    }
  }

  return result;
}

/* Task 3 */
class PriorityQueue {
  items = [];

  size() {
    return this.items.length;
  }

  insert(value, cost) {
    this.items.push({ value, cost });
  }

  delete() {
    const minIndex = this.items.reduce(
      (min, item, i) => (item.cost < this.items[min].cost ? i : min),
      0,
    );

    return this.items.splice(minIndex, 1)[0].value;
  }
}

class Scheduler {
  constructor(maxConcurrency = 1) {
    this.queue = new PriorityQueue();
    this.availableSlots = maxConcurrency;
  }

  schedule(task, expectedDuration) {
    this.queue.insert(task, expectedDuration);

    queueMicrotask(() => this.runNextTask());
  }

  runNextTask() {
    if (this.availableSlots === 0) return;
    if (this.queue.size() === 0) return;

    this.availableSlots--;

    const task = this.queue.delete();
    task().finally(() => {
      this.availableSlots++;
      this.runNextTask();
    });
  }
}
