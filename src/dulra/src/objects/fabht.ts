import { FabhtConstructor } from '../interfaces/fabht.interface';
import { FabhtPhysics } from '../Helpers/Physics/fabhtPhysics';

export class Fabht extends Phaser.GameObjects.Rectangle {
  public id: number;
  private xVelocity: number;
  private yVelocity: number;
  public attractionForce: number;
  private fabhtPhysics: FabhtPhysics = new FabhtPhysics();

  body: Phaser.Physics.Arcade.Body;

  constructor(aParams: FabhtConstructor, scene: Phaser.Scene) {
    super(scene, aParams.x, aParams.y, aParams.width, aParams.height, Number(aParams.fillColor));
    this.id = aParams.id;
    this.xVelocity = aParams.xVelocity;
    this.yVelocity = aParams.yVelocity;
    this.attractionForce = aParams.attraction;

    this.initSprite();
    this.initPhysics();
    this.scene.add.existing(this);
    scene.events.on('update', this.update, this);

    this.body.setCollideWorldBounds(true);
  }

  update() {
    super.update();
    this.fabhtPhysics.applyAttraction(this.scene.sys.displayList.getChildren(), this);
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
