'use strict';

var game = new Phaser.Game(400, 640, Phaser.AUTO, 'game');
game.global = {
  block: {
    spawn: 9000,
    speed: 600,
    minSpawn: 2000,
    minSpeed: 100,
  },
  deploysToNextLevel: 2,
  movementsToNextLevel: 10,
  bugsToRollback: 4,
  score: 0,
  bonus: {
    ultra: 600,
    super: 300
  }
}
var debug = false;
var groups = {};

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('instructions', instructionsState);
game.state.add('play', playState);

game.state.start('boot');
