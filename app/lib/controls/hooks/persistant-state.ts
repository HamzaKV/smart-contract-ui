import React, { useEffect, useState } from 'react';
import Storage from '~/lib/services/storage/storage';

/**
 * It returns a state and a setState function that will persist the state to local storage
 * @param {string} key - The key to use for local storage.
 * @param {D} initalState - The initial state of the component.
 * @returns state - A function that returns the current state.
 * @returns setState - A function that sets the current state and re-renders the component.
 */
const usePersistentState = <D>(
    key: string,
    initalState: D
): [D | null, React.Dispatch<D>] => {
    const [state, setState] = useState<D | null>(null);

    useEffect(() => {
        //read from local storage
        const value: D = Storage.get(key);
        if (value) {
            setState(value);
        } else {
            setState(initalState);
        }
    }, [key, initalState]);

    useEffect(() => {
        if (key) {
            //save to local storage
            Storage.set(key, state);
        }
    }, [state, key]);

    return [state, setState];
};

export default usePersistentState;
