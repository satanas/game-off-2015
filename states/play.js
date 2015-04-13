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
    this.movements = 0;
    this.pauseText = null;
    this.bgmSound = game.add.audio('main');
    this.deadSound = game.add.audio('dead');
    game.sound.stopAll();

    game.add.image(0, 0, 'background');
    game.global.time = 0;
    game.global.score = 0;

    groups.blocks = game.add.group();
    groups.hud = game.add.group();
    groups.floor = game.add.group();

    this.player = new Octocat(200, 400);
    this.floor = new Floor();
    this.hud = new HUD();

    //Ingame shortcuts
    this.pauseKey = game.input.keyboard.addKey(Phaser.Keyboard.P);
    this.pauseKey.onUp.add(this.togglePause, this);

    this.muteKey = game.input.keyboard.addKey(Phaser.Keyboard.M);
    this.muteKey.onUp.add(this.muteGame, this);

    this.bgmSound.play();
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
          if (block.falling && !self.player.walking) {
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
          self.increaseDifficulty();
        }
      });

      if (this.player.cursors.down.isDown) {
        this.dropBlock();
      }

      // check player's dead
      if (this.player.y <= 0) {
        this.finishGame('Deadline reached');
      }
    }
  },

  dropBlock: function(bug) {
    var block = this.player.dropBlock();
    if (block !== null) {
      if (bug) {
        block.addBug();
      }
      block.y = this.floor.sprite.y + 20;
      var currHeight = this.floor.getHeight();
      this.floor.addBlock(block, this.player);
      var newHeight = this.floor.getHeight();
      var diff = newHeight - currHeight;
      if (diff !== 0) {
        this.blockSpawnTime += 12.5 * diff
      }
      this.increaseDifficulty();
    }
  },

  increaseDifficulty: function() {
    this.deploys += 1;
    this.movements += 1;
    if (this.movements >= game.global.movementsToNextLevel) {
      this.deploys = 0;
      this.movements = 0;
      this.level += 1;
      this.blockSpawnTime -= 500;
      this.blockMoveTime -= 50;
      console.log('level', this.level);
    }
  },

  pauseUpdate: function() {
    //if (this.paused) {
    //}
  },

  togglePause: function() {
    this.paused = !this.paused;
    if (this.paused) {
      this.pauseText = bitmapTextCentered(270, 'title', 'Paused', 48);
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
      this.bgmSound.stop();
    } else {
      this.bgmSound.play();
    }
  },

  finishGame: function(subtitle) {
    groups.blocks.forEach(function(block) {
      block.falling = false;
    });
    game.sound.stopAll();
    this.hud.hideScore();
    this.player.fire();
    bitmapTextCentered(200, 'ultra', "You're fired!", 28);
    bitmapTextCentered(250, 'ultra', "Score: " + String(game.global.score), 17);
    bitmapTextCentered(320, 'super', "Enter to restart", 12);
    bitmapTextCentered(340, 'super', "Esc to exit", 12);

    var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    var escKey = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    enterKey.onDown.addOnce(this.restartGame, this);
    escKey.onDown.addOnce(this.quitGame, this);

    this.deadSound.play();
  },

  //render: function() {
  //  game.debug.body(this.player);
  //  //game.debug.bodyInfo(this.player, 10, 20);
  //}
};
