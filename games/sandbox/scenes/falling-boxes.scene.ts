import Phaser from 'phaser';
import { clamp } from 'ramda';

import { logger } from '../../../common/logger';
import { Vec, Vector } from '../../../common/vector';

const debug = logger('boxes-scene');
export class FallingBoxesScene extends Phaser.Scene {
  static readonly key = 'falling-boxes-scene';

  private cursor?: Phaser.GameObjects.Rectangle;
  private constructor() {
    super({
      physics: {
        matter: {
          debug: true,
          gravity: { y: 0.5 },
        },
      },
    });
  }

  preload() {
    // load box texture
  }

  update(time: number, ms: number) {
    super.update(time, ms);
    if (this.cursor) {
      const f = clamp(30, 500);
      const newSize = f(this.cursor.width + 40 / ms);
      this.cursor.setSize(newSize, newSize);
      this.cursor.setOrigin(0.5, 0.5);
    }
  }

  create() {
    // add boxes
    debug('TODO: create boxes');

    this.input.on(
      'pointerdown',
      ({ x, y }: Phaser.Input.Pointer) => {
        debug('add cursor');
        this.cursor = this.add.rectangle(x, y, 30, 30, 0xff0000);
        this.cursor.setVisible(true);
      },
      this,
    );
    this.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
      if (this.cursor) {
        this.createBlock(pointer, this.cursor.width);
        this.children.remove(this.cursor);
        this.cursor = undefined;
      }
    });
  }

  private createBlock({ x, y }: Record<'x' | 'y', number>, size = 100) {
    debug('create block');
    return this.matter.add.rectangle(x, y, size, size, {});
  }
}
