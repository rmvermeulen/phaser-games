// tslint:disable:variable-name
import * as Phaser from 'phaser';

export const { Vector2: Vector } = Phaser.Math;
export type Vector = Phaser.Math.Vector2;

interface Point {
  x: number;
  y: number;
}

const VecXY = (x: number, y: number) => new Vector(x, y);
const VecV = ({ x, y }: Point) => new Vector(x, y);
export const Vec: typeof VecXY & typeof VecV = (
  xOrV: number | Point,
  y?: number,
) => (typeof xOrV === 'number' ? VecXY(xOrV, y!) : VecV(xOrV));
