import { GameObjects, Scene } from 'phaser';

import { Vector } from '../../common/vector';

export class TextButton extends GameObjects.Text {
  static sceneFactory(scene: Scene) {
    return (pos: Vector, text: string, style: any, onClick: () => any) => {
      const button = new TextButton(scene, pos, text, style, onClick);
      scene.add.existing(button);
      return button;
    };
  }
  private _color: string;
  private readonly _tint = 0xdddddd;

  constructor(
    scene: Scene,
    { x, y }: Vector,
    text: string,
    style: any = {},
    private readonly onClick: () => any,
  ) {
    super(scene, x, y, `[${text}]`, style);
    this._color = style.fill || 'white';
    this.setInteractive({ useHandCursor: true });

    this.setTint(this._tint);

    this.on('pointerdown', () => this.onDown())
      .on('pointerup', () => this.onUp())
      .on('pointerover', () => this.onOver())
      .on('pointerout', () => this.onOut());
  }

  onOver() {
    // brighten
    this.setTint(0xffffff);
  }
  onOut() {
    this.resetTint();
    this.resetColor();
  }

  onDown() {
    this.setFill('yellow');
    this.onClick();
  }
  onUp() {
    this.resetColor();
  }

  private resetColor() {
    this.setFill(this._color);
  }
  private resetTint() {
    this.setTint(this._tint);
  }
}
