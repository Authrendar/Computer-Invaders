class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(config, key, lives, scores) {
    super(config.scene, config.x, config.y,  config.tileset, config.frame);

    config.scene.add.existing(this);
    config.scene.physics.add.existing(this);
    this.physicsBodyType = Phaser.Physics.ARCADE;
    this.body.setSize(22, 23);
    this.lives = lives;
    this.scores = scores;
    this.key = key;
    this.velX = 3;
  }

  move(right) {
    if (right)
      this.x += this.velX
    else
      this.x -= this.velX;
  }



}
