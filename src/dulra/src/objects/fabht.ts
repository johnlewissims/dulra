import { FabhtConstructor } from '../interfaces/fabht.interface';

export class Fabht extends Phaser.GameObjects.Rectangle {
  private xVelocity: number;
  private yVelocity: number;

  body: Phaser.Physics.Arcade.Body;

  constructor(aParams: FabhtConstructor, scene: Phaser.Scene) {
    super(scene, aParams.x, aParams.y, aParams.width, aParams.height, Number(aParams.fillColor));
    this.xVelocity = aParams.xVelocity;
    this.yVelocity = aParams.yVelocity;

    this.initSprite();
    this.initPhysics();
    this.scene.add.existing(this);
  }

  private initSprite() {
    this.setScale(0.5);
  }

  private initPhysics() {
    this.scene.physics.world.enable(this);
    this.body.setVelocity(this.xVelocity, this.yVelocity);
    this.body.setBounce(1, 1);
    this.body.setCollideWorldBounds(true);
  }
}
