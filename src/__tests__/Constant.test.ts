import { Constant } from '../lib/Formula'

test('Constant toString, toTex methods', () => {
    const constant = new Constant('Ccc');
    const c = 'Ccc'
    expect(constant.toString()).toBe(`${c}`);
    expect(constant.toTex()).toBe(`\\text{\\textsf{${c}}}`);
});