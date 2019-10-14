// Main menu scene/state


const PlayingScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize:

    function PlayingScene() {
      Phaser.Scene.call(this, {
        key: 'PlayingScene'
      }); {
        this.player;
        this.playerBullets;
        this.playerShootTimeline;
        this.isShooting;

        this.aliensGroup;
        this.alienBulletsGroup;
        this.alienMovementTimeline;
        this.alienShootTimeline;
        this.alienIndex;

        this.alienShipMovementTimeline;
        this.alienShipWaitTimeline;
        this.alienShipBulletsGroup;
        this.alienShipShootTimeline;
        this.alienShip;

        this.barrierGroup;

        this.counter;
        this.isPlaying;
      }
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
    isShooting = false;
    player = new Player({
      scene: this,
      x: gameConfig.width / 2,
      y: gameConfig.height - 60,
      tileset: 'tileset',
      frame: 30
    }, 'player', 3, 0);

    player.physicsBodyType = Phaser.Physics.ARCADE;

    alienShip = new AlienShip({
      scene: this,
      x: -20,
      y: 100,
      tileset: 'tileset',
      frame: 15
    }, red, 500);



    this.createAliens();
    this.createBarriers();
    this.createText();
    this.playerShoot();
    this.aliensShoot();
    this.moveAlienShip();
    this.alienShipShoot();



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
    this.moveAlienShipBullets();

    alienShip.angle += 10;

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
    this.physics.add.collider(alienShipBulletsGroup, player, this.playerHit, null, this);
    this.physics.add.collider(alienBulletsGroup, barrierGroup, this.barrierHit, null, this);
    this.physics.add.collider(playerBullets, barrierGroup, this.barrierHit, null, this);
    this.physics.add.collider(alienShipBulletsGroup, barrierGroup, this.barrierHit, null, this);
    this.physics.add.collider(playerBullets, alienShip, this.alienShipHit, null, this);
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
      if(!isShooting)
      {
      playerBullets.add(new Bullet({
        scene: this,
        x: player.x,
        y: player.y,
        tileset: 'tileset',
        frame: 250
      }, 'bullet'));
      isShooting = true;
      playerShootTimeline = this.time.addEvent({
        delay: 600,
        callback: ()=>{
          isShooting = false;
        },
      })
    }
    }, this);
  }, //Shooting function for Player

  playerHit: function() {

    alienBulletsGroup.children.each(alienBullet => {
      if (player.getBounds().contains(alienBullet.x, alienBullet.y)) {
        alienBullet.destroy();
        player.lives--;
      }
    });

    alienShipBulletsGroup.children.each(alienShipBullet => {
      if (player.getBounds().contains(alienShipBullet.x, alienShipBullet.y)) {
        alienShipBullet.destroy();
        player.lives -= 2;
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

  moveAlienShip: function() {


    alienShipWaitTimeline = this.time.addEvent({
      delay: 15000,
      callback: () => {
        alienShipMovementTimeline = this.tweens.timeline({
          totalDuration: 4000,
          onComplete: function() {
            alienShip.x = -20;
          },
          targets: alienShip,
          tweens: [{
            x: 800
          }],

        });
      },

      repeat: -1
    });

  },

  alienShipShoot: function() {

    alienShipBulletsGroup = this.physics.add.group();


    alienShipShootTimeline = this.time.addEvent({
      delay: 800,
      callback: () => {
        if (alienShip.active) {
          alienShipBulletsGroup.add(new Bullet({
            scene: this,
            x: alienShip.x,
            y: alienShip.y,
            tileset: 'tileset',
            frame: 173
          }))
        }
      },
      repeat: -1
    })

  },

  alienShipHit: function() {
    playerBullets.children.each(playerBullet => {
      if (alienShip.getBounds().contains(playerBullet.x, playerBullet.y)) {
        this.setPlayerScore(alienShip);
        alienShip.destroy(alienShip, true, true);
        playerBullet.destroy(playerBullet, true, true);
      }
    })
  },

  moveAlienShipBullets: function() {
    alienShipBulletsGroup.children.each(alienShipBullet => {
      alienShipBullet.tint = red;
      alienShipBullet.move(true);

      if (alienShipBullet.y > 590)
        alienShipBullet.destroy();
    })
  },

  createBarriers: function() {
    barrierGroup = this.physics.add.group();

    for (let i = 1; i <= 5; i++) {
      barrierGroup.add(new Barrier({
        scene: this,
        x: 130 * i + 10,
        y: 470,
        tileset: 'tileset',
        frame: 219
      }, white));
    }
  },

  barrierHit: function() {

    barrierGroup.children.each(barrier => {
      alienShipBulletsGroup.children.each(alienShipBullet => {
        if (barrier.getBounds().contains(alienShipBullet.x, alienShipBullet.y)) {
          alienShipBullet.destroy();
          barrier.countHits();
        }
      })
      playerBullets.children.each(playerBullet => {
        if (playerBullet.getBounds().contains(barrier.x, barrier.y))
          playerBullet.destroy();
      })
      alienBulletsGroup.children.each(alienBullet => {
        if (barrier.getBounds().contains(alienBullet.x, alienBullet.y)) {
          alienBullet.destroy();
          barrier.countHits();
        }
      })
    });
  }

})
