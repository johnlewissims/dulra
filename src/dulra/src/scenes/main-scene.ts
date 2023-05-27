import { Fabht } from '../objects/fabht';
import { FabhtConstructor } from '../interfaces/fabht.interface';

export class MainScene extends Phaser.Scene {
  private naFabht: Array<FabhtConstructor>;
  private naFabhtRead: Array<Fabht>;
  private timeElapsed: number = 0;
  private velocityTweenDuration: number = 1000;

  constructor(naFabht: Array<FabhtConstructor>) {
    super({ key: 'MainScene' });
    this.naFabht = naFabht;
    this.naFabhtRead = [];
  }

  preload(): void {

  }

  create(): void {
    for (const [key, fabht] of Object.entries(this.naFabht)) {
      this.naFabhtRead.push(new Fabht({
        x: fabht.x,
        y: fabht.y,
        width: fabht.width,
        height: fabht.height,
        fillColor: fabht.fillColor,
        xVelocity: fabht.xVelocity,
        yVelocity: fabht.yVelocity
      }, this,));
    }
  }

  update(time: number, delta: number) {
    this.timeElapsed += delta;

    if (this.timeElapsed >= 2000) {
      this.timeElapsed = 0;
  
      this.naFabhtRead.forEach(fabht => {
        const randomVelocity1X = Phaser.Math.Between(-500, 500);
        const randomVelocity1Y = Phaser.Math.Between(-500, 500)
        
        this.tweens.add({
          targets: fabht.body.velocity,
          x: randomVelocity1X,
          y: randomVelocity1Y,
          duration: this.velocityTweenDuration,
          ease: 'Linear',
        });
      });
    }
  }

}
