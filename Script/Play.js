// Main menu scene/state


const PlayingScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize:

    function PlayingScene() {
      Phaser.Scene.call(this, {
        key: 'PlayingScene'
      });
      this.player;
      this.playerBullets;
      this.aliensGroup;
      this.alienBulletsGroup;
      this.alienMovementTimeline;
      this.alienShootTimeline;
      this.alienIndex;
      this.counter;
      this.isPlaying;
    },


  preload: function() {
    this.load.spritesheet("tileset", "Assets/img/tileset.png", {
      frameWidth: 30,
      frameHeight: 30
    });

    keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    keyEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

  },

  create: function() {
    counter = 0;
    isPlaying = true;
    player = new Player({
      scene: this,
      x: gameConfig.width / 2,
      y: gameConfig.height - 100,
      tileset: 'tileset',
      frame: 30
    }, 'player', 3, 0);

    player.physicsBodyType = Phaser.Physics.ARCADE;

    this.createAliens();
    this.createText();
    this.playerShoot();
    this.aliensShoot();



    keyEsc.on('down', function(event) {
      this.scene.switch('Pause')
    }, this);


    this.createCollider();
  },

  update: function(time, delta) {
    scoreText.setText("Score " + player.scores);
    liveText.setText("Lives: " + player.lives);

    this.movePlayerBullets();
    this.moveAlienBullets();

    if (keyLeft.isDown)
      player.move(false);
    if (keyRight.isDown)
      player.move(true);

    if (player.lives <= 0) {
      isPlaying = false;
      isLost = true;
    }
    if (!isPlaying) {
      score = player.scores;
      this.scene.restart();
      this.scene.start('GameOver');
    }

  },
  createText: function() {
    scoreText = this.add.text(10, 10, '', {
      font: '40px font'
    });
    scoreText.tint = blue;
    liveText = this.add.text(gameConfig.width - 135, 10, '', {
      font: '40px font'
    });
    liveText.tint = teal;
  }, // Creates User Interface

  createCollider: function() {
    this.physics.add.collider(aliensGroup, playerBullets, this.alienHit, null, this);
    this.physics.add.collider(alienBulletsGroup, player, this.playerHit, null, this);
  }, //Creates collider between gameobjects

  movePlayerBullets: function() {

    playerBullets.children.each(bullet => {
      bullet.move();
      if (bullet.y < 10)
        bullet.destroy();
    });
  }, //Creates player bullets

  playerShoot: function() {

    playerBullets = this.physics.add.group();
    playerBullets.physicsBodyType = Phaser.Physics.ARCADE;

    keySpace.on('down', function(event) {
      playerBullets.add(new Bullet({
        scene: this,
        x: player.x,
        y: player.y,
        tileset: 'tileset',
        frame: 250
      }, 'bullet'));
    }, this);
  }, //Shooting function for Player

  playerHit: function() {

    alienBulletsGroup.children.each(alienBullet => {
      if (player.getBounds().contains(alienBullet.x, alienBullet.y)) {
        alienBullet.destroy();
        player.lives--;
      }
    });
  },

  setPlayerScore: function(alien) {

    player.scores += alien.score;
  }, // After killed an alien, player gets some scores

  createAliens: function() {

    aliensGroup = this.physics.add.group();
    aliensGroup.physicsBodyType = Phaser.Physics.ARCADE;

    for (let j = 1; j <= 4; j++) {
      for (let i = 1; i <= 20; i++) {
        switch (j) {
          case 1:

            aliensGroup.add(new Alien({
              scene: this,
              x: 30 * i + 20,
              y: 150,
              tileset: 'tileset',
              frame: 2
            }, red, 60));
            break;

          case 2:
            aliensGroup.add(new Alien({
              scene: this,
              x: 30 * i + 20,
              y: 185,
              tileset: 'tileset',
              frame: 2
            }, orange, 45));
            break;

          case 3:
            aliensGroup.add(new Alien({
              scene: this,
              x: 30 * i + 20,
              y: 220,
              tileset: 'tileset',
              frame: 2
            }, yellow, 30));
            break;

          case 4:
            aliensGroup.add(new Alien({
              scene: this,
              x: 30 * i + 20,
              y: 255,
              tileset: 'tileset',
              frame: 2
            }, green, 15));
            break;
        }

      }

    }


    this.aliensMovement();
  }, //Creates Aliens

  aliensMovement: function() {

    alienMovementTimeline = this.tweens.timeline({
      totalDuration: 60000,
      onComplete: function() {
        counter++;
        if (counter >= 1)
          alienMovementTimeline.play();
        if (counter == 3) {
          isLost = true;
          isPlaying = false;
        }

      },


      targets: aliensGroup.getChildren(),
      tweens: [{
          x: '+=130',
        },
        {
          y: '+=25'
        },
        {
          x: '-=130'
        },
        {
          y: '+=25',
        }
      ]

    });
  }, //Aliens movement - right, down, left, down etc...

  aliensShoot: function() {
    alienBulletsGroup = this.physics.add.group();

    alienShootTimeline = this.time.addEvent({
      delay: 800,
      callback: () => {
        alienIndex = Phaser.Math.Between(0, aliensGroup.getChildren().length - 1);

        alienBulletsGroup.add(new Bullet({
          scene: this,
          x: aliensGroup.children.entries[alienIndex].x,
          y: aliensGroup.children.entries[alienIndex].y,
          tileset: 'tileset',
          frame: 58
        }))

      },
      loop: true
    });


  },

  moveAlienBullets: function() {

    alienBulletsGroup.children.each(alienBullet => {
      alienBullet.tint = purple;
      alienBullet.move(true);

      if (alienBullet.y > 590)
        alienBullet.destroy();
    });
  },

  alienHit: function() {

    playerBullets.children.each(bullet => {
      aliensGroup.children.each(alien => {

        if (alien.getBounds().contains(bullet.x, bullet.y)) {
          this.setPlayerScore(alien);
          alien.destroy(alien, true, true);
          bullet.destroy(bullet, true, true);
        }
      })
    });

  }, //Checking collision between player bullets and aliens, also destroying those objects


})
