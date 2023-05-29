import { Body } from 'matter';
import { Fabht } from '../../objects/fabht';
import { Bia } from '../../objects/bia';

export class FabhtPhysics {

  applyRandomMovement(objects: Array<any>, current: Fabht, tweens: Phaser.Tweens.TweenManager) {
    // Speed Variation
    let variation = .1;

    tweens.add({
      targets: current.body.velocity,
      x: current.body.velocity.x + (Phaser.Math.Between(-current.speed, current.speed) * variation),
      y: current.body.velocity.y + (Phaser.Math.Between(-current.speed, current.speed) * variation),
      duration: 1,
      ease: 'Linear',
    });
  }

  slowDownSquare(square: Fabht) {
    const slowdownPercentage = 0.15;

    const slowdownFactor = (square.body.velocity.x >= 0) ? (1 - slowdownPercentage) : (1 + slowdownPercentage);
    square.body.velocity.x *= slowdownFactor;
    square.body.velocity.y *= slowdownFactor;
  }

  applyAttraction(objects: Array<any>, current: Fabht, tweens: Phaser.Tweens.TweenManager) {
    let naFabht = objects.filter((object: any) => { return object instanceof Fabht && object !== current });
  
    // Faigh an fabht is tarraingtí
    let mostAttractive = naFabht.reduce(function(prev, current) {
      return (prev.attractionForce > current.attractionForce) ? prev : current
    });

    this.moveToTarget(current, mostAttractive, tweens);
  }

  stop(fabht: Fabht, tweens: Phaser.Tweens.TweenManager) {
    tweens.add({
      targets: fabht.body.velocity,
      x: 0,
      y: 0,
      duration: 1000,
      ease: 'Linear',
    });
  }

  applyForage(objects: Array<any>, fabht: Fabht, tweens: Phaser.Tweens.TweenManager) {
    let naBia = objects.filter((object: any) => { return object instanceof Bia });

    if(naBia.length == 0) {
      return false;
    }

    // Faigh an fabht is tarraingtí
    let closestFood = naBia.reduce((prev, current) => {
      return (this.getDistanceBetweenObjects(prev, fabht) < this.getDistanceBetweenObjects(current, fabht)) ? prev : current;
    });

    if(fabht.id == 1){
      console.log(closestFood.x, closestFood.y)
    }

    this.moveToTarget(fabht, closestFood, tweens)
  }

  moveToTarget(current: Fabht, target: any, tweens: Phaser.Tweens.TweenManager) {
    const desiredSpeed = current.speed;
    const targetX = target.x;
    const targetY = target.y;
  
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

  getDistanceBetweenObjects(object1: any, object2: any) {
    const distanceX = object1.x - object2.x;
    const distanceY = object1.y - object2.y;
    return Math.sqrt(distanceX * distanceX + distanceY * distanceY);
  }

  isOverXVelocityLimit(current: Fabht) {
    return current.body.velocity.x > current.speed;
  }

  isOverYVelocityLimit(current: Fabht) {
    return current.body.velocity.x > current.speed;
  }
}