'use strict';

var playState = {
  create: function() {
    this.player = null;
    this.sceneDelay = 500;
    this.elapsed = game.global.block.spawn;
    this.blockSpawnTime = game.global.block.spawn;
    this.blockMoveTime = game.global.block.speed;
    this.muted = false;
    this.level = 1;
    this.deploys = 0;
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
    //this.tutorial = new Tutorial(this.player);
  },

  update: function() {
    this.hud.update();

    this.elapsed += game.time.elapsedMS;
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
          this.deploys += 1;
          if (this.deploys >= game.global.deploysToNextLevel) {
            this.deploys = 0;
            this.level += 1;
            this.blockSpawnTime -= 500;
            this.blockMoveTime -= 50;
            console.log('level', this.level);
          }
        }
      }
    });

    if (this.player.cursors.down.isDown) {
      this.dropBlock();
    }
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

  dropBlock: function(bug) {
    var block = this.player.dropBlock();
    if (bug) {
      block.addBug();
    }
    if (block !== null) {
      block.y = this.floor.sprite.y + 20;
      this.floor.addBlock(block, this.player);
    }
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
