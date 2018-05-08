var rows = 6;
var columns = 6;
var cellSize = 30;
var snake;
var fr = 30;
var width;
var height;


function setup() {
	width = (columns+2)*cellSize;
	height = (rows+2)*cellSize;
	createCanvas(width,height);
	frameRate(fr);
	snake = new snake();
}

function draw() {
	background(255);
	noFill();
	strokeWeight(4);
	stroke(100);
	for (let row = 0; row < rows; row++) {
		for (let col = 0; col < columns; col++) {
			rect((col+1)*cellSize,(row+1)*cellSize,cellSize,cellSize);
		}
	}
	strokeWeight(5);
	stroke(0);
	rect(cellSize,cellSize,columns*cellSize,rows*cellSize);
	snake.show();
	if (frameCount%(fr/6) == 0 && !snake.win && !snake.dead) {
		snake.move();
	}
	if (snake.dead) {
		//background(0);
		textAlign(CENTER);
		textSize(16);
		fill(255,0,0);
		text("YOU DIED.",width/2,height/2);
	}
	if (snake.win) {
		//background(0);
		textAlign(CENTER);
		textSize(16);
		fill(0,255,0);
		text("YOU WIN.",width/2,height/2);
	}
	//noLoop();
}

function keyPressed() {
	//console.log("key pressed");
	switch(keyCode) {
		case UP_ARROW:
			//console.log("Up");
			snake.up();
			break;
		case RIGHT_ARROW:
			//console.log("Right");
			snake.right();
			break;
		case DOWN_ARROW:
			//console.log("Down");
			snake.down();
			break;
		case LEFT_ARROW:
			//console.log("Left");
			snake.left();
			break;
		default:
			break;
	}
}
