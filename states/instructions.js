'use strict';

var instructionsState = {
  create: function() {
    game.sound.stopAll();
    game.add.image(0, 0, 'background');
    var bg = this.game.add.graphics(0, 0);
    bg.beginFill(0x000000, 1);
    bg.drawRect(game.camera.x, game.camera.y, game.width, game.height);
    bg.alpha = 0.5;
    bg.endFill();
    game.add.bitmapText(12, 60, 'instructions', 'Instructions', 20);
    game.add.bitmapText(15, 90, 'instructions', '1. Take the blocks of code that', 12);
    game.add.bitmapText(15, 105, 'instructions', '   fall from above', 12);
    game.add.bitmapText(15, 135, 'instructions', '2. Combine the blocks in lines', 12);
    game.add.bitmapText(15, 150, 'instructions', '   to create popular apps and', 12);
    game.add.bitmapText(15, 165, 'instructions', '   deploy them', 12);
    game.add.bitmapText(15, 195, 'instructions', '3. Missed blocks will become', 12);
    game.add.bitmapText(15, 210, 'instructions', '   bugs', 12);
    game.add.bitmapText(15, 240, 'instructions', '4. Unknown or buggy apps won\'t', 12);
    game.add.bitmapText(15, 255, 'instructions', '   be deployed', 12);
    game.add.bitmapText(15, 285, 'instructions', '5. If Octocat touch the top of', 12);
    game.add.bitmapText(15, 300, 'instructions', '   the screen, you\'re fired', 12);
    game.add.bitmapText(15, 330, 'instructions', '6. If an app has more than 4', 12);
    game.add.bitmapText(15, 345, 'instructions', '   bugs, you\'re fired', 12);
    game.add.bitmapText(12, 400, 'instructions', 'Controls', 20);
    game.add.bitmapText(15, 430, 'instructions', '* Arrows to move and drop', 12);
    game.add.bitmapText(15, 460, 'instructions', '* P to pause the game', 12);
    game.add.bitmapText(15, 490, 'instructions', '* M to mute the music', 12);
    bitmapTextCentered(game.height - 40, 'instructions', 'Press ENTER to continue', 12);

    var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    enterKey.onDown.addOnce(this.start, this);
  },

  start: function() {
    game.state.start('play');
  }
};
