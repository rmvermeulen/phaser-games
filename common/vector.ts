// tslint:disable-next-line:variable-name
export const Vec = (x: number, y: number) => new Vector(x, y);

export class Vector {
  static add(a: Partial<Vector>, b: Partial<Vector>) {
    return Vector.clone(a).add(b);
  }

  static scale({ x, y }: Vector, scalar: number) {
    return Vec(x * scalar, y * scalar);
  }

  static clone({ x = 0, y = 0 }: Partial<Vector>) {
    return new Vector(x, y);
  }
  constructor(public x = 0, public y = 0) {}

  getLength() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  setLength(newLength: number) {
    if (newLength === 0) {
      this.setTo(0, 0);
      return;
    }
    this.scale(newLength / this.getLength());
    return this;
  }

  scale(scalar: number) {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }

  setTo(x: number, y: number) {
    this.x = x;
    this.y = y;
    return this;
  }

  clone() {
    return Vec(this.x, this.y);
  }

  add({ x = 0, y = 0 }: Partial<Vector>) {
    this.x += x;
    this.y += y;
    return this;
  }
}
