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
      this.enemyMovementTimeline;
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



    keyEsc.on('down', function(event) {
      // this.scene.switch('')
    }, this);


    this.createCollider();
  },

  update: function(time, delta) {
    scoreText.setText("Score " + player.scores);
    liveText.setText("Lives: " + player.lives);

    this.createPlayerBullets();

    if (keyLeft.isDown)
      player.move(false);
    if (keyRight.isDown)
      player.move(true);

    if (!isPlaying) {
      score = player.scores;
      this.scene.stop();
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
  }, //Creates collider between gameobjects

  createPlayerBullets: function() {

    for (let i = 0; i < playerBullets.getChildren().length; i++) {
      playerBullets.children.entries[i].move();

      if (playerBullets.children.entries[i].y < 10)
        playerBullets.children.entries[i].destroy();
    }
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

  setPlayerScore: function(alien) {
    if (alien.color == red)
      player.scores += 60;
    if (alien.color == orange)
      player.scores += 45;
    if (alien.color == yellow)
      player.scores += 30;
    if (alien.color == green)
      player.scores += 15;
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
            }, 50, red));
            break;

          case 2:
            aliensGroup.add(new Alien({
              scene: this,
              x: 30 * i + 20,
              y: 185,
              tileset: 'tileset',
              frame: 2
            }, 35, orange));
            break;

          case 3:
            aliensGroup.add(new Alien({
              scene: this,
              x: 30 * i + 20,
              y: 220,
              tileset: 'tileset',
              frame: 2
            }, 35, yellow));
            break;

          case 4:
            aliensGroup.add(new Alien({
              scene: this,
              x: 30 * i + 20,
              y: 255,
              tileset: 'tileset',
              frame: 2
            }, 35, green));
            break;
        }

      }

    }


    this.aliensMovement();
  }, //Creates Aliens

  aliensMovement: function() {

    enemyMovementTimeline = this.tweens.timeline({
      totalDuration: 60000,
      onComplete: function() {
        counter++;
        if (counter >= 1)
          enemyMovementTimeline.play();
        if (counter == 3) {
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
