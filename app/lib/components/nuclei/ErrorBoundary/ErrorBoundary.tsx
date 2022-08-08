import { Component } from 'react';

export interface IProps {
    ErrorComponent: any;
    logError: (error: any, errorInfo: any) => void;
}

export interface IState {
    hasError: boolean;
}

class ErrorBoundary extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: any) {
        return { hasError: true };
    }

    componentDidCatch(error: any, errorInfo: any) {
        this.props.logError(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return this.props.ErrorComponent;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
