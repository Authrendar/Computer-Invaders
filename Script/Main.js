let gameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#000000",
  scene: [MainMenu, PlayingScene, GameOver, Pause],
  physics: {
    default: 'arcade',
    arcade: {
            debug:false,

        }
  }
};


const game = new Phaser.Game(gameConfig);

// Global variables
let keyUp, keyDown, keyLeft, keyRight, keyEnter, keySpace, keyEsc;

const fontStyle = {
  font: "80px font"
};

let welcomeText;

let scoreText, liveText;

let score;

let isLost;
