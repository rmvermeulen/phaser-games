import { Game, AUTO } from 'phaser';
import { MainScene } from './main.scene';

declare const window: Window & { game?: Game };

if (window.game) {
  window.location.reload();
}

window.onload = () => {
  const game = new Game({
    width: 800,
    height: 600,
    type: AUTO,
    parent: 'game',
  });
  window.game = game;

  game.scene.add(MainScene.key, MainScene, true);
};
