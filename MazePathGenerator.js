class MazePathGenerator {
  /*
  maze를 받아서 recursive DFS(Depth First Search) backtracking algorithm으로
  walls 배열을 설정하며 maze만드는 class
  */
  
  /*
  attrubute
  - maze
  - stack
  
  
  method
  - registerMaze(maze)
  - generateMaze()
  - generatePath()
  
  */
  registerMaze(maze) {
    this.maze = maze;
  }
  
  generateMaze() {
    // init values
    this.stack = [];

    let mid = floor(this.maze.grid.length / 2);
    let first = this.maze.grid[mid];
    first.visited = true;
    this.stack.push(first);

    // generate Path !
    this.generatePath();
  }

  generatePath() {
    // === recursive DFS backtracking algorithm ===
    while (this.stack.length > 0) {
      let current = this.stack.pop();
      
      let next = this.maze.checkNeighbors(current, true, false);
      if (next) {
        this.stack.push(current);

        this.maze.removeWalls(current, next);

        next.visited = true;

        this.stack.push(next);
      }
    }
  }
}




// ############## jeff Diff code ################
// let cols, rows;
// let w;
// let grid = [];
// let stack = [];
// let current;

// class MazeGenerator {
//   constructor(cellSize = 50) {

//     this.initMaze(cellSize);
//   }

//   initMaze(cellSize) {
//     w = cellSize;

//     // ROWS, COLS size
//     rows = floor(width / w);
//     cols = floor(height / w);

//     // init cells
//     grid = [];

//     for (let j = 0; j < rows; j++) {
//       for (let i = 0; i < cols; i++) {
//         let cell = new Cell(i, j);
//         grid.push(cell);
//       }
//     }

//     // STEP 1
//     stack = [];

//     // 22222222222
//     current = grid[0];
//     current.visited = true;
//     stack.push(current);

//     // generate Maze !
//     this.generateMaze();
//   }

//   drawMaze() {
//     // draw cells
//     for (let cell of grid) {
//       cell.show(0);
//     }
//   }

//   generateMaze() {
//     // === recursive backtrackimng algorithm ===
//     while(stack.length > 0) {
//       let next = current.checkNeighbors();
//       if(next) {
//         next.visited = true;
//         current.removeWalls(next);
//         stack.push(current);
//         current = next;
//       } else {
//         current = stack.pop();
//       }
//     }
//   }
// }