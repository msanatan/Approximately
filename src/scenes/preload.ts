/**
 * @author       Marcus Sanatan <msanatan@gmail.com>
 * @copyright    2019 Marcus Sanatan
 * @description  Badass
 */

import 'phaser';

export class PreloadScene extends Phaser.Scene {
  private baseRadius : number;
  private separator: Phaser.Geom.Line
  private playerBall : Phaser.Geom.Circle;

  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload(): void {
    let progressBar = this.add.graphics();
    let progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    let width = this.cameras.main.width;
    let height = this.cameras.main.height;
    let loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    let percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);

    this.load.on('progress', function (value: number) {
      percentText.setText(parseInt(String(value * 100)) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on('complete', function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
    });

    this.separator = new Phaser.Geom.Line(0, 5, width, 5);
    const separatorGraphics = this.add.graphics({
      x: 0,
      y: 0,
      lineStyle: {
        width: 10,
        color: 0xA05700
      }
    });
    separatorGraphics.strokeLineShape(this.separator);
    separatorGraphics.generateTexture('separator', 800, 10);

    this.baseRadius = 30;
    // Create yellow ball for player
    this.playerBall = new Phaser.Geom.Circle(this.baseRadius, this.baseRadius,
      this.baseRadius);
    const playerGraphics = this.add.graphics({
      fillStyle: {
        alpha: 1,
        color: 0xffd700
      }
    });

    playerGraphics.fillCircleShape(this.playerBall);

    playerGraphics.generateTexture('playerBall', this.baseRadius*2,
      this.baseRadius*2);
  }

  update(time: number, delta: number): void {
    this.scene.start('GameScene');
  }
}
