var Direction = {
    Left: 0,
    Right: 1
}
// Enemies our player must avoid
var Enemy = function (y, speed, direction) {
    this.id = y;
    this.direction = direction || ( getRandomArbitrary(0, 1) ? Direction.Right : Direction.Left );
    var coefficient = this.direction === Direction.Right ? 1 : -1;
    y = y || 2;
    speed = speed || getRandomArbitrary(1, 3);
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = this.direction === Direction.Right ? 'images/enemy-bug-facing-right.png' : 'images/enemy-bug-facing-left.png';
    this.x = this.direction === Direction.Right ? -1 : 6;
    this.y = y;
    this.speed = speed * coefficient;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.speed;
    if (((this.direction === Direction.Right) && (this.x > 5))
    || ((this.direction === Direction.Left) && (this.x < -1))){
        allEnemies.splice(this.id-1, 1, new Enemy(this.id));
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 75);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.score = 0;
    this.reset();
}

Player.prototype.handleInput = function (direction) {

    switch (direction) {
        case 'left':
            if (this.x > 0)
                this.x -= 1;
            break;
        case 'right':
            if (this.x < 4)
                this.x += 1;
            break;
        case 'up':
            if (this.y > 0)
                this.y -= 1;
            break;
        case 'down':
            if (this.y < 5)
                this.y += 1;
            break;
    }
}

Player.prototype.update = function () {
    if (this.y === 0) {
        this.score++;
        this.reset();
    }
}

Player.prototype.reset = function () {
    this.x = 2;
    this.y = 5;
}

Player.prototype.lose = function () {
    if (this.score > 0)
        this.score -= 1;
    this.reset();
}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
allEnemies.push(new Enemy(1, 1, Direction.Right));
allEnemies.push(new Enemy(2, 2, Direction.Left));
allEnemies.push(new Enemy(3, 1, Direction.Right));
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}