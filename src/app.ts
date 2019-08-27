import 'phaser';
import { PreloadScene } from './scenes/preload';
import { GameScene } from './scenes/game';

const config: Phaser.Types.Core.GameConfig = {
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
      gravity: {
        y: 300
      },
      debug: true,
    },
  },
  render: {
    antialias: true,
    transparent: false,
  },
  autoFocus: true,
  scene: [PreloadScene, GameScene],
};

export class ScaleUp extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

window.onload = () => {
  window.app = new ScaleUp(config);
};

