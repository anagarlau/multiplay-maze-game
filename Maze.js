class Maze {
  /*
  Maze class로 Cell class의 배열을 가지며(1차원),
  TOP, RIGHT, BOTTOM, LEFT를 사용
  
  -모든 클래스의 중심 
  
  */

  /*
  attribute
  - mpg
  - mpf
  - TOP
  - RIGHT
  - BOTTOM
  - LEFT
  - pathDrawing
  - players
  - item
  - size
  - grid
  - cols
  - rows
  - winScore
  - state: game진행을 막기위해 key 입력금지
  
  method
  - constructor(size, mpg, mpf)
  - swapLocationEachOther(obj1, obj2)
  - getRandomJLocation()
  - getRandomILocation()
  - teleportObject(obj, i, j)
  - getRandomPlayer(exceptPlayer = null)
  - drawWinnerImage(winner)
  - isSameLocation(obj1, obj2)
  - resetGame()
  - initMaze()
  - resetAllPlayers()
  - dropPlayer(player)
  - createItem()
  - setSize()
  - getSize()
  - setPathDrawing(pathDrawing)
  - initGrid()
  - draw()
  - getAllNeighbors(cell)
  - removeWalls(a, b)
  - getDirCell(cell, dir)
  - index(i, j)
  - checkNeighbors(cell, checkVisit, checkWall)
  
  
  
  */
  constructor(size, mpg, mpf) {
    this.setSize(size);
    this.mpg = mpg;
    mpg.registerMaze(this);
    this.mpf = mpf;
    mpf.registerMaze(this);

    // direction
    this.TOP = 0;
    this.RIGHT = 1;
    this.BOTTOM = 2;
    this.LEFT = 3;

    // path
    this.pathDrawing = false;

    // players
    this.players = [];

    // win score
    this.winScore = 8;

    // state
    this.state = true;
  }

  swapLocationEachOther(obj1, obj2) {
    let obj1I = obj1.i;
    let obj1J = obj1.j;

    print("i: " + obj1.i + "j: " + obj1.j);
    this.teleportObject(obj1, obj2.i, obj2.j);
    print("i: " + obj1.i + "j: " + obj1.j);


    this.teleportObject(obj2, obj1I, obj1J);
  }

  getRandomJLocation() {
    let rj = floor(random(this.rows));
    return rj;
  }

  getRandomILocation() {
    let ri = floor(random(this.cols));
    return ri;
  }

  teleportObject(obj, i, j) {
    i = constrain(i, 0, this.cols - 1);
    j = constrain(j, 0, this.rows - 1);

    obj.i = i;
    obj.j = j;
  }

  getRandomPlayer(exceptPlayer = null) {
    let others = [];
    for (let p of this.players) {
      if (p !== exceptPlayer) {
        others.push(p);
      }
    }

    return random(others);
  }

  drawWinnerImage(winner) {
    // background rect
    fill(winner.color);
    rect(50, 50, width - 100, height - 100);

    //winner: 100, 200 (100) 
    //this.name: 150 390 (200)

    // "winner" text
    fill(0);
    textSize(100);
    text("winner", 100, 150);

    // this.name text
    fill(0);
    textSize(200);
    text(winner.name, 150, 340);

    // "press 0"
    fill(0);
    textSize(35);
    text("press 0 to restart", 108, 430);
  }

  isSameLocation(obj1, obj2) {
    /*
    이 메소드 사용조건: 두개의 obj에 i, j 속성이 필수임
    */
    return (obj1.i === obj2.i && obj1.j === obj2.j);
  }

  resetGame() {
    this.setSize(cellSize);
    this.initMaze();
    this.resetAllPlayers();

    this.state = true;
  }

  initMaze() {
    this.initGrid();

    this.mpg.generateMaze();

    this.mpf.findPath();

    this.createItem();
    this.item.init();
  }

  resetAllPlayers() {
    for (let p of this.players) {
      p.init();
    }
  }

  dropPlayer(player) {
    this.players.push(player);
    player.registerMaze(this);
  }

  createItem() {
    this.item = new Item();
    this.item.registerMaze(this);
  }

  setSize(size) {
    this.size = size;
  }

  getSize() {
    return this.size;
  }

  setPathDrawing(pathDrawing) {
    this.pathDrawing = pathDrawing;
  }

  initGrid() {
    this.grid = [];
    this.cols = floor(width / this.size);
    this.rows = floor(height / this.size);

    // setup grid
    // cols(가로 먼저 만들면서 내려감)
    // (0,0) (1,0) (2,0) (3,0) ...
    for (let j = 0; j < this.rows; j++) {
      for (let i = 0; i < this.cols; i++) {
        let cell = new Cell(i, j, this.size);
        this.grid.push(cell);
      }
    }

    this.grid[0].text = 'A';
    this.grid[this.grid.length - 1].text = 'B';
  }

  draw() {
    /*
    cell 배열 (this.gird)를 그린다 (cell class의 show())
    [옵션]
    this.pathDrawing:
    maze class에서 path를 나타낼 여부 변수
    */

    // draw cells
    for (let cell of this.grid) {
      cell.show();
    }

    // draw path
    if (this.pathDrawing) {
      for (let cell of this.grid) {
        cell.connectLine(cell.nextPathCell);
      }
    }

    // show item
    this.item.show();

    // show players
    for (let p of this.players) {
      // show
      p.show();

      // check eating item
      p.checkEatingItem(this.item);

      // check win
      if (p.checkWin()) {
        this.drawWinnerImage(p);
        if (DEBUG) {
          // print(p.name + " has win!");
        }
        this.state = false;
      }

    }


  }

  getAllNeighbors(cell) {
    /*
    단순히 cell의 주변 4개의 이웃셀을 배열로 반환한다
    */
    // undefined or Cell instance in array
    let neighbors = [];

    neighbors[this.TOP] =
      this.getDirCell(cell, this.TOP);
    neighbors[this.RIGHT] =
      this.getDirCell(cell, this.RIGHT);
    neighbors[this.BOTTOM] =
      this.getDirCell(cell, this.BOTTOM);
    neighbors[this.LEFT] =
      this.getDirCell(cell, this.LEFT);

    return neighbors;
  }


  // highlight() {
  //   noStroke();
  //   fill(0, 255, 0);
  //   rect(this.i * w, this.j * w, w, w);
  // }

  removeWalls(a, b) {
    /*
    cell a와 b가 맞닿아 있는 wall을 제거한다
    */
    let di = a.i - b.i;
    let dj = a.j - b.j;

    if (di === -1) {
      a.walls[this.RIGHT] = false;
      b.walls[this.LEFT] = false;
    } else if (di === 1) {
      a.walls[this.LEFT] = false;
      b.walls[this.RIGHT] = false;
    }

    if (dj === -1) {
      a.walls[this.BOTTOM] = false;
      b.walls[this.TOP] = false;
    } else if (dj === 1) {
      a.walls[this.TOP] = false;
      b.walls[this.BOTTOM] = false;
    }
  }

  getDirCell(cell, dir) {
    /*
    cell의 dir방향의 cell을 반환한다
    */
    let i = cell.i;
    let j = cell.j;

    switch (dir) {
      case this.TOP:
        j--;
        break;
      case this.RIGHT:
        i++;
        break;
      case this.BOTTOM:
        j++;
        break;
      case this.LEFT:
        i--;
        break;
    }

    let index = this.index(i, j);

    return this.grid[index];
  }

  index(i, j) {
    /*
    maze class의 cell들을 1차원 배열로 만들었고
    cell class는 2차원형식의 i, j를 가지고 있기 때문에
    cell class의 i, j를 maze class의 배열에서 index를 계산식을
    가지고 구할때 쓰는 메소드
    */
    if (i < 0 || j < 0 || i > this.cols - 1 || j > this.rows - 1)
      return -1;
    else
      return i + (j * this.cols);
  }

  checkNeighbors(cell, checkVisit, checkWall) {
    /*
    cell의 이웃중에서 checkVisit과 checkWall옵션에 따라 검사해서
    옵션에 부합하는 이웃cell객체중 1개를 랜덤으로 반환한다
    */
    let neighbors = this.getAllNeighbors(cell);

    // neighbors에서 
    for (let i = 0; i < 4; i++) {
      if ((neighbors[i] == undefined) || // screenBorder
        (checkVisit && neighbors[i].visited) || // visited
        (checkWall && neighbors[i].walls[(i + 2) % 4])) // wall
      {
        neighbors[i] = undefined;
      }
    }

    let ret = [];

    for (let n of neighbors) {
      if (n != undefined)
        ret.push(n);
    }

    return random(ret);
  }

}