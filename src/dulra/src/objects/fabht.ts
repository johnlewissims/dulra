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
  public dead: boolean = false;
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
    this.dead = false;

    this.initSprite();
    this.initPhysics();
    this.scene.add.existing(this);
    scene.events.on('update', this.update, this);

    this.body.setCollideWorldBounds(true, .6);
  }

  update(time: number, delta: number) {
    if(this.dead) {
      return;
    }

    super.update();
    this.timeElapsedSinceFabhtAttraction += delta;
    this.timeElapsedSinceRandomMovement += delta;

    if (this.timeElapsedSinceRandomMovement >= 100) {
      this.timeElapsedSinceRandomMovement = 0;

      if(this.fabhtPhysics.isOverXVelocityLimit || this.fabhtPhysics.isOverYVelocityLimit) {
        this.fabhtPhysics.slowDownSquare(this);
      } else {
        this.fabhtPhysics.applyRandomMovement(this.scene.sys.displayList.getChildren(), this, this.scene.tweens);
      }
    }

    const randomTime = Phaser.Math.Between(500, 3000);
    if (this.timeElapsedSinceFabhtAttraction >= randomTime) {
      this.timeElapsedSinceFabhtAttraction = 0;

      this.rotation += Math.PI / Phaser.Math.FloatBetween(1, 2);
      this.fabhtPhysics.rotate(this, Phaser.Math.RadToDeg(this.rotation), this.scene.tweens);

      if(this.fullness <= 0) {
        this.fabhtPhysics.stop(this, this.scene.tweens);
        return;
      } else {
        this.fullness -= 5;
      }

      if(this.fabhtMotivation.determineNeed(this) == 'reproduction') {
        this.fabhtPhysics.applyAttraction(this.scene.sys.displayList.getChildren(), this, this.scene.tweens);
      } else if(this.fabhtMotivation.determineNeed(this) == 'food') {
        let foraging = this.fabhtPhysics.applyForage(this.scene.sys.displayList.getChildren(), this, this.scene.tweens);
        if(!foraging) {
          this.fabhtPhysics.applyRandomMovement(this.scene.sys.displayList.getChildren(), this, this.scene.tweens);
        }
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

  private log(){
    if(this.id == 1) {
      console.log(this.fabhtMotivation.determineNeed(this), this.fullness);
    }
  }
}
