import { AUTO, Game } from 'phaser';

import { logger } from '../../common/logger';

import { MainScene } from './main.scene';

const debug = logger('main');

declare const window: Window & { game?: Game };

if (window.game) {
  window.location.reload();
}

localStorage.debug = 'game:*';

window.onload = () => {
  const game = new Game({
    width: 800,
    height: 600,
    type: AUTO,
    parent: 'game',
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
