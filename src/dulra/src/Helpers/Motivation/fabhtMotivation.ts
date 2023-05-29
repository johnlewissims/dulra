import { Fabht } from '../../objects/fabht';

export class fabhtMotivation {

  public FOOD = 'food';
  public REPRODUCTION = 'reproduction';
  
  public STATE_HUNTING = 'hunting';
  public STATE_IDLE = 'idle';

  determineNeed(current: Fabht) : string {
    if(current.fullness > 40) {
      return this.REPRODUCTION;
    }

    return this.FOOD;
  }
}