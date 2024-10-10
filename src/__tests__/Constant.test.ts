import { Constant }from '../FormulaTmp'

test('Constant class should return the full string', () => {
    const constant = new Constant('Ccc');
    expect(constant.toString()).toBe('Ccc');
});