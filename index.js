//Variables
const grid = document.querySelector(".grid");
const scoreDisplay = document.querySelector("#score");
const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 560;
const boardHeight = 300;
const ballDiameter = 20;
let timerId
let xDirection = -2;
let yDirection = 2;
let score = 0;

// Starting Positions
//Initial position where the user will start
const userStart = [230, 10];
//Inidicates the position of the user at all times, allowing us to track it
let currentPosition = userStart
//Start position of ball
const ballStart = [270, 40];
let ballCurrentPosition = ballStart;

//Create the prototype block that all blocks will be based on.
class Block {
  //Determining where each point of the blocks are on the grid at any given moment in time using the bottom x and y axis
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topLeft = [xAxis, yAxis + blockHeight];
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
  }
}

// Creating all the blocks
const blocks = [
  new Block(10, 290),
  new Block(120, 290),
  new Block(230, 290),
  new Block(340, 290),
  new Block(450, 290),
  new Block(10, 260),
  new Block(120, 260),
  new Block(230, 260),
  new Block(340, 260),
  new Block(450, 260),
  new Block(10, 230),
  new Block(120, 230),
  new Block(230, 230),
  new Block(340, 230),
  new Block(450, 230),
  new Block(10, 200),
  new Block(120, 200),
  new Block(230, 200),
  new Block(340, 200),
  new Block(450, 200),
  new Block(10, 170),
  new Block(120, 170),
  new Block(230, 170),
  new Block(340, 170),
  new Block(450, 170),
  new Block(10, 140),
  new Block(120, 140),
  new Block(230, 140),
  new Block(340, 140),
  new Block(450, 140),
];



//Drawing  all the blocks
function addBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    //Create the block
    const block = document.createElement("div");
    //Adding the class list of block to the newly created div/variable of block
    block.classList.add("block");
    //Access the array and drawing the block from the bottom left
    block.style.left = blocks[i].bottomLeft[0] + "px";
    //Access the array and drawing the block from the bottom left
    block.style.bottom = blocks[i].bottomLeft[1] + "px";
    //Adding the child to the parent
    grid.appendChild(block);
  }
};

addBlocks();

//Adding the user
const user = document.createElement("div");
//Adding the class list of block to the newly created div/variable of user
user.classList.add("user");
//Drawing the user
drawUser();
//Adding the child to the parent
grid.appendChild(user);

//Draw the user
function drawUser() {
  user.style.left = currentPosition[0] + "px";
  user.style.bottom = currentPosition[1] + "px";
};

//Draw the ball
function drawBall() {
  ball.style.left = ballCurrentPosition[0] + "px";
  ball.style.bottom = ballCurrentPosition[1] + "px";
}

//move user
function moveUser(e) {
  switch (e.key) {
    case "ArrowLeft": //When the left key is pressed the user moves left by 10px
      if (currentPosition[0] > 0) { //As long as our x axis is lESS than zero we can move--allows the user to not go off screen
        currentPosition[0] -= 10;
        drawUser();
      }
      break;
    case "ArrowRight": //When the left key is pressed the user moves left by 10px
      if (currentPosition[0] < boardWidth - blockWidth) { //As long as our x axis is larger than BOARDWIDTH we can move--allows the user to not go off screen
        currentPosition[0] += 10;
        drawUser();
      }
      break;
  }
}

document.addEventListener("keydown", moveUser);

//Create ball
const ball = document.createElement('div');
//Adding the class list of block to the newly created div/variable of ball
ball.classList.add("ball");
//Draw the ball
drawBall();
//Adding the child to the parent
grid.appendChild(ball);


//Move ball
function moveBall() {
  ballCurrentPosition[0] += xDirection;
  ballCurrentPosition[1] += yDirection;
  drawBall();
  checkForCollisions();
}

timerId = setInterval(moveBall, 30);

//check for collisions
function checkForCollisions() {
  //check for block collision
  for (let i = 0; i < blocks.length; i++){
    if
    (
      (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
      ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1])
    )
      {
      const allBlocks = Array.from(document.querySelectorAll('.block'))
      allBlocks[i].classList.remove('block')
      blocks.splice(i,1)
      changeDirection()
      score++
      scoreDisplay.innerHTML = score;
      if (blocks.length == 0) {
        scoreDisplay.innerHTML = 'You Win!';
        clearInterval(timerId);
        document.removeEventListener('keydown', moveUser);
      }
    }
  }
  // check for wall hits
  if (ballCurrentPosition[0] >= (boardWidth - ballDiameter) || ballCurrentPosition[0] <= 0 || ballCurrentPosition[1] >= (boardHeight - ballDiameter))
  {
    changeDirection();
  }

  //check for user collision
  if
  (
    (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth) &&
    (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight )
  )
  {
    changeDirection();
  }

  //game over
  if (ballCurrentPosition[1] <= 0) {
    clearInterval(timerId);
    scoreDisplay.innerHTML = 'You lose!';
    document.removeEventListener('keydown', moveUser);
  }
}


function changeDirection() {
  if (xDirection === 2 && yDirection === 2) {
    yDirection = -2
    return
  }
  if (xDirection === 2 && yDirection === -2) {
    xDirection = -2
    return
  }
  if (xDirection === -2 && yDirection === -2) {
    yDirection = 2
    return
  }
  if (xDirection === -2 && yDirection === 2) {
    xDirection = 2
    return
  }
};
