'use strict';

var bootState = {
  preload: function() {
    game.load.image('progressbar', 'assets/images/progressbar.png');
    game.load.bitmapFont('open_sans', 'assets/fonts/open-sans.png', 'assets/fonts/open-sans.fnt');
  },

  create: function() {
    game.stage.backgroundColor = '#fff';
    game.state.start('load');
  }
};
