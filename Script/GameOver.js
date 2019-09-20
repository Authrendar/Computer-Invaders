
const GameOver = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize:

  function GameOver() {
    Phaser.Scene.call(this,{
      key: 'GameOver'
    });

    this.endText;
  },

  preload: function () {


  },

  create: function () {
    scoreText = this.add.text(gameConfig.width-550, gameConfig.height/2-100, '', {
      font: '50px font'
    });

    endText = this.add.text(gameConfig.width-490, gameConfig.height/2, '', {
      font: '50px font'});

    scoreText.setColor("blue");

    welcomeText = this.add.text(90, 10,'', fontStyle);

  },

  update: function () {
    scoreText.setText("Your scores: " + score);
    welcomeText.setText("Computer Invaders");
    if(isLost){
    endText.setText("You Lost!");
    endText.setColor('red');
  }
  else{
    endText.setText("You won!");
    endText.setColor('green');
  }
  }
})
