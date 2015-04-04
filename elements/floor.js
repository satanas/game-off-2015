'use strict';

var Floor = function() {
  this.h = 40;
  this.lines = [
    [null, null, null, null, null, null, null, null, null, null]
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

  for (var i = 0; i < this.lines.length; i++) {
    if (this.lines[i][position] === null) {
      index = i;
      break;
    }
  }

  if (index === null) {
    this.lines.push([null, null, null, null, null, null, null, null, null, null]);
    index = this.lines.length - 1;
    this.sprite.y = this.getHeight();
    player.updateHeight(this);
  }

  block.settle(block.x, 640 - (40 * (index + 1)));
  this.lines[index][position] = block;
  console.log('settle', index, position, this.lines);
  this.checkDeploy(index, player);
};

Floor.prototype.checkDeploy = function(line, player) {
  var deploy = true,
      self = this;

  for (var i = 0; i < 10; i++) {
    if (this.lines[line][i] === null) {
      deploy = false;
      break;
    }
  }

  if (deploy) {
    console.log('deploy', line);
    // remove blocks
    for (var i = 0; i < 10; i++) {
      this.lines[line][i].kill();
    }

    // displace blocks
    for (var j = line; j < this.lines.length - 1; j++) {
      console.log('displacing line', j);
      for (var i = 0; i < 10; i++) {
        this.lines[j][i] = this.lines[j + 1][i];
        if (this.lines[j][i] !== null) {
          this.lines[j][i].displace();
        }
      }
    }

    // remove last line
    this.lines.pop();
    this.sprite.y = this.getHeight();
    player.updateHeight(this);
  }
};
