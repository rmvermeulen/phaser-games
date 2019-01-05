// tslint:disable:variable-name
import { Math } from 'phaser';

export class Vector extends Math.Vector2 {}

export const Vec = (x: number, y: number) => new Vector(x, y);
