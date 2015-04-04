'use strict';

var game = new Phaser.Game(400, 640, Phaser.AUTO, 'game');
game.global = {
  blockDelay: 500,
}
var debug = false;
var groups = {};
var codeType = {
  RB: 0,
  JS: 1,
  JAVA: 2,
  PY: 3,
  HTML: 4,
  BLE: 5,
  BUG: 6
};

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);

game.state.start('boot');
