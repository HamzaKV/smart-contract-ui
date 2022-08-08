import Storage from '~/lib/services/storage/storage';
import useCacheState from './cache-state';

/**
 * It returns a state and a setter function that persists the cache state to local storage
 * @param {string} key - The key to store the value under.
 * @param {D} initalState - The initial state of the cache.
 * @returns getState - A function that returns the current state.
 * @returns setState - A function that sets the current state.
 */
const usePersistentCacheState = <D>(
    key: string,
    initalState: D
): [() => D, (newValue: D) => void] => {
    const value = Storage.get(key);
    const [getState, updateState] = useCacheState<D>(value || initalState);

    const setState = (newValue: D): void => {
        updateState(newValue);
        Storage.set(key, newValue);
    };

    return [getState, setState];
};

export default usePersistentCacheState;
