const Logger = (env: string, loggerFunc: any) => {
    const error = (key: string, value: string) => {
        switch (env) {
            case 'development':
                // eslint-disable-next-line no-console
                loggerFunc(`ERROR: ${key} - ${value}`);
                break;
            case 'staging':
                // eslint-disable-next-line no-console
                loggerFunc(`ERROR: ${key} - ${value}`);
                break;
            case 'production':
                loggerFunc('error', key, value).then().catch();
                break;
            default:
                break;
        }
    };

    const log = (key: string, value: string) => {
        switch (env) {
            case 'development':
                // eslint-disable-next-line no-console
                loggerFunc(`LOG: ${key} - ${value}`);
                break;
            case 'staging':
                // eslint-disable-next-line no-console
                loggerFunc(`LOG: ${key} - ${value}`);
                break;
            case 'production':
                loggerFunc('log', key, value).then().catch();
                break;
            default:
                break;
        }
    };

    return {
        error,
        log,
    };
};

export default Logger;
