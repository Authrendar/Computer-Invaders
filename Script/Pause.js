


// Main menu scene/state
const Pause = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize:

    function Pause() {
      Phaser.Scene.call(this, {
        key: 'Pause'
      });

      this.pauseText;
    },


  preload: function() {

    keyEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
  },

  create: function() {
      welcomeText = this.add.text(85, 20, '', fontStyle);
      pauseText = this.add.text(330, 200, '', {font: '55px font'});
    keyEsc.on('down', function(event) {
      this.scene.switch('PlayingScene');
    }, this);
  },

  update: function(time, delta) {
    welcomeText.setText("Computer Invaders");
    pauseText.setText("Pause");
  }
})
