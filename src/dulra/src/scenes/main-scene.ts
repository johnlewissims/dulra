import { Fabht } from '../objects/fabht';
import { FabhtConstructor } from '../interfaces/fabht.interface';

export class MainScene extends Phaser.Scene {
  private naFabht: Array<FabhtConstructor>;

  constructor(naFabht: Array<FabhtConstructor>) {
    super({ key: 'MainScene' });
    this.naFabht = naFabht;
  }

  preload(): void {
    
  }

  create(): void {
    for (const [key, fabht] of Object.entries(this.naFabht)) {
      new Fabht({
        x: fabht.x,
        y: fabht.y,
        width: fabht.width,
        height: fabht.height,
        fillColor: fabht.fillColor,
        xVelocity: fabht.xVelocity,
        yVelocity: fabht.yVelocity
      }, this,); 
    }
  }
}
