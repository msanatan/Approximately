/**
 * @author       Marcus Sanatan <msanatan@gmail.com>
 * @copyright    2019 Marcus Sanatan
 * @description  Badass
 */

import 'phaser';

export class GameScene extends Phaser.Scene {
  private playerBall : Phaser.Physics.Arcade.Sprite;
  private separatorLine : Phaser.Physics.Arcade.Sprite;
  private guessBalls : Phaser.Physics.Arcade.Group;
  private growButton : Phaser.GameObjects.Sprite;
  private growCount : number;

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
    this.playerBall = this.physics.add.sprite(200, 400, 'playerBall').setScale(0.5);
    this.playerBall.setBounce(0.4);
    this.playerBall.setCollideWorldBounds(true);

    this.growCount = 0;
    // Add button to increase ball size
    this.growButton = this.add.sprite(700, 400, 'growButton');
    this.growButton.setInteractive();
    this.growButton.on('pointerdown', () => this.scalePlayerBall());
  }

  update(time: number, delta: number): void {}

  scalePlayerBall() {
    if (this.growCount < 10) {
      this.growCount++;
      this.playerBall.setScale(this.playerBall.scaleX + 0.2);
    }
  }
}
