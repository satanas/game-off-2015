'use strict';

var Octocat = function(x, y) {
  Phaser.Sprite.call(this, game, x, y, 'octocat', 0);

  game.physics.arcade.enable(this);
  this.body.gravity.y = 1000;
  this.body.collideWorldBounds = true;
  this.body.setSize(40, 56, 20, 13);
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
  this.body.velocity.x = 0;
  if (this.cursors.left.isDown) {
    this.body.velocity.x = -300;
  } else if (this.cursors.right.isDown) {
    this.body.velocity.x = 300;
  }
};
