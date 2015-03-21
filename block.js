'use strict';

var Block = function() {
  var x = Math.floor(Math.random() * 10) * 40;
  Phaser.Sprite.call(this, game, x, 0, 'blocks', 0);

  game.physics.arcade.enable(this);
  this.body.velocity.y = 150;
  groups.blocks.add(this);
};

Block.prototype = Object.create(Phaser.Sprite.prototype);
Block.prototype.constructor = Block;

Block.prototype.update = function() {
};
