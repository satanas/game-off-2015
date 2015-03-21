'use strict';

var game = new Phaser.Game(400, 640, Phaser.AUTO, 'game');
game.global = {}
var debug = false;
var groups = {};

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);

game.state.start('boot');
