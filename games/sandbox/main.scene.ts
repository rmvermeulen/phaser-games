import { Scene } from 'phaser';
import { apply, concat, curry, evolve, flip, props, repeat } from 'ramda';

import { Vec, Vector } from '../../common/vector';

import { TextButton } from './text-button';

export class MainScene extends Scene {
  static readonly key = 'main-scenes';

  create() {
    let n = 0;

    const getText = () => `Clicked ${n} times`;
    const banner = this.add.text(100, 150, getText());

    const updateBanner = () => {
      ++n;
      banner.setText(getText());
    };

    const args = {
      text: 'button',
      style: { fill: 'green' },
      cb: updateBanner,
    };

    const flipCall = <A, B, R>(fn: (b: B) => (a: A) => R) => (a: A, b: B) =>
      fn(b)(a);

    const factory = TextButton.sceneFactory(this);
    const buttons = repeat(
      {
        pos: Vec(100, 100),
        text: 'button',
        style: { fill: 'green' },
        cb: updateBanner,
      },
      3,
    )
      .map(
        flipCall((index) =>
          evolve({
            pos: curry(Vector.add)({ x: index * 100 }),
            text: flip(concat)(' ' + index),
          }),
        ),
      )
      .map(props(['pos', 'text', 'style', 'cb']))
      .map(apply(factory));
  }
}
