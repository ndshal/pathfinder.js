export class Queue {
  constructor() {
    this.store = [];
    // make me a linked list later?

    this.dequeue = this.store.pop;
    this.enqueue = item => this.store.unshift(item);
    this.isEmpty = () => this.store.length === 0;
  }
}

export class PriorityQueue {
  constructor() {
    this.store = [{item: null, priority: 0}];
    // use array to represent filled bst
    // el at i has parent at Math.floor(i/2) and children at 2i, 2i+1
  }

  insert(item, priority) {
    this.store.push({item, priority});
    this._percolateUp();

    return this.store.length;
  }

  deleteMin() {
    const min = this.store[1];
    this.store[1] = this.store.pop();
    this._percolateDown();

    return min;
  }

  _percolateUp() {
    let childIdx = this.store.length-1;
    let parentIdx = Math.floor(childIdx/2);
    while (this.store[childIdx].priority < this.store[parentIdx].priority) {
      [this.store[childIdx], this.store[parentIdx]] =
          [this.store[parentIdx], this.store[childIdx]];

      childIdx = parentIdx;
      parentIdx = Math.floor(childIdx/2);
    }
  }

  _percolateDown() {
    let idx = 1;
    let minChildIdx = this._getMinChildIdx(idx);

    while(this.store[idx].priority > this.store[minChildIdx].priority) {
      [this.store[idx], this.store[minChildIdx]] =
        [this.store[minChildIdx]. this.store[idx]];

      idx = minChildIdx;
      minChildIdx = this._getMinChildIdx(idx);
    }
  }

  _getMinChildIdx(idx) {
    let leftChild = this.store[2*idx];
    let rightChild = this.store[2*idx+1];
    let minChildIdx, minPriority;
    if(rightChild) {
      minPriority = Math.min(leftChild.priority, rightChild.priority);
    } else {
      minPriority = leftChild.priority;
    }
    return leftChild.priority === minPriority ? 2*idx : 2*idx+1;
  }
}
