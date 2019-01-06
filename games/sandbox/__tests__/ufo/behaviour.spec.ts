import { Vec } from '../../../../common/vector';
import { UfoBehaviour } from '../../ufo.behaviour';

describe('Ufo Behaviour', () => {
  it('tracks state', () => {
    const b = new UfoBehaviour({
      ufo: {
        pos: Vec(10, 20),
        health: 100,
      },
    });
    expect(b).toMatchInlineSnapshot(`
UfoBehaviour {
  "state": Object {
    "lastMove": undefined,
    "player": undefined,
    "ufo": Object {
      "health": 100,
      "pos": Vector {
        "x": 10,
        "y": 20,
      },
    },
  },
}
`);
  });
});
