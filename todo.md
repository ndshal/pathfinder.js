## Phase 1:
**Goal:** EaselJS setup, clickable grid.
 - [x] starts with green / red squares, which can be dragged
 - [x] on click an pressdown, dark grey squares appear.
 - [x] start on cell class
    * knows its own position
    * holds a pointer to its Shape instance
    * board has 2D array of Cell object
 - [x] On MouseEvent, get object from 2D array, not getObjectUnderPoint()

## Phase 2:
**Goal:** More from graphNode, implement BFS and A\*
- [ ] implement bfs + a* given a 'grid' /  array of coord pairs
- [ ] can return path
- [ ] For all your classes, decide what the API will be
  * Search, Board, BoardView, Cell
- [ ] To test visualizations, and also for fun, add a random walk!
