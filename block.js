'use strict';

var Block = function() {
  var x = Math.floor(Math.random() * 10) * 40;
  this.language = Math.floor(Math.random() * 6);
  this.delay = game.global.blockDelay;
  Phaser.Sprite.call(this, game, x, 0, 'blocks', this.language);

  game.physics.arcade.enable(this);
  groups.blocks.add(this);
};

Block.prototype = Object.create(Phaser.Sprite.prototype);
Block.prototype.constructor = Block;

Block.prototype.update = function() {
  this.delay -= game.time.elapsedMS;
  if (this.delay <= 0) {
    this.y += 40;
    this.delay = game.global.blockDelay;
  }

  if (!this.alive) {
    this.destroy();
  }
};
