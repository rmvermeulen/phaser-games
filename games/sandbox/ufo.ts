import { Actions, GameObjects, Input, Physics, Scene } from 'phaser';
import { map, prop } from 'ramda';

import { logger } from '../../common/logger';
import { Vector } from '../../common/vector';

const debug = logger('ufo');

export class Ufo extends Physics.Arcade.Image {
  private cursors: Input.Keyboard.CursorKeys;
  constructor(scene: Scene, { x, y }: Vector) {
    super(scene, x, y, 'ufo');
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);

    this.cursors = scene.input.keyboard.createCursorKeys();
  }

  update(time: number, delta: number) {
    super.update(time, delta);

    const { left, right, down, up } = this.cursors;

    let x = 0;
    let y = 0;
    if (up && up.isDown) {
      --y;
    }
    if (left && left.isDown) {
      --x;
    }
    if (down && down.isDown) {
      ++y;
    }
    if (right && right.isDown) {
      ++x;
    }

    const speed = 100;
    this.setVelocityX(x * speed);
    this.setVelocityY(y * speed);
  }
}

export function createUfo(scene: Scene, pos: Vector) {
  debug('create ufo');

  const ufo = new Ufo(scene, pos);

  //   const ufo = scene.physics.add.image(pos.x, pos.y, 'ufo');

  debug(ufo);

  //   scene.input.keyboard.on('keydown', (e: KeyboardEvent) => {
  //     debug(e);
  //     switch (e.code) {
  //       case 'ArrowLeft':
  //         ufo.setX(ufo.x - 10);
  //         break;
  //       case 'ArrowRight':
  //         ufo.setX(ufo.x + 10);
  //         break;
  //       case 'ArrowUp':
  //         ufo.setY(ufo.y - 10);
  //         break;
  //       case 'ArrowDown':
  //         ufo.setY(ufo.y + 10);
  //         break;
  //     }
  //   });

  return ufo;
}
