class Bullet extends Phaser.GameObjects.Sprite{
  constructor(config, key){
    super(config.scene, config.x, config.y, config.tileset, config.frame)
    config.scene.add.existing(this);
    config.scene.physics.add.existing(this);

    this.body.setSize(10, 10);

    this.key=key;
  }

  move(down){
    if(!down)
    this.y-=5;
    else
    this.y+=5;
  }
}
