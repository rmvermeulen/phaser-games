import {} from 'phaser';

/** @class Behaviour
 * takes game state and produces decisions
 */
export abstract class Behaviour<State extends {}, Action extends Decision> {
  abstract setState(state: Partial<State>): this;
  abstract decide(): Action;
}

// tslint:disable-next-line:max-classes-per-file
export abstract class Decision {}
