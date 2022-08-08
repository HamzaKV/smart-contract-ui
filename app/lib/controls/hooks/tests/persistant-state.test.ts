import { renderHook, act } from '@testing-library/react-hooks';
import usePersistentState from '../persistant-state';

describe('usePersistentState', () => {
    const initialState = 'One';
    const key = 'test';

    it('should return the initial state', () => {
        const { result } = renderHook(() =>
            usePersistentState(key, initialState)
        );

        expect(result.current[0]).toBe(initialState);
    });

    it('should return the updated state', () => {
        const { result } = renderHook(() =>
            usePersistentState(key, initialState)
        );

        act(() => {
            result.current[1]('Two');
        });

        expect(result.current[0]).toBe('Two');
    });
});
