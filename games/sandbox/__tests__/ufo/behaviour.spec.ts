import { Vec } from '../../../../common/vector';
import { UfoBehaviour } from '../../ufo.behaviour';

describe('Ufo Behaviour', () => {
  const pos = Vec(0, 0);
  let cmd;
  beforeEach(() => {
    const brain = new UfoBehaviour({
      ufo: { pos, health: 100 },
    });

    cmd = brain.decide();
    expect(cmd).toMatchObject({
      move: expect.any(Object),
      isComplete: expect.toBeFunction(),
    });
  });

  // it('is complete when ufo pos matches target', () => {
  //   const { move, isComplete } = cmd;
  //   // current position
  //   expect(isComplete(pos)).toBe(false);
  //   // final position
  //   expect(isComplete(move as any)).toBe(true);
  // });
  it('is complete when ufo passes target', () => {
    const { move, isComplete } = cmd;
    // current position
    expect(isComplete(pos)).toEqual(false);
    // intermediate position
    expect(isComplete(Vec(move.x * 0.99, move.y * 0.99))).toEqual(false);
    // passed
    expect(isComplete(Vec(move.x * 1.05, move.y * 1.05))).toBe(true);
  });
});
