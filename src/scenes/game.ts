/**
 * @author       Marcus Sanatan <msanatan@gmail.com>
 * @copyright    2019 Marcus Sanatan
 * @description  Badass
 */

import 'phaser';

export class GameScene extends Phaser.Scene {
  private playerBall : Phaser.Physics.Arcade.Sprite;
  private separatorLine : Phaser.Physics.Arcade.Sprite;
  // private guessBalls: Phaser.GameObjects.Group;

  constructor() {
    super({ key: 'GameScene' });
  }

  init(): void {}

  create(): void {
    let width = this.game.canvas.width;
    let height = this.game.canvas.height;
    this.cameras.main.setBackgroundColor('#38B6FF');
    this.separatorLine = this.physics.add.sprite(width / 2, (height / 2) - 5, 'separator');
    this.separatorLine.setImmovable(true);
    this.separatorLine.body.setAllowGravity(false);
    this.playerBall = this.physics.add.sprite(200, 400, 'playerBall');
    this.playerBall.setBounce(0.4);
    this.playerBall.setCollideWorldBounds(true);
  }

  update(time: number, delta: number): void {}
}
