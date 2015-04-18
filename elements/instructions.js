'use strict';

var Instructions = function() {
  this.step = 0;
  this.x1 = 130;
  this.x2 = 155;
  this.fontSize = 14;
  this.fontFamily = 'instructions';
  this.enabled = true;
  this.rendered = false;
};

Instructions.prototype.constructor = Instructions;

Instructions.prototype.next = function(step) {
  if (!this.enabled) return;

  if (step) {
    this.step = step;
  } else {
    this.step += 1;
  }
  if (this.l1) this.l1.destroy();
  if (this.l2) this.l2.destroy();
  if (this.step < 10) {
    this.rendered = false;
  } else {
    this.poster.destroy();
    this.enabled = false;
  }
};

Instructions.prototype.setStep = function(step) {
  this.next(step);
};

Instructions.prototype.createLabels = function(line1, line2) {
  this.l1 = bitmapTextCentered(this.x1, this.fontFamily, line1, this.fontSize);
  this.l2 = bitmapTextCentered(this.x2, this.fontFamily, line2, this.fontSize);
  //var tween = game.add.tween(this.l1);
  //tween.to({alpha: 100}, 1000, Phaser.Easing.Linear.None, true, 3000);
  //console.log('createLabels');
};

Instructions.prototype.update = function() {
  if (this.enabled && !this.rendered) {
    if (this.step === 0) {
      this.poster = game.add.image(0, 100, 'poster');
      this.createLabels('Move with the arrows to', 'catch the block');
    } else if (this.step === 1) {
      this.createLabels('Now press down to drop', 'the block into dev zone');
    } else if (this.step === 2) {
      this.createLabels('Catch the new block and', 'drop it into the zone');
    } else if (this.step === 3) {
      this.createLabels('Good! Horizontal lines', 'represent applications');
    } else if (this.step === 4) {
      this.createLabels('Combine the blocks to', 'create popular apps');
    } else if (this.step === 5) {
      this.createLabels('Popular apps will deploy', 'giving you points');
    } else if (this.step === 6) {
      this.createLabels('Unknown apps won\'t deploy', 'making your code grow');
    } else if (this.step === 7) {
      this.createLabels('If you reach the top of', 'the screen, you\'re fired');
    } else if (this.step === 8) {
      this.createLabels('If you create buggy', 'apps, you\'re fired');
    } else if (this.step === 9) {
      this.createLabels('That\'s all folks.', 'Good luck!');
    }
    this.rendered = true;
  }
};
