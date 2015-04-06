'use strict';

var Block = function() {
  var x = Math.floor(Math.random() * 10) * 40;

  this.falling = true;
  this.language = new Language();
  this.delay = game.global.blockDelay;
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
      this.delay = game.global.blockDelay;
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
  this.y += 40;
};

Block.prototype.addBug = function() {
  this.language.addBug();
  this.frame = 6;
};
