import { Vec, Vector } from '../vector';

describe('Vector Helper: Vec', () => {
  it('takes x and y', () => {
    const v = Vec(1, 2);
    expect(v).toBeInstanceOf(Vector);
    expect(v).toMatchObject({ x: 1, y: 2 });
  });
  it('takes any object with x and y', () => {
    const obj = { x: 1, y: 2 };
    const vObj = Vec(obj);
    expect(vObj).toBeInstanceOf(Vector);
    expect(vObj).toMatchObject(obj);

    const vVec = Vec(vObj);
    expect(vVec).toBeInstanceOf(Vector);
    expect(vVec).toMatchObject(obj);
  });
});
