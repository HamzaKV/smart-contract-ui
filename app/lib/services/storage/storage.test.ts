import storage from './storage';

describe('Storage', () => {
    it('store values', () => {
        storage.set('key', 'value');
        expect(storage.get('key')).toBe('value');
    });

    it('remove values', () => {
        storage.set('key', 'value');
        storage.remove('key');
        expect(storage.get('key')).toBe(null);
    });

    it('clear all values', () => {
        storage.set('key', 'value');
        storage.clear();
        expect(storage.get('key')).toBe(null);
    });
});
