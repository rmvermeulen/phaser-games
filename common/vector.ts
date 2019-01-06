/**
 * import the type info normally
 * but use require to load the js file separately for testing
 * and not the entire phaser library (uses canvas etc)
 */

// tslint:disable:variable-name
import { Math as _Math } from 'phaser';
// tslint:disable-next-line:no-var-requires
const PhMath: typeof _Math = require('phaser/src/math');

export class Vector extends PhMath.Vector2 {}

interface Point {
  x: number;
  y: number;
}

const VecXY = (x: number, y: number) => new Vector(x, y);
const VecV = ({ x, y }: Point) => new Vector(x, y);
export const Vec: typeof VecXY & typeof VecV = (
  xOrV: number | Point,
  y?: number,
) =>
  typeof xOrV === 'number' ? new Vector(xOrV, y) : new Vector(xOrV.x, xOrV.y);
