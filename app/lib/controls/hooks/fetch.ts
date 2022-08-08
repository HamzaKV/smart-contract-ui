import { useEffect, useReducer } from 'react';
import fetchReducer from '../reducers/fetch';

export const Status = {
    idle: 'idle',
    success: 'success',
    error: 'error',
    loading: 'loading',
};

const initialState = {
    status: Status.idle,
    data: {},
    error: undefined,
};

type TQuery = (token?: string) => Promise<any>;

type TStatus = keyof typeof Status;

type TFetch = (query: TQuery) => Promise<void>;

type THook = (
    query?: TQuery,
    config?: any,
) => [status: TStatus, data: any, error: Error, runFetch: TFetch];

/**
 * It takes a query function and returns a status, data, error, and runFetch function
 * @param query - The query function that will be called.
 * @param config - This is an object that contains the maximum number of times the hook will try to
 * fetch data after a 401 error.
 * @returns [status] - The current status of the hook.
 * @returns [data] - The current data of the hook.
 * @returns [error] - The current error of the hook.
 * @returns [runFetch] - A function that will fetch the data.
 */
const useFetch: THook = (
    query
) => {
    const [state, dispatch] = useReducer(fetchReducer, initialState);

    const runFetch = async (query: TQuery) => {
        try {
            const data = await query();
            dispatch({ type: 'success', payload: data });
        } catch (error: any) {
            dispatch({ type: 'error', payload: error });
        }
    };

    useEffect(() => {
        if (query) {
            runFetch(query);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [state.status, state.data, state.error, runFetch];
};

export default useFetch;
