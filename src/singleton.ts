import { MiniCacheTTL } from './core/MiniCache';
import type { MiniCacheConfig } from './core/types';

const cache = new MiniCacheTTL();

export const configure = (config: MiniCacheConfig) => cache.configure(config);
export const set = cache.set.bind(cache);
export const get = cache.get.bind(cache);
export const del = cache.del.bind(cache);
export const has = cache.has.bind(cache);
export const expiresAt = cache.expiresAt.bind(cache);
export const removeExpired = cache.removeExpired.bind(cache);
export const flush = cache.flush.bind(cache);
export const stop = cache.stop.bind(cache);
export const size = cache.size.bind(cache);
