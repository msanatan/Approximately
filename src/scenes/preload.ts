/**
 * @author       Marcus Sanatan <msanatan@gmail.com>
 * @copyright    2019 Marcus Sanatan
 * @description  Badass
 */

import 'phaser';
import playerBall from '../../assets/images/playerBall.png';
import guessBall from '../../assets/images/guessBall.png';
import separator from '../../assets/images/separator.png';
import growButton from '../../assets/images/growButton.png';
import checkButton from '../../assets/images/checkButton.png';
import nextButton from '../../assets/images/nextButton.png';
import retryButton from '../../assets/images/retryButton.png';

export class PreloadScene extends Phaser.Scene {

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

    this.load.image('separator', separator);
    this.load.image('playerBall', playerBall);
    this.load.image('guessBall', guessBall);
    this.load.image('growButton', growButton);
    this.load.image('checkButton', checkButton);
    this.load.image('nextButton', nextButton);
    this.load.image('retryButton', retryButton);
    // Load Google Font script
    this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
  }

  update(time: number, delta: number): void {
    this.scene.start('GameScene');
  }
}
