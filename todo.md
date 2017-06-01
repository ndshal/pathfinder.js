## Phase 1: Grid
**Goal:** EaselJS setup, clickable grid.
 - [x] starts with green / red squares, which can be dragged
 - [x] on click an pressdown, dark grey squares appear.
 - [x] start on cell class
    * knows its own position
    * holds a pointer to its Shape instance
    * board has 2D array of Cell object
 - [x] On MouseEvent, get object from 2D array, not getObjectUnderPoint()

## Phase 2: Algorithms
**Goal:** More from graphNode, implement BFS and A\*
- [x] implement bfs + a* given a 'grid' /  array of coord pairs
- [x] can return path
- [x] For all your classes, decide what the API will be
  * Search, Board, BoardView, Cell
- [x] Test visualizations

## Phase 3: View
**Goal:** UX
 - [ ] Make a View class that wraps board
 - [ ] Select form for algo type
 - [ ] buttons to run algo, clear search, clear walls
 - [ ] later: obstacle presets?
