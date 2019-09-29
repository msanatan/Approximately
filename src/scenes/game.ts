/**
 * @author       Marcus Sanatan <msanatan@gmail.com>
 * @copyright    2019 Marcus Sanatan
 * @description  Badass
 */

import 'phaser';

export class GameScene extends Phaser.Scene {
  private playerBall: Phaser.Physics.Arcade.Sprite;
  private separatorLine: Phaser.Physics.Arcade.Sprite;
  private guessBalls: Phaser.Physics.Arcade.Group;
  private growButton: Phaser.GameObjects.Sprite;
  private checkButton: Phaser.GameObjects.Sprite;
  private nextButton: Phaser.GameObjects.Sprite;
  private retryButton: Phaser.GameObjects.Sprite;
  private growCount: number;
  private level: number;
  private levelText: Phaser.GameObjects.Text;
  private levelCompleteText: Phaser.GameObjects.Text;
  private lostLevelText: Phaser.GameObjects.Text;
  private nextText: Phaser.GameObjects.Text;
  private retryText: Phaser.GameObjects.Text;
  private separatorCollider: Phaser.Physics.Arcade.Collider;
  private lastStage: boolean;

  constructor() {
    super({ key: 'GameScene' });
  }

  init(): void { }

  create(): void {
    let width = this.game.canvas.width;
    let height = this.game.canvas.height;
    this.cameras.main.setBackgroundColor('#38B6FF');
    this.separatorLine = this.physics.add.sprite(width / 2, (height / 2) - 5, 'separator');
    this.separatorLine.setImmovable(true);
    this.separatorLine.body.setAllowGravity(false);

    // Set up level
    this.level = 1;
    this.growCount = 0;
    this.lastStage = false

    // Add button to increase ball size
    this.growButton = this.add.sprite(700, 400, 'growButton');
    this.growButton = this.growButton.setInteractive();
    this.growButton.on('pointerdown', () => this.scalePlayerBall());

    // Add button to compare sizes
    this.checkButton = this.add.sprite(700, 475, 'checkButton');
    this.checkButton = this.checkButton.setInteractive();
    this.checkButton.on('pointerdown', () => this.compareBalls());

    // Load fonts
    WebFont.load({
      google: {
        families: ['Luckiest Guy']
      },
      active: () => {
        this.reset();
      }
    });
  }

  update(time: number, delta: number): void { }

  scalePlayerBall() {
    if (this.growCount < 10) {
      this.growCount++;
      this.playerBall.setScale(this.playerBall.scaleX + 0.2);
    }
  }

  compareBalls() {
    // Disable game buttons
    this.checkButton = this.checkButton.disableInteractive();
    this.growButton = this.growButton.disableInteractive();

    let totalGuessSize = 0;
    this.guessBalls.getChildren().forEach((gb: Phaser.Physics.Arcade.Sprite) => {
      totalGuessSize += gb.displayWidth;
    });

    // You beat the level
    if (Math.floor(totalGuessSize) === Math.floor(this.playerBall.displayWidth)) {
      if (!this.lastStage) {
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

        // Show the next stage button
        this.nextButton = this.add.sprite(this.game.canvas.width / 2, 400, 'nextButton');
        this.nextButton.setInteractive();
        this.nextButton.on('pointerdown', () => this.nextLevel());

        // And some helper text
        this.nextText = this.add.text(
          this.physics.world.bounds.centerX,
          450,
          'Next',
          {
            fontFamily: 'Luckiest Guy',
            fontSize: 32,
            color: '#ffffff'
          }
        ).setOrigin(0.5);
      } else {
        // No more stages to go
        this.levelCompleteText = this.add.text(
          this.physics.world.bounds.centerX,
          this.physics.world.bounds.centerY + 40,
          'Congrats! You\'ve reached the end!',
          {
            fontFamily: 'Luckiest Guy',
            fontSize: 40,
            color: '#ffffff'
          }
        ).setOrigin(0.5);
      }
    } else {
      // You lost
      this.lostLevelText = this.add.text(
        this.physics.world.bounds.centerX,
        this.physics.world.bounds.centerY + 40,
        'Not exactly right...',
        {
          fontFamily: 'Luckiest Guy',
          fontSize: 40,
          color: '#ffffff'
        }
      ).setOrigin(0.5);

      // Show the retry stage button
      this.retryButton = this.add.sprite(this.game.canvas.width / 2, 400, 'retryButton');
      this.retryButton.setInteractive();
      this.retryButton.on('pointerdown', () => this.reset());

      // And some helper text
      this.retryText = this.add.text(
        this.physics.world.bounds.centerX,
        450,
        'Try again?',
        {
          fontFamily: 'Luckiest Guy',
          fontSize: 32,
          color: '#ffffff'
        }
      ).setOrigin(0.5);
    }
  }

  reset() {
    // Enable game buttons
    this.checkButton = this.checkButton.setInteractive();
    this.growButton = this.growButton.setInteractive();

    // Hide the winning/losing text + buttons
    if (this.levelCompleteText) {
      this.levelCompleteText.destroy();
      this.nextButton.destroy();
      this.nextText.destroy();
    }

    if (this.lostLevelText) {
      this.lostLevelText.destroy();
      this.retryButton.destroy();
      this.retryText.destroy();
    }

    // Remove the player ball if it exists
    if (this.playerBall) {
      this.playerBall.destroy();
    }
    // Set the player up
    this.playerBall = this.physics.add.sprite(200, 450, 'playerBall').setScale(0.2);
    this.playerBall.setBounce(0.4);
    this.playerBall.setCollideWorldBounds(true);

    // Remove the guess balls if they exist
    if (this.guessBalls) {
      this.guessBalls.destroy(true);
    }
    // Set up the level i.e. get the guess balls
    this.getLevel();

    // Add guess ball collision
    if (this.separatorCollider) {
      this.separatorCollider.destroy();
    }
    this.separatorCollider = this.physics.add.collider(this.separatorLine, this.guessBalls);

    // Reset the level text
    if (this.levelText) {
      this.levelText.destroy();
    }
    this.levelText = this.add.text(20, 40, 'Level: ' + this.level, {
      fontFamily: 'Luckiest Guy',
      fontSize: 30,
      color: '#ffffff'
    });

    // Reset grow count
    this.growCount = 0;
  }

  nextLevel() {
    this.level++;
    this.reset();
  }

  getLevel() {
    switch (this.level) {
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
        this.lastStage = true;
    }
  }
}
