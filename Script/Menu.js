


// Main menu scene/state
const MainMenu = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize:

    function MainMenu() {
      Phaser.Scene.call(this, {
        key: 'MainMenu'
      });
      this.playButton;
      this.quitButton;
    },


  preload: function() {

    keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
  },

  create: function() {

    this.playButton = this.add.text(340, 200, '', fontStyle);
    this.quitButton = this.add.text(340, 350, '', fontStyle);
    welcomeText = this.add.text(85, 20, '', fontStyle);
    welcomeText.setColor("green");

    this.playButton.setInteractive();
    this.quitButton.setInteractive();



    keyEnter.on("down", function(event) {
      this.scene.stop();
      this.scene.start("PlayingScene");
    }, this);

    this.playButton.on('pointerover', () => {
      this.playButton.setColor("red");
    });
    this.playButton.on("pointerout", () => {
      this.playButton.setColor("white");
    })
    this.playButton.on("pointerdown", () => {
      this.scene.stop();
      this.scene.start("PlayingScene");
    }, this)

    this.quitButton.on("pointerover", () => {
      this.quitButton.setColor("red");
    });
    this.quitButton.on("pointerout", () => {
      this.quitButton.setColor('white');
    })

    this.quitButton.on("pointerdown", () => {
      console.log("I know where you're living ( ͡° ͜ʖ ͡°)");
      this.scene.stop();
      game.destroy();

    })


  },

  update: function(time, delta) {
    this.playButton.setText("Play");
    this.quitButton.setText("Quit");
    welcomeText.setText("Computer Invaders!");

  }
})
