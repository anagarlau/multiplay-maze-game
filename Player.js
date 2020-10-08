class Player {
  /*
  attribute
  - name
  - color
  - i
  - j
  - dir
  - movingCnt
  - scoreCnt
  - eating
  - maze
  
  method
  - constructor(name, color)
  - checkWin()
  - init()
  - checkEatingItem(item)
  - registerMaze(maze)
  - respawn()
  - move(dir)
  - show()
  - changeDir()
  - checkExit()
  - updateMovingCnt()
  - updateScoreCnt()
  
  // event listener function
  - keyPressed()
  
  */
  constructor(name, color) {
    this.name = name;

    // color
    this.color = color;

    this.init();

    // win score
    this.winScore = 8;
  }

  checkWin() {
    // check and draw winner
    if (this.scoreCnt === this.maze.winScore) {
      return true;
    }
  }

  init() {
    // location
    this.i = this.j = 0;

    // direction
    this.dir = 'B';

    // moving
    this.movingCnt = 0;
    this.updateMovingCnt();

    // score
    this.scoreCnt = 0;
    this.updateScoreCnt();

    // eating Item
    this.eating = false;
  }

  checkEatingItem(item) {
    if (this.maze.isSameLocation(this, item) && this.eating) {
      if (DEBUG) {
        print(this.name + " eats item!");
      }
      item.useItem(this);
      
      this.eating = false;
    }
  }



  registerMaze(maze) {
    /*
    해당 player객체를 maze로 
    */
    this.maze = maze;
  }

  respawn() {
    if (this.dir === 'A') {
      this.i = this.maze.cols - 1;
      this.j = this.maze.rows - 1;
    } else {
      this.i = this.j = 0;
    }
  }

  move(dir) {

    let currentCell =
      this.maze.grid[this.maze.index(this.i, this.j)];

    if (currentCell.walls[dir]) {
      return;
    }

    let nextCell = this.maze.getDirCell(currentCell, dir);

    this.i = nextCell.i;
    this.j = nextCell.j;

    this.checkExit();

    // print(this.name + ": " + (currentCell !== nextCell));
    // 움직였는지 boolean값으로 return
    // move: true
    // not move: false
    if (currentCell !== nextCell) {
      this.movingCnt++;
      this.updateMovingCnt();
    }

  }

  show() {
    let offset = 5;

    noStroke();
    fill(this.color);
    rect(this.i * this.maze.size + offset,
      this.j * this.maze.size + offset,
      this.maze.size - (2 * offset),
      this.maze.size - (2 * offset));


    // draw Dir (A, B)
    let realX = this.i * this.maze.size;
    let realY = this.j * this.maze.size;
    textSize(this.maze.size);
    fill(255);

    text(this.dir,
      realX + (this.maze.size * (1 / 6)),
      realY + (this.maze.size * (5 / 6)));



  }

  changeDir() {
    if (this.dir === 'A') {
      this.dir = 'B';
      if (DEBUG) {
        print("player: " + this.name + ", " + "B dir");
      }

    } else if (this.dir === 'B') {
      this.dir = 'A';
      if (DEBUG) {
        print("player: " + this.name + ", " + "A dir");
      }
      // reset loc (maze's rows, cols can being add)
      this.i = this.maze.cols - 1;
      this.j = this.maze.rows - 1;
    }
  }

  checkExit() {
    if (
      ((this.i === 0) && (this.j === 0) && this.dir === 'A') ||
      ((this.i === this.maze.cols - 1) &&
        (this.j === this.maze.rows - 1) && this.dir === 'B')) {

      // reload maze small
      this.maze.setSize(this.maze.getSize() - 5);
      this.maze.initMaze();
      this.changeDir();

      // score
      this.scoreCnt++;
      this.updateScoreCnt();

      // set maze path drawing to false
      this.maze.setPathDrawing(false);
    }
  }

  updateMovingCnt() {
    let id = this.name + "MovingCnt";
    let element = document.getElementById(id);
    element.innerHTML = this.movingCnt;
  }

  updateScoreCnt() {
    let id = this.name + "ScoreCnt";
    let element = document.getElementById(id);
    element.innerHTML = this.scoreCnt;
  }
}


// #################
// key function list
// #################
function keyPressed() {
  if (!maze.state && keyCode != 48) {
    return;
  }


  let dir1;
  let dir2;

  if (DEBUG) {
    // print("keyCode: " + keyCode);
  }


  switch (keyCode) {
    // player1
    case UP_ARROW:
      dir1 = 0;
      break;
    case RIGHT_ARROW:
      dir1 = 1;
      break;
    case DOWN_ARROW:
      dir1 = 2;
      break;
    case LEFT_ARROW:
      dir1 = 3;
      break;
    case 49: // number 1
      player1.respawn();
      break;
    case 191: // /(slash)
      player1.eating = true;
      break;

      // player2
    case 87: // w
      dir2 = 0;
      break;
    case 68: // d
      dir2 = 1;
      break;
    case 83: // s
      dir2 = 2;
      break;
    case 65: // a
      dir2 = 3;
      break;
    case 50: // number 2
      player2.respawn();
      break;
    case 69: // e
      player2.eating = true;
      break;

      // common
    case 77: // m
      maze.setPathDrawing(!maze.pathDrawing);


    case 189: // -

      break;

    case 187: // +

      break;

    case 48: // 0
      maze.resetGame();
      break;
  }


  player1.move(dir1);
  player2.move(dir2);

}


// function mouseDragged() {
//   let dx = movedX;
//   let dy = movedY;

//   let dir;
//   let offset = 8;

//   if (dx > offset)
//     dir = 1;
//   else if (dx < -offset)
//     dir = 3;
//   else if (dy > offset)
//     dir = 2;
//   else if (dy < -offset)
//     dir = 0;

//   // print(dx + " : " + dy);
//   player1.move(dir);
// }