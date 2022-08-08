import { useEffect, useState } from 'react';

/**
 * It returns a state and a setState function that will update the state after a delay
 * @param {D} value - The initial value of the state.
 * @param [callback] - A callback function that will be called after the delay.
 * @param [delay=500] - The amount of time to wait before updating the state.
 * @returns state - The value of the state.
 * @returns setState - A function that updates the state.
 */
const useDebounceState = <D>(
    value: D,
    callback?: (v?: D) => any,
    delay = 500
): [D, React.Dispatch<D>] => {
    const [state, setState] = useState<D>(value);

    useEffect(() => {
        const timeout: ReturnType<typeof setTimeout> = setTimeout(() => {
            setState(value);
        }, delay);

        return () => {
            clearTimeout(timeout);
        };
    }, [delay, value]);

    useEffect(() => {
        (async () => {
            if (callback) await callback(state);
        })();
    }, [callback, state]);

    return [state, setState];
};

export default useDebounceState;
