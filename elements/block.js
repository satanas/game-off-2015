'use strict';

var Block = function(delay) {
  var x = Math.floor(Math.random() * 10) * 40;

  this.falling = true;
  this.language = new Language();
  this.moveDelay = delay;
  if (delay) {
    this.delay = delay;
  } else {
    this.delay = game.global.block.speed;
  }
  Phaser.Sprite.call(this, game, x, 0, 'blocks', this.language.index);

  game.physics.arcade.enable(this);
  groups.blocks.add(this);
};

Block.prototype = Object.create(Phaser.Sprite.prototype);
Block.prototype.constructor = Block;

Block.prototype.update = function() {
  if (this.falling) {
    this.delay -= game.time.elapsedMS;
    if (this.delay <= 0) {
      this.y += 40;
      this.delay = this.moveDelay;
    }
  }

  if (!this.alive) {
    this.destroy();
  }
};

Block.prototype.settle = function(x, y) {
  this.x = x;
  this.falling = false;
  var tween = game.add.tween(this);
  tween.to({y: y}, 200, Phaser.Easing.Linear.None, true);
};

Block.prototype.displace = function() {
  var tween = game.add.tween(this);
  tween.to({y: this.y + 40}, 250, Phaser.Easing.Linear.None, true);
};

Block.prototype.addBug = function() {
  this.language.addBug();
  this.frame = 6;
};

Block.prototype.isBug = function() {
  return this.language.isBug();
};
