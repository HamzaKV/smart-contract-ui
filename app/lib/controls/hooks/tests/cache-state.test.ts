import { renderHook, act } from '@testing-library/react-hooks';
import useCacheState from 'src/controls/hooks/cache-state';

describe('useCacheState', () => {
    const initialState = 'One';

    it('should return initial state', () => {
        const { result } = renderHook(() => useCacheState(initialState));
        
        const [getState] = result.current;

        expect(getState()).toEqual(initialState);
    });

    it('should return updated state', () => {
        const { result } = renderHook(() => useCacheState(initialState));
        
        const [getState, setState] = result.current;

        act(() => {
            setState('Two');
        });

        expect(getState()).toEqual('Two');
    });
});
