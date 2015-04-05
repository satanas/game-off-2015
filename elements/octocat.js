'use strict';

var Octocat = function(x, y, floor) {
  Phaser.Sprite.call(this, game, x, y, 'octocat', 0);

  this.floor = floor;
  game.physics.arcade.enable(this);
  this.body.gravity.y = 1000;
  this.body.collideWorldBounds = true;
  this.body.setSize(40, 56, 20, 13);
  this.block = null;
  //this.body.maxVelocity.y = 500;
  //this.body.maxVelocity.x = 200;

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

  //this.body.velocity.x = 0;
  //if (this.cursors.left.isDown) {
  //  this.body.velocity.x = -300;
  //} else if (this.cursors.right.isDown) {
  //  this.body.velocity.x = 300;
  //}

  var tween = null;

  if (!this.walking) {
    if (this.cursors.left.isDown) {
      this.walking = true;
      tween = game.add.tween(this);
      tween.to({x: this.x - 40}, 100, Phaser.Easing.Linear.None, true);
      if (this.block) {
        var tween2 = game.add.tween(this.block);
        tween2.to({x: this.x - 20}, 100, Phaser.Easing.Linear.None, true);
      }
    } else if (this.cursors.right.isDown) {
      this.walking = true;
      tween = game.add.tween(this);
      tween.to({x: this.x + 40}, 100, Phaser.Easing.Linear.None, true);
      if (this.block) {
        var tween2 = game.add.tween(this.block);
        tween2.to({x: this.x + 60}, 100, Phaser.Easing.Linear.None, true);
      }
    }

    if (tween) {
      tween.onComplete.add(function(){
        this.walking = false;
      }, this);
    }
  }
};

Octocat.prototype.onCollision = function(self, block) {
  block.destroy();
};

Octocat.prototype.checkCollision = function(self, block) {
  return true;
};

Octocat.prototype.updateHeight = function(floor) {
  this.y = floor.getHeight() - 67;
};

Octocat.prototype.takeBlock = function(block) {
  this.block = block;
  this.block.falling = false;
  this.block.y = this.y + 12;
  this.block.x = this.body.x;
};

Octocat.prototype.dropBlock = function() {
  var b = this.block;
  this.block = null;
  return b;
}
