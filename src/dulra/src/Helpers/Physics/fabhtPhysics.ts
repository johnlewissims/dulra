import { Body } from 'matter';
import { Fabht } from '../../objects/fabht';

export class FabhtPhysics {
  applyAttraction(objects: Array<Body>, current: Fabht) {
    objects.forEach((object: any) => {
      if (object !== current && object instanceof Fabht) {

        const direction = new Phaser.Math.Vector2(
          object.x - current.x,
          object.y - current.y
        ).normalize();
    
        const attractionVector = direction.scale(current.attractionForce);
        current.body.setAcceleration(attractionVector.x, attractionVector.y);
        
        // if (distance < 5) {
        //   // Calculate the new velocities for the colliding rectangles
        //   const velocityA = new Phaser.Math.Vector2(current.body.velocity.x, current.body.velocity.y);
        //   const velocityB = new Phaser.Math.Vector2(object.body.velocity.x, object.body.velocity.y);

        //   // Swap velocities
        //   current.body.setVelocity(velocityB.x, velocityB.y);
        //   object.body.setVelocity(velocityA.x, velocityA.y);
        // }
      }
    });
  }

  varySpeed(naFabhtRead: Array<Fabht>, tweens: Phaser.Tweens.TweenManager) {
    naFabhtRead.forEach(fabht => {
        const randomVelocity1X = Phaser.Math.Between(-50, 50);
        const randomVelocity1Y = Phaser.Math.Between(-50, 50)
        
        tweens.add({
          targets: fabht.body.velocity,
          x: randomVelocity1X,
          y: randomVelocity1Y,
          duration: 1000,
          ease: 'Linear',
        });
    });    
  }
}