import { NODE_ENV } from '~/constants/config';
import Logger from './logger-interface';

const logger = Logger(NODE_ENV, console.log);

export const log = logger.log;

export const error = logger.error;
