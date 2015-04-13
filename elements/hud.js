'use strict';

var HUD = function() {
  this.score = game.add.bitmapText(15, 20, 'score', String(game.global.score), 32);
};

HUD.prototype.constructor = HUD;

HUD.prototype.update = function() {
  this.score.setText(String(game.global.score));
};

HUD.prototype.hideScore = function() {
  this.score.visible = false;
};
