import { renderHook, act } from '@testing-library/react-hooks';
import usePersistentCacheState from 'src/controls/hooks/persistant-cache-state';

describe('usePersistentCacheState', () => {
    const initialState = 'One';
    const key = 'test';

    it('should return the initial state', () => {
        const { result } = renderHook(() =>
            usePersistentCacheState(key, initialState)
        );

        const [getState] = result.current;

        expect(getState()).toBe(initialState);
    });

    it('should return the updated state', () => {
        const { result } = renderHook(() =>
            usePersistentCacheState(key, initialState)
        );

        const [, setState] = result.current;

        act(() => {
            setState('Two');
        });

        const [getState] = result.current;

        expect(getState()).toBe('Two');
    });
});
