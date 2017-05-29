# Pathfinder: A Pathfinding Algorithm Visualizer

## Background
Pathfinding comes up in a variety of contexts, from role-playing games to ride-sharing apps.
The basic setup is as follows: given a graph (a list of connected nodes), a
starting node and a goal node, we want to find the shortest path from the start
to the goal. Pathfinder is a visualization tool that aims to demonstrate
functionality and efficiency of two such algorithms - Breadth First Search and A\*.
Breadth First Search is a brute-force, slow, algorithm, while A* is significantly more efficient, and the standard choice in various real-world
pathfinding scenarios.

## Functionality and MVP

The Pathfinder visualization tool will be able to:
  - [ ] Allow users to select start and end positions and place obstacle on a 2D, square, grid.
  - [ ] Implement the BFS and A\* algorithms to calculate paths on the grid. A\* will be implemented using the Manhattan distance heuristic.
  - [ ] Animate the searching procedure, clearly marking visited and frontier cells, and draw the final path once calculated.

In addition, the project will include:
  - [ ] An instructions / background info modal
  - [ ] A production readme

## Wireframe
![Pathfinder wireframe][wireframe]
[wireframe]: docs/pathfinder_wireframe.png

## Architecture and Technologies
This project will be built with the following technologies:
  * Vanilla JavaScript and `jquery` for overall structure
  * `Easel.js` and `Canvas` for rendering and animating the main grid
  * Webpack to bundle various scripts.

I anticipate the following file structure:
```
- js
  + board.js
  + graph_node.js
  + search
    - search.js
    - bfs.js
    - a_star.js
  + view.js
- pathfinder.js
```
`board.js` will handle the logic of using `Easel` to render a clickable grid on the `Canvas`. It will likely store a 2D array of `graphNode` objects.

`graph_node.js` will implement a class to represent a single node on the grid. A node will have properties such as `visited`, `isObstacle`, `isGoal`, etc.

`search.js` will be a wrapper class for a general search algorithm. It will import the `bfs` and `a_star` files, which implement those algorithms respectively.

`view.js` will handle connecting the `Board` to the `Search` algorithm and calling initialization/clearing methods.

## Implementation Timeline
### Day 1:
Setup the general file structure, implement basic functionality in the `Board` and `graphNode` classes.

**Goal:** Use `Easel.js` to render the main grid. Be able to toggle node status / colors on click.

### Day 2:
Finish the `graphNode` class and implement the BFS and A\* algorithms.

**Goal:** Be able to run both algorithms in the console and produce paths as arrays of coordinates.

### Day 3:
Implement the `Search` class and render the statuses of nodes at each step of the search algorithm.

**Goal:** Animate an expanding frontier of searched nodes and a final
final calculated path. 

### Day 4:
Update styling, add instructions modal and add documentation.

## Bonus Features
After completion of the features described above, some potential future directions for the project include
- [ ] Add several more algorithms, such as Dijkstra's and Greedy Best-First search
- [ ] Allow the user to choose from several heuristics for A\* and similar algorithms, such as Euclidean distance
- [ ] Explore visualizing not just pathfinding but random maze generation, and then use the existing algorithms as maze solvers.
