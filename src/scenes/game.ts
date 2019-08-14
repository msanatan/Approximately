/**
 * @author       Marcus Sanatan <msanatan@gmail.com>
 * @copyright    2019 Marcus Sanatan
 * @description  Badass
 */

import 'phaser';

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  init(): void {}

  create(): void {
    this.cameras.main.setBackgroundColor('#38B6FF');
    const separator = new Phaser.Geom.Line(this.game.canvas.width, 0,
      0, this.game.canvas.height);
    const separatorGraphics = this.add.graphics({
      lineStyle: {
        width: 5,
        color: 0x000000
      }
    });
    separatorGraphics.strokeLineShape(separator);

    // Create yellow ball for player
    const playerBall = new Phaser.Geom.Circle(600, 400, 30);
    const playerGraphics = this.add.graphics({
      fillStyle: {
        alpha: 1,
        color: 0xffd700
      }
    });
    playerGraphics.fillCircleShape(playerBall);
  }

  update(time: number, delta: number): void {}
}
