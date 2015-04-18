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
    this.fastPaced = false;
    this.deploys = 0;
    this.movements = 0;
    this.pauseText = null;
    this.normalBgmSound = game.add.audio('normal-bgm');
    this.fastBgmSound = game.add.audio('fast-bgm');
    this.deadSound = game.add.audio('dead');
    game.sound.stopAll();

    game.add.image(0, 0, 'background');
    game.global.time = 0;
    game.global.score = 0;

    groups.blocks = game.add.group();
    groups.floor = game.add.group();

    this.player = new Octocat(200, 515);
    this.floor = new Floor();
    this.hud = new HUD(this);
    this.instructions = new Instructions();

    this.currentHeight = this.floor.getHeight();

    //Ingame shortcuts
    this.pauseKey = game.input.keyboard.addKey(Phaser.Keyboard.P);
    this.pauseKey.onUp.add(this.togglePause, this);

    this.muteKey = game.input.keyboard.addKey(Phaser.Keyboard.M);
    this.muteKey.onUp.add(this.muteGame, this);

    this.normalBgmSound.play('', 0, 0.75, true);
  },

  update: function() {
    this.hud.update();
    this.instructions.update();
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
              self.dropBlock(self.player.dropBlock(), true);
            }
            self.player.takeBlock(block);
            if (self.movements === 0 && self.instructions.step === 0) {
              self.instructions.next();
            }
          }
        }

        if (game.physics.arcade.intersects(groups.floor.children[0].body, block.body) && block.falling) {
          self.dropBlock(block, true);
        }
      });

      if (this.player.cursors.down.isDown) {
        this.dropBlock(this.player.dropBlock());
      }

      // check player's dead
      if (this.player.y <= 0) {
        this.finishGame('Deadline reached');
      }
    }
  },

  dropBlock: function(block, bug) {
    if (block !== null) {
      if (bug) {
        block.addBug();
      }
      block.y = this.floor.sprite.y + 20;
      this.currentHeight = this.floor.getHeight();
      var deployed = this.floor.addBlock(block, this.player);

      this.onDrop();
      if (deployed !== null) {
        this.onDeploy(deployed);
      }
    }
  },

  onDrop: function(block) {
    this.movements += 1;
    this.increaseDifficulty();

    if (this.instructions.step >= 1) {
      this.instructions.next();
    }
  },

  onDeploy: function(value) {
    this.deploys += 1;
    if (value < 0) {
      this.finishGame('Too many bugs');
    }
    if (this.level > 8 && !this.fastPaced) {
      this.normalBgmSound.fadeOut(500);
      this.fastBgmSound.play('', 0, 1.0, true);
      this.fastPaced = true;
    }
  },

  increaseDifficulty: function() {
    if (this.movements >= game.global.movementsToNextLevel) {
      this.deploys = 0;
      this.movements = 0;
      this.level += 1;
      this.blockSpawnTime -= 500;
      this.blockMoveTime -= 50;
      this.player.incSpeed();
      console.log('level', this.level);
    }

    var diff = this.floor.getHeight() - this.currentHeight;
    if (diff > 0) {
      this.player.decSpeed();
      this.blockSpawnTime += 12.5 * diff;
    } else if (diff < 0) {
      this.player.incSpeed();
      this.blockSpawnTime += 12.5 * diff;
    }

    // Do not exceed the limits
    if (this.blockSpawnTime < game.global.block.minSpawn) {
      this.blockSpawnTime = game.global.block.minSpawn;
    }
    if (this.blockMoveTime < game.global.block.minSpeed) {
      this.blockMoveTime = game.global.block.minSpeed;
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
      this.normalBgmSound.stop();
      this.fastBgmSound.stop();
    } else {
      if (this.fastPaced){
        this.fastBgmSound.play('', 0, 0.75, true);
      } else {
        this.normalBgmSound.play('', 0, 0.75, true);
      }
    }
  },

  finishGame: function(subtitle) {
    groups.blocks.forEach(function(block) {
      block.falling = false;
    });
    game.sound.stopAll();
    this.hud.hide();
    this.player.fire();
    var bg = this.game.add.graphics(0, 0);
    bg.beginFill(0x000000, 1);
    bg.drawRect(game.camera.x, game.camera.y, game.width, game.height);
    bg.alpha = 0.3;
    bg.endFill();

    bitmapTextCentered(200, 'rollback', "You're fired!", 29);
    bitmapTextCentered(250, 'rollback', subtitle, 20);
    bitmapTextCentered(320, 'instructions', "Your score: " + String(game.global.score), 18);
    bitmapTextCentered(390, 'instructions', "Enter to restart", 12);
    bitmapTextCentered(410, 'instructions', "Esc to exit", 12);

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
