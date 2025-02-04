import { Fabht } from '../objects/fabht';
import { Bia } from '../objects/bia';
import { FabhtConstructor } from '../interfaces/fabht.interface';
import { BiaConstructor } from '../interfaces/bia.interface';
import { FabhtPhysics } from '../Helpers/Physics/fabhtPhysics';

export class MainScene extends Phaser.Scene {
  private naFabht: Array<FabhtConstructor>;
  private naFabhtRead: Array<Fabht>;
  private naBiaRead: Array<Bia>;
  private timeElapsed: number = 0;
  private fabhtPhysics: FabhtPhysics = new FabhtPhysics();

  constructor(naFabht: Array<FabhtConstructor>) {
    super({ key: 'MainScene' });
    this.naFabht = naFabht;
    this.naFabhtRead = [];
    this.naBiaRead = [];
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

    this.naFabhtRead.forEach(fabht => {
      this.physics.world.enable(fabht);
    });

    for (var i=1;i<=10; i++) {
      this.naBiaRead.push(new Bia({
        x: Phaser.Math.Between(0, Number(this.game.config.width)),
        y: Phaser.Math.Between(0, Number(this.game.config.height)),
        fillColor: this.getRandomColor(),
        attraction: 10,
        nutrition: Phaser.Math.Between(10, 50)
      }, this));
    }

    this.naBiaRead.forEach(bia => {
      this.physics.world.enable(bia);
    });

    this.physics.add.collider(this.naFabhtRead, this.naBiaRead, this.handleEat, null, this);
  }

  getRandomColor() {
    const color = Phaser.Display.Color.RandomRGB();
    const colorString = Phaser.Display.Color.RGBToString(color.red, color.green, color.blue, 0, '0x');
    return colorString;
  }

  update(time: number, delta: number) {
    this.timeElapsed += delta;

    if (this.timeElapsed >= 2000) {
      this.timeElapsed = 0;
    }
  }

  handleEat(fabht: Fabht, bia: Bia) {
    fabht.fullness += bia.nutrition;
    bia.destroy();
    this.addBia();
  }

  addBia() {
    let biaNua = new Bia({
      x: Phaser.Math.Between(0, Number(this.game.config.width)),
      y: Phaser.Math.Between(0, Number(this.game.config.height)),
      fillColor: this.getRandomColor(),
      attraction: 10,
      nutrition: Phaser.Math.Between(5, 15)
    }, this)

    this.physics.world.enable(biaNua);
    this.naBiaRead.push(biaNua);

    this.physics.add.collider(this.naFabhtRead, this.naBiaRead, this.handleEat, null, this);
  }

}
