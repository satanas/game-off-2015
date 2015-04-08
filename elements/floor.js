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
  var height = 640 - ((this.h * this.lines.length) + 20);
  if (height > 580) height = 580;
  return height;
};

Floor.prototype.getLineHeight = function(line) {
  return 640 - (this.h * (line + 1));
};

Floor.prototype.addBlock = function(block, player) {
  var index = null,
      position = Math.floor(block.x / 40);

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
  console.log('settle', index, position, block.language.name);
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
    // perform deploy and score
    var bugs = 0;
    var score = 0;
    var app = new Application();
    for (var i = 0; i < 10; i++) {
      var block = this.lines[line][i];
      score += block.language.points;
      app.addCode(block);
      block.kill();
    }
    app.build();
    score += app.bonus;

    var font = 'regular',
        sizePoints = 32,
        sizeText = 20;
    if (app.name !== null) {
      if (app.bonus === game.global.bonus.super) {
        font = 'super';
        sizePoints = 52;
      } else if (app.bonus === game.global.bonus.ultra) {
        font = 'ultra';
        sizePoints = 72;
      } else if (app.bonus === game.global.bonus.rollback) {
        font = 'regular';
      }
      //font = (app.bonus === game.global.bonus.super) ? 'super': 'ultra';
      //sizePoints = (app.bonus === game.global.bonus.super) ? 52 : 72;

      var appText = bitmapTextCentered(320, font, app.name, sizeText);
      var appTween = game.add.tween(appText);
      appTween.to({y: 230, alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
    }

    var scoreText = bitmapTextCentered(250, font, String(score), sizePoints);
    var scoreTween = game.add.tween(scoreText);
    scoreTween.to({y: 160, alpha: 0}, 1500, Phaser.Easing.Linear.None, true);

    game.global.score += score;

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
