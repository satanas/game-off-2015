'use strict';

var HUD = function() {
  this.speaker = game.add.sprite(340, 10, 'speaker', 0);
  this.score = game.add.bitmapText(15, 20, 'title', String(game.global.score), 32);
};

HUD.prototype.constructor = HUD;

HUD.prototype.update = function(main) {
  this.score.setText(String(game.global.score));
  if (main.muted) {
    this.speaker.frame = 1;
  } else {
    this.speaker.frame = 0;
  }
};

HUD.prototype.hideScore = function() {
  this.score.visible = false;
};
