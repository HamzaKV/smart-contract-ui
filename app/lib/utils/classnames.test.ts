import classnames from './classnames';

describe('classnames', () => {

    it('should create a classnames', () => {
        expect(classnames('a', 'b')).toBe('a b');
    });
});
