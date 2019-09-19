class Alien extends Phaser.GameObjects.Sprite{
  constructor(config, scoreValue, color){
    super(config.scene, config.x, config.y,  config.tileset, config.frame)
    config.scene.add.existing(this);
    config.scene.physics.add.existing(this);
    this.color=color;
    this.scoreValue=scoreValue;

    this.tint = color;
  }
}
