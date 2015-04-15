'use strict';

var menuState = {
  create: function() {
    game.sound.stopAll();
    game.add.image(0, 0, 'title');
    bitmapTextCentered(game.height - 30, 'instructions', 'Press ENTER to start', 12);

    var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    enterKey.onDown.addOnce(this.start, this);
  },

  start: function() {
    game.state.start('play');
  }
};
