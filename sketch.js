let canvasSize = 500;
let cellSize = 100;

let maze;
let mpg;
let mpf;
let player1;
let player2;

let manager;

let DEBUG = true;

function setup() {
  createCanvas(canvasSize, canvasSize);
  frameRate(60);

  // MazeGenerator
  mpg = new MazePathGenerator();

  // MazePathFinder
  mpf = new MazePathFinder();

  // Maze
  maze = new Maze(cellSize, mpg, mpf);
  maze.initMaze();

  // Player
  player1 = new Player("p1", [255, 0, 0, 100]);
  player2 = new Player("p2", [0, 255, 0, 100]);

  // drop player to maze
  maze.dropPlayer(player1);
  maze.dropPlayer(player2);

}

function draw() {
  background(0);

  // draw maze
  maze.draw();
}