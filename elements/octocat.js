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
    } else {
      this.walkRight(deltaX);
    }
  } else if (this.walking && this.walkingDelay > 0) {
    this.walkingDelay -= game.time.elapsedMS;
    if (this.walkingDelay <= 0) {
      this.walking = false;
      this.walkingDelay = 0;
    }
  } else {
    this.checkMovement();
  }
};

Octocat.prototype.checkMovement = function() {
  if (!this.alive) return;

  if (this.cursors.left.isDown) {
    if (this.body.x > 0) {
      this.newX = this.body.x - 40;
      this.direction = 'left';
    }
  } else if (this.cursors.right.isDown) {
    if (this.body.x + 40 < 380) {
      this.newX = this.body.x + 40;
      this.direction = 'right';
    }
  }

  this.walking = true;
};

Octocat.prototype.walkLeft = function(deltaX) {
  this.body.x -= deltaX;
  if (this.block) this.block.x -= deltaX;
  if (this.body.x <= this.newX) {
    this.stopWalking();
  }
};

Octocat.prototype.walkRight = function(deltaX) {
  this.body.x += deltaX;
  if (this.block) this.block.x += deltaX;
  if (this.body.x >= this.newX) {
    this.stopWalking();
  }
};

Octocat.prototype.stopWalking = function() {
  this.body.x = this.newX;
  if (this.block) {
    this.block.x = this.newX;
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
};

Octocat.prototype.fire = function() {
  this.alive = false;
  this.animations.stop();
  this.frame = 4;
};
