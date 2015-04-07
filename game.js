'use strict';

var game = new Phaser.Game(400, 640, Phaser.AUTO, 'game');
game.global = {
  blockDelay: 500,
  score: 0
}
var debug = false;
var groups = {};
var singleBonus = 600;
var doubleBonus = 200;
var bonusType = {
  'super': 1,
  'ultra': 2
};

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);

game.state.start('boot');
