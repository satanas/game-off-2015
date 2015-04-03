'use strict';

var playState = {
  create: function() {
    this.player = null;
    this.sceneDelay = 500;
    this.blockDelay = 3500;
    this.elapsed = 3500;
    this.muted = false;
    game.sound.stopAll();

    game.global.time = 0;

    groups.blocks = game.add.group();
    groups.hud = game.add.group();
    groups.floor = game.add.group();

    this.player = new Octocat(100, 400);
    this.floor = new Floor();

    //Ingame menu shortcuts
    //this.quitKey = game.input.keyboard.addKey(Phaser.Keyboard.Q);
    //this.quitKey.onUp.add(this.quitGame, this);

    //this.restartKey = game.input.keyboard.addKey(Phaser.Keyboard.R);
    //this.restartKey.onUp.add(this.restartGame, this);

    //this.muteKey = game.input.keyboard.addKey(Phaser.Keyboard.M);
    //this.muteKey.onUp.add(this.muteGame, this);

    ////groups.walls.debug = true;
    //this.pausedGame = false;
    //this.pauseKey = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    //this.pauseKey.onUp.add(this.togglePause, this);

    //this.ingameMenu = new IngameMenu(this);
    //this.hud = new HUD();
    //this.tutorial = new Tutorial(this.player);
  },

  update: function() {
    this.elapsed += game.time.elapsedMS;
    if (this.elapsed >= this.blockDelay) {
      this.elapsed = 0;
      var block = new Block();
    }

    var self = this;
    groups.blocks.forEach(function(block) {
      if (game.physics.arcade.intersects(self.player.body, block.body)) {
        block.kill();
      }

      if (game.physics.arcade.intersects(groups.floor.children[0].body, block.body) && block.falling) {
        self.floor.addBlock(block, self.player);
      }
    });
    //this.hud.update();
    //game.global.time += game.time.elapsed;
    //if (groups.viruses.length === 0) {
    //  this.sceneDelay -= game.time.elapsed;
    //  if (this.sceneDelay <= 0) {
    //    if (game.global.level === game.global.totalLevels) {
    //      game.state.start('win');
    //    } else {
    //      game.state.start('summary');
    //    }
    //  }
    //}
  },

  pauseUpdate: function() {
    if (this.pausedGame) {
      this.ingameMenu.update();
    }
  },

  togglePause: function() {
    this.pausedGame = !this.pausedGame;
    if (this.pausedGame) {
      this.ingameMenu.show();
    } else {
      this.ingameMenu.hide();
    }
    game.paused = this.pausedGame;
  },

  restartGame: function() {
    game.state.start('play');
  },

  quitGame: function() {
    game.state.start('menu');
  },

  muteGame: function() {
    this.muted = !this.muted;

    if (this.muted) {
      this.bgmPool.stop();
    } else {
      this.bgmPool.resume();
    }
  },

  //render: function() {
  //  game.debug.body(this.player);
  //  game.debug.bodyInfo(this.player, 10, 20);
  //}
};
