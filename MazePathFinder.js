// TODO: path 찾을때 visited로 찾는게 아니라
// walls로 구분하면서 찾아야 함... 이런

// TODO: cell color를 색칠하지 말고, 선으로 표시해주기(line())

class MazePathFinder {
  
  /*
  attrubute
  - maze
  - path
  - grid
  
  
  method
  - registerMaze(maze)
  - initMaze()
  - findPath()
  - setNextPathCell()
  - checkExit()
  
  */
  
  registerMaze(maze) {
    this.maze = maze;
  }

  initMaze() {
    this.path = [];
    this.grid = [];

    // this.maze.grid (this.grid)에서 pathFlag가 true인 Cell의
    // path를 저장하는 리스트

    // this.maze.grid 그대로 참조 복사 코드
    this.grid = this.maze.grid.slice();


    for (let c of this.grid)
      c.visited = false;

    let first = this.grid[0];
    first.visited = true;
    this.path.push(first);
  }

  findPath() {

    this.initMaze();

    while (this.path.length > 0) {
      let current = this.path.pop();

      if (this.checkExit(current.i, current.j)) {
        // pop했던것을 push(마지막 path cell이므로)
        this.path.push(current);        
        
        this.setNextPathCell();
        return;
      }

      let next = this.maze.checkNeighbors(
        current, true, true);

      if (next) {
        next.visited = true;
        this.path.push(current);
        this.path.push(next);
      }
    }
    print("No Exit!");
  }
  
  setNextPathCell() {
    for(let i = 0; i < this.path.length - 1; i++) {
      this.path[i].nextPathCell = this.path[i+1];
    }
  }
  
  checkExit(i, j) {
    if ((i === this.maze.cols - 1) &&
      (j === this.maze.rows - 1)) {
      // print("find Path!");
      return true;
    }
  }
}