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
  private checkButton : Phaser.GameObjects.Sprite;
  private growCount : number;
  private level : number;
  private levelText : Phaser.GameObjects.Text;
  private levelCompleteText : Phaser.GameObjects.Text;
  private lostLevelText : Phaser.GameObjects.Text;

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
    this.playerBall = this.physics.add.sprite(200, 450, 'playerBall').setScale(0.2);
    this.playerBall.setBounce(0.4);
    this.playerBall.setCollideWorldBounds(true);

    // Set up level
    this.level = 1;
    this.getLevel();
    this.physics.add.collider(this.separatorLine, this.guessBalls);

    this.growCount = 0;
    // Add button to increase ball size
    this.growButton = this.add.sprite(700, 400, 'growButton');
    this.growButton.setInteractive();
    this.growButton.on('pointerdown', () => this.scalePlayerBall());

    // Add button to compare sizes
    this.checkButton = this.add.sprite(700, 475, 'checkButton');
    this.checkButton.setInteractive();
    this.checkButton.on('pointerdown', () => this.compareBalls());

    WebFont.load({
      google: {
          families: ['Luckiest Guy']
      },
      active: () => {
          this.levelText = this.add.text(20, 40, 'Level: ' + this.level, {
            fontFamily: 'Luckiest Guy',
            fontSize: 30,
            color: '#ffffff'
          });
      }
  });
  }

  update(time: number, delta: number): void {}

  scalePlayerBall() {
    if (this.growCount < 10) {
      this.growCount++;
      this.playerBall.setScale(this.playerBall.scaleX + 0.2);
    }
  }

  compareBalls() {
    let totalGuessSize = 0;
    this.guessBalls.getChildren().forEach((gb: Phaser.Physics.Arcade.Sprite) => {
      totalGuessSize += gb.displayWidth;
    });

    if (Math.floor(totalGuessSize) === Math.floor(this.playerBall.displayWidth)) {
      this.levelCompleteText = this.add.text(
        this.physics.world.bounds.centerX,
        this.physics.world.bounds.centerY + 40,
        'Good Job!',
        {
          fontFamily: 'Luckiest Guy',
          fontSize: 40,
          color: '#ffffff'
        }
      ).setOrigin(0.5);
    } else {
      this.levelCompleteText = this.add.text(
        this.physics.world.bounds.centerX,
        this.physics.world.bounds.centerY + 40,
        'You Lose :-(',
        {
          fontFamily: 'Luckiest Guy',
          fontSize: 40,
          color: '#ffffff'
        }
      ).setOrigin(0.5);
    }
  }

  getLevel() {
    switch(this.level) {
      case 1:
        this.guessBalls = this.physics.add.group({
          key: 'guessBall',
          setXY: {
            x: 200,
            y: 50,
          },
          bounceX: 0.4,
          bounceY: 0.4,
          setScale: {
            x: 0.6,
            y: 0.6
          }
        });
        break;
      case 2:
          this.guessBalls = this.physics.add.group({
            key: 'guessBall',
            setXY: {
              x: 200,
              y: 50,
            },
            bounceX: 0.4,
            bounceY: 0.4,
            setScale: {
              x: 1.2,
              y: 1.2,
            }
          });
    }
  }
}
