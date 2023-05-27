import { Body } from 'matter';
import { Fabht } from '../../objects/fabht';

export class FabhtPhysics {
  applyAttraction(naFabhtRead: Array<Fabht>) {
    
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