class Item {

  /*
  attrubute
  - i
  - j
  - realCenterX
  - realCenterY
  - maze
  - color
  
  
  method
  - constructor()
  - init()
  - setRandomColor()
  - show()
  - registerMaze(maze)
  - useItem(player)
  - initMazeAbility(player)
  - swapWithRandomPlayerAbility(player)
  - drawPathAbility(player)
  - moveToRandomLocation(player)
  - passRandomWall(player)
  - respawnRandomPlayer(player)
  
  
  */

  constructor() {
    this.color = [255, 0, 0];
    this.abilityCount = 6;
  }

  init() {
    // i, j
    this.i = floor(random(this.maze.cols));
    this.j = floor(random(this.maze.rows));

    // real x, y
    this.realCenterX = (this.i * this.maze.size) + (this.maze.size * (1 / 2));
    this.realCenterY = (this.j * this.maze.size) + (this.maze.size * (1 / 2));

    // change color
    this.setRandomColor();
  }

  setRandomColor() {
    let r = floor(random(255));
    let g = floor(random(255));
    let b = floor(random(255));

    this.color = [r, g, b];
  }

  show() {
    fill(this.color);
    noStroke();
    ellipseMode(CENTER);
    ellipse(this.realCenterX, this.realCenterY, this.maze.size * (3 / 5));
  }

  registerMaze(maze) {
    this.maze = maze;

    this.init();
  }

  useItem(player) {
    let r = floor(random(this.abilityCount)) + 1;

    switch (r) {
      case 1:
        this.initMazeAbility(player);
        break;
      case 2:
        this.swapWithRandomPlayerAbility(player);
        break;
      case 3:
        this.pathAbility(player);
        break;
      case 4:
        this.moveToRandomLocation(player);
        break;
      case 5:
        this.passRandomWall(player);
        break;
      case 6:
        this.respawnRandomPlayer(player);
        break;
        case 7:
        this.changeDirAbility(player);
        break;
    }

    // change item location
    this.init();
  }

  initMazeAbility(player) {
    // 1: reload maze with same size
    this.maze.initMaze();
    print("initMazeAbility");
  }

  swapWithRandomPlayerAbility(player) {
    // 2: swap location with other random player

    let randomPlayer = this.maze.getRandomPlayer(player);
  
    this.maze.swapLocationEachOther(player, randomPlayer);
    print("swapWithRandomPlayerAbility");
  }

  pathAbility(player) {
    // 3: draw or remove maze path until someone gets score
    this.maze.setPathDrawing(!this.maze.drawingPath);

    print("drawPathAbility");
  }

  moveToRandomLocation(player) {
    // 4: move player to random location

    let ri = this.maze.getRandomILocation();
    let rj = this.maze.getRandomJLocation();
    
    this.maze.teleportObject(player, ri, rj);

    print("moveToRandomLocation");
  }

  passRandomWall(player) {
    // 5: pass random wall from player's location

    let randomDir = floor(random(4));

    let di = 0 , dj = 0;

    switch (randomDir) {
      case this.maze.TOP:
        dj = -1;
        break;
      case this.maze.RIGHT:
        di = 1;
        break;
      case this.maze.BOTTOM:
        dj = 1;
        break;
      case this.maze.LEFT:
        di = -1;
        break;
    }
    
    this.maze.teleportObject(player, player.i + di, player.j + dj);

    print("passRandomWall");
  }

  respawnRandomPlayer(player) {
    // 6: respawn random player

    maze.respawn(player);

    print("respawnRandomPlayer");
  }
  
  changeDirAbility(player) {
    this.maze.changeDir(player);
  }
}












