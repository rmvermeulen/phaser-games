import { assert } from 'chai';

import { logger } from '../../../common/logger';
import { Vec, Vector } from '../../../common/vector';

import { Behaviour } from './behaviour';
import { Ufo } from './ufo';

const debug = logger('ufo-brain');

interface State {
  player?: {
    pos: Vector;
    health: number;
  };
  ufo: {
    pos: Vector;
    health: number;
  };
  lastMove?: UfoAction & {
    move: Vector;
    useCount: number;
  };
}

interface Patch {
  player?: Partial<State['player']>;
  ufo?: Partial<State['ufo']>;
  lastMove?: State['lastMove'];
}

export enum UfoMode {
  IDLE,
  ATTACK,
  MOVE,
}

export enum TargetDir {
  LEFT,
  RIGHT,
}
export interface UfoAction {
  move?: Vector;
  fireTo?: Vector;
  mode?: UfoMode;
  useCount?: number;
  isComplete(ufo: Ufo): boolean;
}

export class UfoBehaviour extends Behaviour<State, UfoAction> {
  private state: State;
  constructor(state: State) {
    super();
    this.state = state;
    this.setState(state);
  }
  setState(state: Patch) {
    this.state = {
      // only apply patch if we already have a player
      // so we never have an incomplete object
      // prettier-ignore
      player: (this.state.player && state.player) && {
          ...this.state.player,
          ...state.player,
        },
      ufo: {
        ...this.state.ufo,
        ...state.ufo,
      },
      lastMove: state.lastMove || this.state.lastMove,
    };

    return this;
  }

  decide(): UfoAction {
    const action = this._decide();

    if (action.move) {
      this.setState({ lastMove: action as any });
    }

    assert.isFunction(action.isComplete);

    return action;
  }

  private _decide(): UfoAction {
    const action: Partial<UfoAction> = {};

    const { player, ufo, lastMove } = this.state;

    // definitely fire on the player
    if (player) {
      action.mode = UfoMode.ATTACK;
      action.fireTo = player.pos;
    }

    const margin = 50;
    const fsw = 800;
    const hsw = fsw / 2;
    const hsh = 600 / 2;

    const getDir = ({ x }: Vector) =>
      x >= hsw ? TargetDir.RIGHT : TargetDir.LEFT;

    let bounds;
    let lastPos;

    if (!lastMove) {
      debug('initial move!');
      lastPos = ufo.pos.clone();
      bounds = {
        x: margin,
        y: margin,
        w: fsw - 2 * margin,
        h: hsh,
      };
    } else {
      lastPos = lastMove.move;
      const wasLeft = getDir(lastPos) === TargetDir.LEFT;
      // if previous move was to left, go to right this time
      bounds = {
        x: wasLeft ? hsw : margin,
        y: margin,
        w: hsw - margin,
        h: hsh,
        checkSide: true,
      };
    }

    const lastDir = getDir(lastPos);
    let target;
    do {
      const tx = bounds.x + Math.floor(Math.random() * bounds.w);
      const ty = bounds.y + Math.floor(Math.random() * bounds.h);

      const newTarget = Vec(tx, ty);

      if (bounds.checkSide) {
        assert.equal(TargetDir[getDir(newTarget)], TargetDir[lastDir]);
        continue;
      }

      if (newTarget.distance(lastPos) < 400) {
        // to close to previous target
        continue;
      }
      target = newTarget;
    } while (!target);

    debug(TargetDir[getDir(target)]);

    let prevDist = Infinity;
    const isCloseTo = (value: Vector) => ({ x, y }: Ufo) => {
      const dist = value.distance(Vec(x, y));
      // if distance is now bigger, we've passed it!
      if (dist < 1 || dist > prevDist) {
        return true;
      }

      prevDist = dist;
      return false;
    };

    action.isComplete = isCloseTo(target);
    action.move = target;

    return action as UfoAction;
  }
}
