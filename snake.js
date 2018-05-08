function snake() {
  this.col = 0;
  this.row = 0;
  this.dir = 1;
  this.nextDir = 1;
  this.dead = false;
  this.body = [[this.col,this.row]];
  this.food = [Math.floor(map(Math.random(),0,1,0,columns)),Math.floor(map(Math.random(),0,1,0,rows))];
  this.win = false;
  this.lastLineFlag = false;

  this.AI = function() {
    if (this.body[0][0] == 0 && this.body[0][1] == 0) {
      this.right();
    }
    if (this.body[0][0] == columns - 1 && this.body[0][1] == 0) {
      this.down();
    }
    if (this.body[0][0] == columns - 1 && this.body[0][1] == rows -1) {
      this.left();
    }
    if (this.body[0][0] == columns - 2 && this.body[0][1] == rows - 1) {
      this.up();
    }
    if (this.body[0][0] == columns - 2 && this.body[0][1] == 1) {
      this.left();
    }
    for (let x = 0; x < (rows-2)/2; x++) {
      if (this.body[0][0] == 1 && this.body[0][1] == 1+x*2) {
        this.down();
      }
      if (this.body[0][0] == 1 && this.body[0][1] == 2+x*2) {
        this.right();
      }
      if (this.body[0][0] == columns - 3 && this.body[0][1] == 2+x*2) {
        this.down();
      }
      if (this.body[0][0] == columns - 3 && this.body[0][1] == 3+x*2) {
          this.left();
      }
    }
    if (this.body[0][0] == 0 && this.body[0][1] == rows - 1) {
      this.up();
    }
  }



  this.show = function() {
    push();
    strokeWeight(0);
    fill(0,255,0);
    rect((this.food[0]+1.2)*cellSize,(this.food[1]+1.2)*cellSize,cellSize*0.6,cellSize*0.6);
    fill(255,0,0);
    this.body.forEach(function(element) {
      rect((element[0]+1.2)*cellSize,(element[1]+1.2)*cellSize,cellSize*0.6,cellSize*0.6);
    });
    fill(0,0,255);
    rect((this.body[0][0]+1.2)*cellSize,(this.body[0][1]+1.2)*cellSize,cellSize*0.6,cellSize*0.6);
    pop();
  }

  this.grow = function() {
    this.body.push(this.body[this.body.length-1]);
    if (this.body.length >= rows*columns) {
      this.win = true;
    }
  }

  this.up = function() {
    if (this.dir%2 == 1) {
      this.nextDir = 0;
    }
  }

  this.right = function() {
    if (this.dir%2 == 0) {
      this.nextDir = 1;
    }
  }

  this.down = function() {
    if (this.dir%2 == 1) {
      this.nextDir = 2;
    }
  }

  this.left = function() {
    if (this.dir%2 == 0) {
      this.nextDir = 3;
    }
  }

  this.move = function() {
    this.AI();
    this.dir = this.nextDir;
    switch(this.dir) {
      case 0:
        this.row--;
        break;
      case 1:
        this.col++;
        break;
      case 2:
        this.row++;
        break;
      case 3:
        this.col--;
        break;
    }
    this.body.unshift([this.col,this.row]);
    this.body.pop();
    this.dead = this.snakeCollision() || this.checkLife();
    if (this.body[0][0] == this.food[0] && this.body[0][1] == this.food[1]) {
      snake.grow();
      do {
        this.food = [Math.floor(map(Math.random(),0,1,0,columns)),Math.floor(map(Math.random(),0,1,0,rows))];
      } while (!this.win && this.foodInSpace());
    }
  }

  this.foodInSpace = function() {
    let found = false;
    this.body.forEach(function(element) {
      if (element[0] == snake.food[0] && element[1] == snake.food[1]) {
        found = true;
      }
    });
    return found;
  }

  this.snakeCollision = function() {
    let head = true;
    let collision = false;
    this.body.forEach(function(element) {
      if (head) {
        head = false;
      } else {
        if (element[0] == snake.body[0][0] && element[1] == snake.body[0][1]) {
          collision = true;
        }
      }
    });
    return collision;
  }

  this.checkLife = function() {
    return this.row < 0 || this.col < 0 || this.row >= rows || this.col >= columns;
  }
}
