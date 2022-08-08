import { useRef } from 'react';

/**
 * A React Hook that uses useRef to store the state without causing a re-render.
 * @param {D} initialState - The initial state of the hook.
 * @returns getState - A function that returns the current state.
 * @returns setState - A function that sets the current state.
 */
const useCacheState = <D>(
    initialState: D
): [() => D, (newValue: D) => void] => {
    const state = useRef<D>(initialState);

    const getState = (): D => state.current;

    const updateState = (newValue: D): void => {
        state.current = newValue;
    };

    return [getState, updateState];
};

export default useCacheState;
