import { Fabht } from '../objects/fabht';

export class MainScene extends Phaser.Scene {
  private myFabht: Fabht;

  constructor() {
    super({ key: 'MainScene' });
  }

  preload(): void {
  }

  create(): void {
    this.myFabht = new Fabht({
      scene: this,
      x: 400,
      y: 300,
      width: 40,
      height: 40,
      fillColor: 0xE0FF4F
    });
  }
}
