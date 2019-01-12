import bluebird = require('bluebird');
import Phaser from 'phaser';

import { logger } from '../../common/logger';

import { FallingBoxesScene } from './scenes/falling-boxes.scene';
import { MainScene } from './scenes/main.scene';
import { UfoScene } from './scenes/ufo.scene';

(window as any).Promise = bluebird;
declare const window: Window & { game?: Phaser.Game };

const debug = logger('main');

if (window.game) {
  window.location.reload();
}

localStorage.debug = 'game:*';

window.onload = () => {
  const game = new Phaser.Game({
    width: 800,
    height: 600,
    type: Phaser.AUTO,
    canvas: document.getElementById('game') as any,
    physics: {
      arcade: {
        debug: true,
        gravity: { y: 200 },
      },
      matter: {
        debug: true,
        gravity: { y: 0.5 },
      },
    },
  });

  window.game = game;

  game.scene.add(MainScene.key, MainScene, true);
  game.scene.add(UfoScene.key, UfoScene);
  game.scene.add(FallingBoxesScene.key, FallingBoxesScene);

  debug('game started');
};
