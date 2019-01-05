import createLogger from 'debug';

export const logger = (namespace: string) => createLogger(`game:${namespace}`);
