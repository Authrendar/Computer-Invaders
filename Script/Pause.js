


// Main menu scene/state
const Pause = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize:

    function Pause() {
      Phaser.Scene.call(this, {
        key: 'Pause'
      });

    },


  preload: function() {

    keyEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
  },

  create: function() {
    console.log("Pause");

    keyEsc.on('down', function(event) {
      this.scene.switch('PlayingScene');
    }, this);
  },

  update: function(time, delta) {

  }
})
