import { FabhtConstructor } from '../interfaces/fabht.interface';

export class Fabht extends Phaser.GameObjects.Rectangle {
  private xVelocity: number;
  private yVelocity: number;
  private attractionForce: number;

  body: Phaser.Physics.Arcade.Body;

  constructor(aParams: FabhtConstructor, scene: Phaser.Scene) {
    super(scene, aParams.x, aParams.y, aParams.width, aParams.height, Number(aParams.fillColor));
    this.xVelocity = aParams.xVelocity;
    this.yVelocity = aParams.yVelocity;
    this.attractionForce = aParams.attraction;

    this.initSprite();
    this.initPhysics();
    this.scene.add.existing(this);
    scene.events.on('update', this.update, this);
  }

  update() {
    super.update();

    const objects = this.scene.sys.displayList.getChildren();

    objects.forEach((object: any) => {
      if (object !== this && object instanceof Fabht) {
        const dx = object.x - this.x;
        const dy = object.y - this.y;
        const distanceSquared = dx * dx + dy * dy;

        if (distanceSquared > 0) {
          const forceMagnitude = this.attractionForce / distanceSquared;
          const forceX = (dx / Math.sqrt(distanceSquared)) * forceMagnitude;
          const forceY = (dy / Math.sqrt(distanceSquared)) * forceMagnitude;

          this.body.velocity.x += forceX;
          this.body.velocity.y += forceY;
        }
      }
    });
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
