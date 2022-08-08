
export const env = {
    dev: 'development',
    prod: 'production',
    staging: 'staging'
};

export const SERVER = process.env.REACT_APP_SERVER;

// eslint-disable-next-line max-len
export const NODE_ENV = process.env.NODE_ENV as 'development' | 'staging' | 'production';
