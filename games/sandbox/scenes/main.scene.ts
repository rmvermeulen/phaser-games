import { Scene } from 'phaser';

import { logger } from '../../../common/logger';

import { createSimpleMenu } from './createSimpleMenu';
import { FallingBoxesScene } from './falling-boxes.scene';
import { UfoScene } from './ufo.scene';

const debug = logger('main-scene');

export class MainScene extends Scene {
  static readonly key = 'main-scene';

  preload() {
    /* resources */
  }
  create() {
    debug('Adding menu');
    createSimpleMenu(this, [
      [
        'level 1 (ufo)',
        () => {
          debug('going to ufo scene');
          this.game.scene.start(UfoScene.key);
          this.game.scene.stop(MainScene.key);
        },
      ],
      [
        'level 2 (boxes)',
        () => {
          debug('going to boxes scene');
          this.game.scene.start(FallingBoxesScene.key);
          this.game.scene.stop(MainScene.key);
        },
      ],
      ['level 3', () => debug('going to level 3')],
    ]);
  }
}
