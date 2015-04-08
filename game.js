'use strict';

var game = new Phaser.Game(400, 640, Phaser.AUTO, 'game');
game.global = {
  block: {
    spawn: 8000,
    speed: 600
  },
  deploysToNextLevel: 2,
  bugsToRollback: 3,
  score: 0,
  bonus: {
    ultra: 600,
    super: 300,
    rollback: -200
  }
}
var debug = false;
var groups = {};

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);

game.state.start('boot');
