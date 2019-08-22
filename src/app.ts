import 'phaser';
import { PreloadScene } from './scenes/preload';
import { GameScene } from './scenes/game';

const config: GameConfig = {
  title: 'Grow Up',
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
  scene: [PreloadScene, GameScene],
};

export class ScaleUp extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}

window.onload = () => {
  window.app = new ScaleUp(config);
};

