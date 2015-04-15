'use strict';

var bootState = {
  preload: function() {
    game.load.image('progressbar', 'assets/images/progressbar.png');
    game.load.bitmapFont('rollback', 'assets/fonts/press-start-rollback.png', 'assets/fonts/press-start-rollback.fnt');
  },

  create: function() {
    game.stage.backgroundColor = '#fff';
    game.state.start('load');
  }
};
