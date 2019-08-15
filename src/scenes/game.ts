/**
 * @author       Marcus Sanatan <msanatan@gmail.com>
 * @copyright    2019 Marcus Sanatan
 * @description  Badass
 */

import 'phaser';

export class GameScene extends Phaser.Scene {
  private player : Phaser.GameObjects.Sprite;
  private separatorLine : Phaser.GameObjects.Image;
  // private guessBalls: Phaser.GameObjects.Group;

  constructor() {
    super({ key: 'GameScene' });
  }

  init(): void {}

  create(): void {
    let width = this.game.canvas.width;
    let height = this.game.canvas.height;
    this.cameras.main.setBackgroundColor('#38B6FF');
    this.separatorLine = this.add.image(width, 0, 'separator');
    this.separatorLine.setOrigin(0.5, 0.5);
    this.separatorLine.setX(width / 2);
    this.separatorLine.setY(height / 2);
    this.player = this.add.sprite(600, 400, 'playerBall');
  }

  update(time: number, delta: number): void {}
}
