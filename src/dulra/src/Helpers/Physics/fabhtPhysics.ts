import { Body } from 'matter';
import { Fabht } from '../../objects/fabht';

export class FabhtPhysics {

  applyRandomMovement(objects: Array<any>, current: Fabht, tweens: Phaser.Tweens.TweenManager) {
      let randomVelocity1X = Phaser.Math.Between(-10, 10);
      let randomVelocity1Y = Phaser.Math.Between(-10, 10);
  
      tweens.add({
        targets: current.body.velocity,
        x: current.body.velocity.x + randomVelocity1X,
        y: current.body.velocity.y + randomVelocity1Y,
        duration: 1,
        ease: 'Linear',
      });
  }

  applyAttraction(objects: Array<any>, current: Fabht, tweens: Phaser.Tweens.TweenManager) {
    console.log('applyAttraction');
    let naFabht = objects.filter((object: any) => { return object instanceof Fabht && object !== current });
  
    // Faigh an fabht is tarraingtí
    let mostAttractive = naFabht.reduce(function(prev, current) {
      return (prev.attractionForce > current.attractionForce) ? prev : current
    });
  
    const desiredSpeed = current.speed;
    const targetX = mostAttractive.x;
    const targetY = mostAttractive.y;
  
    const distanceX = targetX - current.x;
    const distanceY = targetY - current.y;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
  
    let velocityX = (distanceX / distance) * desiredSpeed;
    let velocityY = (distanceY / distance) * desiredSpeed;
  
    if (Math.abs(velocityX) > desiredSpeed) {
      velocityX *= desiredSpeed / Math.abs(velocityX);
    }

    if (Math.abs(velocityY) > desiredSpeed) {
      velocityY *= desiredSpeed / Math.abs(velocityY);
    }

    tweens.add({
      targets: current.body.velocity,
      x: velocityX,
      y: velocityY,
      duration: distance / desiredSpeed,
      ease: 'Linear',
    });
  }
}