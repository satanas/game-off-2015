'use strict';

var Floor = function() {
  this.h = 40;
  this.lines = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];

  this.sprite = game.add.sprite(0, 580, 'floor');
  game.physics.arcade.enable(this.sprite);
  this.sprite.body.immovable = true;
  groups.floor.add(this.sprite);
};

//Floor.prototype = Object.create();

Floor.prototype.constructor = Floor;

Floor.prototype.addBlock = function(x) {
};
