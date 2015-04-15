'use strict';

var menuState = {
  create: function() {
    game.sound.stopAll();
    game.add.image(0, 0, 'title');
    bitmapTextCentered(game.height - 70, 'instructions', 'Press ENTER to start', 12);
    bitmapTextCentered(game.height - 20, 'instructions', 'Created by Wil Alvarez - @satanas82', 10);

    var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    enterKey.onDown.addOnce(this.start, this);
  },

  start: function() {
    game.state.start('play');
  }
};
