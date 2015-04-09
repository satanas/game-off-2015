'use strict';

var playState = {
  create: function() {
    this.player = null;
    this.sceneDelay = 500;
    this.elapsed = game.global.block.spawn;
    this.blockSpawnTime = game.global.block.spawn;
    this.blockMoveTime = game.global.block.speed;
    this.level = 1;
    this.muted = false;
    this.paused = false;
    this.deploys = 0;
    this.pauseText = null;
    game.sound.stopAll();

    game.add.image(0, 0, 'background');
    game.global.time = 0;
    game.global.score = 0;

    groups.blocks = game.add.group();
    groups.hud = game.add.group();
    groups.floor = game.add.group();

    this.player = new Octocat(100, 400);
    this.floor = new Floor();
    this.hud = new HUD();

    //Ingame menu shortcuts
    this.pauseKey = game.input.keyboard.addKey(Phaser.Keyboard.P);
    this.pauseKey.onUp.add(this.togglePause, this);

    //this.quitKey = game.input.keyboard.addKey(Phaser.Keyboard.Q);
    //this.quitKey.onUp.add(this.quitGame, this);

    //this.muteKey = game.input.keyboard.addKey(Phaser.Keyboard.M);
    //this.muteKey.onUp.add(this.muteGame, this);

    //this.ingameMenu = new IngameMenu(this);
    //this.tutorial = new Tutorial(this.player);
  },

  update: function() {
    this.hud.update();
    this.elapsed += game.time.elapsedMS;

    if (this.player.alive && !this.paused) {
      if (this.elapsed >= this.blockSpawnTime) {
        this.elapsed = 0;
        var block = new Block(this.blockMoveTime);
      }

      var self = this;
      groups.blocks.forEach(function(block) {
        if (game.physics.arcade.intersects(self.player.body, block.body)) {
          if (block.falling) {
            // drop block if exist
            if (self.player.block) {
              self.dropBlock(true);
            }
            self.player.takeBlock(block);
          }
        }

        if (game.physics.arcade.intersects(groups.floor.children[0].body, block.body) && block.falling) {
          block.addBug();
          var deployed = self.floor.addBlock(block, self.player);
          if (deployed) {
            self.deploys += 1;
            if (self.deploys >= game.global.deploysToNextLevel) {
              self.deploys = 0;
              self.level += 1;
              self.blockSpawnTime -= 500;
              self.blockMoveTime -= 50;
              console.log('level', self.level);
            }
          }
        }
      });

      if (this.player.cursors.down.isDown) {
        this.dropBlock();
      }

      // check player dead
      if (this.player.y <= 330) {
        this.player.alive = false;
        bitmapTextCentered(200, 'ultra', "You're fired!", 28);
        bitmapTextCentered(260, 'ultra', "Enter to restart", 12);
        bitmapTextCentered(280, 'ultra', "Esc to exit", 12);
        var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        var escKey = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        enterKey.onDown.addOnce(this.restartGame, this);
        escKey.onDown.addOnce(this.quitGame, this);
      }
    } else {
    }
  },

  dropBlock: function(bug) {
    var block = this.player.dropBlock();
    if (block !== null) {
      if (bug) {
        block.addBug();
      }
      block.y = this.floor.sprite.y + 20;
      this.floor.addBlock(block, this.player);
    }
  },

  pauseUpdate: function() {
    if (this.paused) {
      //this.ingameMenu.update();
    }
  },

  togglePause: function() {
    this.paused = !this.paused;
    if (this.paused) {
      this.pauseText = bitmapTextCentered(270, 'score', 'Paused', 48);
    } else {
      this.pauseText.destroy();
      this.pauseText = null;
    }
    game.paused = this.paused;
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
