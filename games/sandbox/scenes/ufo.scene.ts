import { Scene } from 'phaser';

import { logger } from '../../../common/logger';
import { Vec } from '../../../common/vector';
import { createUfo, Ufo } from '../objects/ufo';

const debug = logger('ufo-scene');

export class UfoScene extends Scene {
  static readonly key = 'ufo-scene';

  private ufo?: Ufo;

  private constructor() {
    super({
      physics: {
        arcade: {
          debug: true,
          gravity: { y: 0.5 },
        },
      },
    });
  }
  preload() {
    this.load.image('ufo', 'textures/ufo.png');
    this.load.image('flare', 'textures/flare.png');
  }
  create() {
    debug('Adding ufo');
    this.ufo = createUfo(this, Vec(400, 100));
  }

  update(time: number, delta: number) {
    super.update(time, delta);
    if (this.ufo) {
      this.ufo.update(time, delta);
    }
  }
}
