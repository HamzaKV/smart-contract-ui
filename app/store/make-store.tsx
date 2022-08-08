import {
    createContext,
    FC,
    Reducer,
    ReducerState,
    useContext,
    useReducer,
} from 'react';

/**
 * It takes a reducer and an initial state and returns a React Context, a hook to get the store, and
 * a hook to get the dispatch function
 * @param {R} reducer - The reducer function that will be used to update the state.
 * @param initialState - The initial state of the reducer.
 * @returns StoreProvider - The StoreProvider that will be used to wrap the component that needs the store.
 * @returns useStore - The hook to get the store.
 * @returns useDispatch - The hook to get the dispatch function.
 */
const makeStore = <R extends Reducer<any, any>, IContext>(
    reducer: R,
    initialState: ReducerState<R>
): [
    React.ReactNode,
    () => IContext,
    () => React.Dispatch<React.ReducerAction<R>>
] => {
    type TDispatchContext = React.Dispatch<React.ReducerAction<R>>;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const dispatchContext = createContext<TDispatchContext>(null);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const storeContext = createContext<IContext>(null);

    const StoreProvider: FC = ({ children }) => {
        const [store, dispatch] = useReducer<R, ReducerState<R>>(
            reducer,
            initialState,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            undefined
        );

        return (
            <dispatchContext.Provider value={dispatch}>
                <storeContext.Provider
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    value={store}
                >
                    {children}
                </storeContext.Provider>
            </dispatchContext.Provider>
        );
    };

    const useDispatch = () => {
        return useContext(dispatchContext);
    };

    const useStore = () => {
        return useContext(storeContext);
    };

    return [StoreProvider, useStore, useDispatch];
};

export default makeStore;
