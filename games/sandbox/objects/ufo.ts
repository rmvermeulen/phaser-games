import { assert } from 'chai';
import { Input, Physics, Scene } from 'phaser';

import { logger } from '../../../common/logger';
import { Vec, Vector } from '../../../common/vector';

import { UfoAction, UfoBehaviour } from './ufo.behaviour';

const debug = logger('ufo');

export class Ufo extends Physics.Arcade.Image {
  private cursors: Input.Keyboard.CursorKeys;
  private behaviour: UfoBehaviour;
  private lastAction?: UfoAction;
  constructor(scene: Scene, { x, y }: Vector) {
    super(scene, x, y, 'ufo');
    scene.add.existing(this);

    scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);

    this.cursors = scene.input.keyboard.createCursorKeys();

    this.behaviour = new UfoBehaviour({
      ufo: {
        pos: Vec(x, y),
        health: 100,
      },
    });
  }

  update(time: number, delta: number) {
    super.update(time, delta);

    if (!this.lastAction || this.lastAction.isComplete(this)) {
      const action = this.behaviour
        .setState({
          ufo: {
            pos: Vec(this.x, this.y),
          },
        })
        .decide();
      this.lastAction = action;

      if (action.move) {
        const { move } = action;

        const diff = move.clone().subtract(Vec(this.x, this.y));

        const maxAcc = 100;
        if (diff.length() > maxAcc) {
          const scale = maxAcc / diff.length();
          diff.scale(scale);
        }

        diff.scale(100);
        this.setAcceleration(diff.x, diff.y);
      }
    }

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

  debug(ufo);

  return ufo;
}
