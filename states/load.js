'use strict';

var loadState = {
  preload: function() {
    bitmapTextCentered(game.height - 20, 'open_sans', 'Loading...', 20);

    var progressBar = game.add.sprite(100, 300, 'progressbar');
    progressBar.anchor.setTo(0, 0.5);
    game.load.setPreloadSprite(progressBar);

    // Fonts
    //game.load.bitmapFont('zerothre', 'assets/fonts/zerothre.png', 'assets/fonts/zerothre.fnt');
    //game.load.bitmapFont('record', 'assets/fonts/record.png', 'assets/fonts/record.fnt');

    // Sprites
    game.load.image('title', 'assets/images/title.png');
    game.load.image('floor', 'assets/images/floor.png');
    game.load.image('background', 'assets/images/background.png');

    // Spritesheets
    game.load.spritesheet('octocat', 'assets/images/octocat.png', 80, 80);
    game.load.spritesheet('blocks', 'assets/images/blocks.png', 40, 40);

    // Sounds
    //game.load.audio('capture', 'assets/sounds/capture.mp3');
    //game.load.audio('changer', 'assets/sounds/changer.mp3');
    //game.load.audio('walking', 'assets/sounds/walking.mp3');
    //game.load.audio('option', 'assets/sounds/cursor.mp3');
    //game.load.audio('select', 'assets/sounds/select.mp3');
    //game.load.audio('win', 'assets/sounds/win.mp3');
    //game.load.audio('blocked', 'assets/sounds/blocked.mp3');

    // BGMs
    //game.load.audio('main', 'assets/sounds/main.mp3', 0.75, true);
    //game.load.audio('finish', 'assets/sounds/finish.mp3', 0.75);
    //game.load.audio('track1', 'assets/sounds/track1.mp3', 0.75, true);
    //game.load.audio('track2', 'assets/sounds/track2.mp3', 0.75, true);
    //game.load.audio('track3', 'assets/sounds/track3.mp3', 0.75, true);
    //game.load.audio('track4', 'assets/sounds/track4.mp3', 0.75, true);
    //game.load.audio('track5', 'assets/sounds/track5.mp3', 0.75, true);
    //game.load.audio('track6', 'assets/sounds/track6.mp3', 0.75, true);

    //for (var i=1; i<=game.global.totalLevels; i++) {
    //  game.load.tilemap(i.toString(), 'assets/maps/' + i.toString() + '.json', null, Phaser.Tilemap.TILED_JSON);
    //}
  },

  create: function() {
    game.state.start('menu');
  }
};
