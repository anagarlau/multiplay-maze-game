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

  // !maze로 옮기지 말고, 꼭 this.maze필요한 값들은
  // 매개변수로 넘겨주기
  show(maze) {
    let offset = 5;

    noStroke();
    fill(this.color);
    rect(this.i * maze.size + offset,
      this.j * maze.size + offset,
      maze.size - (2 * offset),
      maze.size - (2 * offset));


    // draw Dir (A, B)
    let realX = this.i * maze.size;
    let realY = this.j * maze.size;
    textSize(maze.size);
    fill(255);

    text(this.dir,
      realX + (maze.size * (1 / 6)),
      realY + (maze.size * (5 / 6)));
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