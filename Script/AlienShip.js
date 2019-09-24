class AlienShip extends Phaser.Physics.Arcade. Sprite{
  constructor(config, color, score){
    super(config.scene, config.x, config.y,  config.tileset, config.frame)
    config.scene.add.existing(this);
    config.scene.physics.add.existing(this);
    this.physicsBodyType = Phaser.Physics.ARCADE;
    this.body.setSize(20,20);
}

}
