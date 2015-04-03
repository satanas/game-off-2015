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

Floor.prototype.constructor = Floor;

Floor.prototype.getHeight = function() {
  return 640 - ((this.h * this.lines.length) + 20);
};

Floor.prototype.getLineHeight = function(line) {
  return 640 - (this.h * (line + 1));
};

Floor.prototype.addBlock = function(block, player) {
  var index = null,
      position = block.x / 40;

  for (var i=0; i<this.lines.length; i++) {
    if (this.lines[i][position] === 0) {
      index = i;
      break;
    }
  }

  if (index === null) {
    this.lines.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    index = this.lines.length - 1;
    this.sprite.y = this.getHeight();
    player.updateHeight(this);
  }

  block.settle(block.x, 640 - (40 * (index + 1)));
  this.lines[index][position] = 1;
  this.checkDeploy(index);
};

Floor.prototype.checkDeploy = function(line) {
  var deploy = true,
      self = this;

  for (var i=0; i<10; i++) {
    if (this.lines[line][i] === 0) {
      deploy = false;
      break;
    }
  }

  if (deploy) {
    // displace blocks
    console.log('deploy', line);
    groups.blocks.forEach(function(block) {
      if (block.y === self.getLineHeight(line)) {
        block.kill();
      }
    });

    //groups.blocks.forEach(function(block) {
    //  if (block.y > self.getLineHeight(line)) {
    //    block.y = block.y + 40;
    //  }
    //});
  }
};
