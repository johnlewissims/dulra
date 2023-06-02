import { BiaConstructor } from '../interfaces/bia.interface';

export class Bia extends Phaser.GameObjects.Arc {
  public attractionForce: number;
  public speed: number;
  public nutrition: number;

  body: Phaser.Physics.Arcade.Body;

  constructor(aParams: BiaConstructor, scene: Phaser.Scene) {
    super(scene, aParams.x, aParams.y, 10, undefined, undefined, undefined, Number(aParams.fillColor));

    this.initSprite();
    this.scene.add.existing(this);
  }

  update(time: number, delta: number) {

  } 

  private initSprite() {
    this.setScale(0.5);
  }

  private initPhysics() {

  }
}
