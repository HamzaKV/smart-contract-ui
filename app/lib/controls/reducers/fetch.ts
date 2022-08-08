import { Status } from '../hooks/fetch';

// Reducer for fetch hook state and actions
export default (state: any, action: any) => {
    switch (action.type) {
        case Status.idle:
            return { ...state, status: Status.idle, data: {}, error: '' };
        case Status.loading:
            return {
                ...state,
                status: Status.loading,
                data: {},
                error: '',
            };
        case Status.success:
            return {
                ...state,
                status: Status.success,
                data: action.payload,
                error: '',
            };
        case Status.error:
            return {
                ...state,
                status: Status.error,
                data: {},
                error: action.payload,
            };
        default:
            throw new Error('invalid action');
    }
};
