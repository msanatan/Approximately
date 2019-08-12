import 'phaser';

const config: GameConfig = {
  title: 'Scale Up',
  type: Phaser.AUTO,
  parent: 'app',
  width: 800,
  height: 600,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: false,
    },
  },
  backgroundColor: '#38B6FF'
};

export class ScaleUp extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}

window.onload = () => {
  window.app = new ScaleUp(config);
};

