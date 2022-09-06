
export const env = {
    dev: 'development',
    prod: 'production',
    staging: 'staging'
};

export const SERVER = process.env.SERVER;

// eslint-disable-next-line max-len
export const NODE_ENV = process.env.NODE_ENV as 'development' | 'staging' | 'production';

export const DATABASE = {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
};
