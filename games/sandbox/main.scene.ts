import { Scene } from 'phaser';
import { apply, curry, evolve, props, repeat } from 'ramda';
import { TextButton } from './text-button';
import { Vec, Vector } from './vector';

type Ret<T> = T extends (...args: any[]) => infer R ? R : never;
type Args<T> = T extends (...args: infer U) => any ? U : never;

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
        flipCall((n) =>
          evolve({
            pos: curry(Vector.add)({ x: n * 100 }),
            text: (t: string) => [t, n].join(' '),
          }),
        ),
      )
      .map(props(['pos', 'text', 'style', 'cb']))
      .map(apply(factory));
  }
}
