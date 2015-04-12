'use strict';

var Octocat = function(x, y, floor) {
  Phaser.Sprite.call(this, game, x + 20, y, 'octocat', 0);

  this.floor = floor;
  game.physics.arcade.enable(this);
  this.body.gravity.y = 1000;
  this.body.collideWorldBounds = true;
  this.body.setSize(40, 56, 20, 13);
  //this.body.x = x;
  this.block = null;
  this.walkingDelay = 0;
  this.newX = x;
  this.direction = null;

  this.cursors = game.input.keyboard.createCursorKeys();

  this.animations.add('main', [0, 1, 2, 3], 12, true);
  //this.changerSound = game.add.audio('changer');

  this.animations.play('main');
  game.add.existing(this);
};

Octocat.prototype = Object.create(Phaser.Sprite.prototype);
Octocat.prototype.constructor = Octocat;

Octocat.prototype.update = function() {
  game.physics.arcade.collide(this, groups.floor);

  if (this.walking && this.walkingDelay === 0) {
    var deltaX = game.time.elapsedMS * 40/100;
    if (this.direction === 'left') {
      this.walkLeft(deltaX);
      //this.body.x -= deltaX;
      //if (this.block) this.block.x -= deltaX;
      //if (this.body.x <= this.newX) {
      //  this.body.x = this.newX;
      //  this.walking = false;
      //  this.walkingDelay = 25;
      //}
    } else {
      this.walkRight(deltaX);
      //this.body.x += deltaX;
      //if (this.block) this.block.x += deltaX;
      //if (this.body.x >= this.newX) {
      //  this.body.x = this.newX;
      //  this.walking = false;
      //  this.walkingDelay = 25;
      //}
    }
  } else if (this.walking && this.walkingDelay > 0) {
    this.walkingDelay -= game.time.elapsedMS;
    if (this.walkingDelay <= 0) {
      this.walking = false;
      this.walkingDelay = 0;
    }
  } else {
    this.checkMovement();
    //var newX = null, blockX = null;

    //if (this.cursors.left.isDown) {
    //  if (this.body.x > 0) {
    //    newX = this.body.x - 40;
    //    blockX = this.body.x - 20;
    //  }
    //} else if (this.cursors.right.isDown) {
    //  if (this.body.x + 40 < 380) {
    //    newX = this.body.x + 40;
    //    blockX = this.body.x + 60;
    //  }
    //}

    //if (newX !== null && this.alive) {
    //  this.move(newX, blockX);
    //}
  }
};

Octocat.prototype.checkMovement = function() {
    var newX = null, blockX = null;

    if (this.cursors.left.isDown) {
      if (this.body.x > 0) {
        newX = this.body.x - 40;
        //blockX = this.body.x - 20;
      }
    } else if (this.cursors.right.isDown) {
      if (this.body.x + 40 < 380) {
        newX = this.body.x + 40;
        //blockX = this.body.x + 60;
      }
    }

    if (newX !== null && this.alive) {
      //this.move(newX, blockX);
      this.walking = true;
      this.newX = newX;
      if (this.newX >= this.x) {
        this.direction = 'right';
      } else {
        this.direction = 'left';
      }
      console.log('set movement', this.body.x, newX, this.direction);
    }
};

Octocat.prototype.walkLeft = function(deltaX) {
  this.body.x -= deltaX;
  console.log('walkLeft', this.body.x, this.newX);
  if (this.block) this.block.x -= deltaX;
  if (this.body.x <= this.newX) {
    this.stopWalking();
  }
};

Octocat.prototype.walkRight = function(deltaX) {
  this.body.x += deltaX;
  console.log('walkRight', this.body.x, this.newX);
  if (this.block) this.block.x += deltaX;
  if (this.body.x >= this.newX) {
    this.stopWalking();
  }
};

Octocat.prototype.stopWalking = function() {
  this.body.x = this.newX;
  if (this.block) {
    this.block.x = this.body.x;
  }
  this.walkingDelay = 22;
};

Octocat.prototype.updateHeight = function(floor) {
  this.y = floor.getHeight() - 67;
  if (this.block) {
    this.block.y = this.y + 10;
  }
};

Octocat.prototype.takeBlock = function(block) {
  this.block = block;
  this.block.falling = false;
  this.block.y = this.y + 12;
  this.block.x = this.body.x;
};

Octocat.prototype.dropBlock = function() {
  if (this.walking) return null;

  var b = this.block;
  this.block = null;
  return b;
}
