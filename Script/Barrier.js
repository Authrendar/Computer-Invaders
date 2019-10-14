class Barrier extends Phaser.Physics.Arcade.Sprite {
  constructor(config, color) {
    super(config.scene, config.x, config.y, config.tileset, config.frame)

    config.scene.add.existing(this);
    config.scene.physics.add.existing(this);
    this.setDisplaySize(50, 50);
    this.physicsBodyType = Phaser.Physics.ARCADE;
    this.color = color;
    this.tint = color;
    this.counter = 0;
  }

  setColor(color) {
    this.color = color;
    this.tint = color;
  }

  countHits() {
    this.counter++;

    switch (this.counter) {
      case 1:
        this.setColor(green);
        break;
      case 2:
        this.setColor(yellow);
        break;
      case 3:
        this.setColor(orange);
        break;
      case 4:
        this.setColor(red);
        break;
      case 5:
        this.destroy();
        break;

    }
  }


}
