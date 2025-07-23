export interface CacheItem<T = any> {
    value: T;
    expiresAt?: number;
}

export interface MiniCacheConfig {
    defaultTTL?: number;
    checkPeriod?: number;
}
