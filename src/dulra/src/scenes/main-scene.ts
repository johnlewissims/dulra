import { Fabht } from '../objects/fabht';
import { FabhtConstructor } from '../interfaces/fabht.interface';
import { FabhtPhysics } from '../Helpers/Physics/fabhtPhysics';

export class MainScene extends Phaser.Scene {
  private naFabht: Array<FabhtConstructor>;
  private naFabhtRead: Array<Fabht>;
  private timeElapsed: number = 0;
  private fabhtPhysics: FabhtPhysics = new FabhtPhysics();

  constructor(naFabht: Array<FabhtConstructor>) {
    super({ key: 'MainScene' });
    this.naFabht = naFabht;
    this.naFabhtRead = [];
  }

  preload(): void {

  }

  create(): void {
    for (const [key, fabht] of Object.entries(this.naFabht)) {
      if(key == 'default') continue;
      this.naFabhtRead.push(new Fabht({
        id: fabht.id,
        x: fabht.x,
        y: fabht.y,
        width: fabht.width,
        height: fabht.height,
        fillColor: fabht.fillColor,
        xVelocity: fabht.xVelocity,
        yVelocity: fabht.yVelocity,
        attraction: fabht.attraction,
        speed: fabht.speed
      }, this));
    }
  }

  update(time: number, delta: number) {
    this.timeElapsed += delta;

    if (this.timeElapsed >= 2000) {
      this.timeElapsed = 0;
    }
  }

}
