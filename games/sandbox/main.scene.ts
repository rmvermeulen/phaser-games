import { Scene } from 'phaser';
import { apply, call, props } from 'ramda';

import { logger } from '../../common/logger';
import { Vec } from '../../common/vector';

import { TextButton } from './text-button';
import { createUfo, Ufo } from './ufo';

const debug = logger('menu');

export class MainScene extends Scene {
  static readonly key = 'main-scene';

  private ufo!: Ufo;
  preload() {
    this.load.image('ufo', 'textures/ufo.png');
    this.load.image('flare', 'textures/flare.png');
  }
  create() {
    createSimpleMenu(this, [
      ['level 1', () => debug('going to level 1')],
      ['level 2', () => debug('going to level 2')],
      ['level 3', () => debug('going to level 3')],
    ]);

    this.ufo = createUfo(this, Vec(400, 100));
  }

  update(time: number, delta: number) {
    super.update(time, delta);
    this.ufo.update(time, delta);
  }
}

function createSimpleMenu(scene: Scene, bArgs: Array<[string, () => any]>) {
  debug('create menu');
  let n = 0;

  const getText = () => `Clicked ${n} times`;
  const banner = scene.add.text(50, 30, getText());

  const updateBanner = () => {
    ++n;
    banner.setText(getText());
  };

  const args = {
    text: 'button',
    style: { fill: 'green' },
    cb: updateBanner,
  };

  const factory = TextButton.sceneFactory(scene);

  const buttons = bArgs
    .map(([text, cb], index) => ({
      pos: Vec(50, 100 + index * 50),
      text,
      style: { fill: 'green' },
      cb: () => [cb, updateBanner].map(call),
    }))
    .map(props(['pos', 'text', 'style', 'cb']))
    .map(apply(factory));
}
