import { Scene } from 'phaser';
import { apply, call, props } from 'ramda';

import { Vec } from '../../../common/vector';
import { TextButton } from '../text-button';

export function createSimpleMenu(
  scene: Scene,
  bArgs: Array<[string, () => any]>,
): void {
  let n = 0;

  const getText = () => `Clicked ${n} times`;
  const banner = scene.add.text(50, 30, getText());

  const updateBanner = () => {
    ++n;
    if (banner.active) {
      banner.setText(getText());
    }
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
