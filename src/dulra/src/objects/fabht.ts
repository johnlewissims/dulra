import { FabhtConstructor } from '../interfaces/fabht.interface';
import { FabhtPhysics } from '../Helpers/Physics/fabhtPhysics';
import { fabhtMotivation } from '../Helpers/Motivation/fabhtMotivation';

export class Fabht extends Phaser.GameObjects.Rectangle {
  public id: number;
  private xVelocity: number;
  private yVelocity: number;
  public attractionForce: number;
  public speed: number;
  public fullness: number = 100;
  public state: string = 'idle';
  private timeElapsedSinceFabhtAttraction: number = 0;
  private timeElapsedSinceRandomMovement: number = 0;
  private fabhtPhysics: FabhtPhysics = new FabhtPhysics();
  private fabhtMotivation: fabhtMotivation = new fabhtMotivation();

  body: Phaser.Physics.Arcade.Body;

  constructor(aParams: FabhtConstructor, scene: Phaser.Scene) {
    super(scene, aParams.x, aParams.y, aParams.width, aParams.height, Number(aParams.fillColor));
    this.id = aParams.id;
    this.xVelocity = aParams.xVelocity;
    this.yVelocity = aParams.yVelocity;
    this.attractionForce = aParams.attraction ?? 0;
    this.speed = aParams.speed ?? 0;

    this.initSprite();
    this.initPhysics();
    this.scene.add.existing(this);
    scene.events.on('update', this.update, this);

    this.body.setCollideWorldBounds(true, .6);
  }

  update(time: number, delta: number) {
    super.update();
    this.timeElapsedSinceFabhtAttraction += delta;
    this.timeElapsedSinceRandomMovement += delta;

    if (this.timeElapsedSinceRandomMovement >= 100) {
      this.timeElapsedSinceRandomMovement = 0;
      this.fabhtPhysics.applyRandomMovement(this.scene.sys.displayList.getChildren(), this, this.scene.tweens);

      if(this.fabhtPhysics.isOverXVelocityLimit || this.fabhtPhysics.isOverYVelocityLimit) {
        this.fabhtPhysics.slowDownSquare(this);
      }
    }

    const randomTime = Phaser.Math.Between(500, 3000);
    if (this.timeElapsedSinceFabhtAttraction >= randomTime) {
      this.timeElapsedSinceFabhtAttraction = 0;
      this.fullness -= 5;

      if(this.fabhtMotivation.determineNeed(this) == 'reproduction') {
        this.fabhtPhysics.applyAttraction(this.scene.sys.displayList.getChildren(), this, this.scene.tweens);
      } else if(this.fabhtMotivation.determineNeed(this) == 'food') {
        //this.fabhtPhysics.applyHunt(this.scene.sys.displayList.getChildren(), this, this.scene.tweens);
      } else {
        this.fabhtPhysics.applyRandomMovement(this.scene.sys.displayList.getChildren(), this, this.scene.tweens);
      }
    }
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
