import bluebird = require('bluebird');
import { AUTO, Game } from 'phaser';

import { logger } from '../../common/logger';

import { MainScene } from './main.scene';

(window as any).Promise = bluebird;
declare const window: Window & { game?: Game };

const debug = logger('main');

if (window.game) {
  window.location.reload();
}

localStorage.debug = 'game:*';

window.onload = () => {
  const game = new Game({
    width: 800,
    height: 600,
    type: AUTO,
    canvas: document.getElementById('game') as any,
    physics: {
      default: 'arcade',
      arcade: {
        debug: true,
      },
    },
  });
  window.game = game;

  game.scene.add(MainScene.key, MainScene, true);

  debug('game started');
};
