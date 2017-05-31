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
    // end of the array is bottom of the tree
    this._percolateUp();
  }

  deleteMin() {

  }

  _percolateUp() {
    let childIdx = this.store.length-1;
    let parentIdx = Math.floor(childIdx/2);
    while (this.store[childIdx].priority < this.store[parentIdx].priority) {
      [this.store[childIdx], this.store[parentIdx]] =
          [this.store[parentIdx], this.store[childIdx]];

      console.log(this.store);
      childIdx = parentIdx;
      parentIdx = Math.floor(childIdx/2);
    }
  }

  _percolateDown() {

  }
}
