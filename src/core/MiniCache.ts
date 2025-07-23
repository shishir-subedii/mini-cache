import { CacheItem, MiniCacheConfig } from './types';

export class MiniCacheTTL {
    private cache = new Map<string, CacheItem>();
    private defaultTTL?: number;
    private checkIntervalId?: NodeJS.Timeout;

    constructor(config?: MiniCacheConfig) {
        this.configure(config);
    }

    configure(config?: MiniCacheConfig): void {
        this.defaultTTL = config?.defaultTTL;
        if (this.checkIntervalId) clearInterval(this.checkIntervalId);
        if (config?.checkPeriod && config.checkPeriod > 0) {
            this.checkIntervalId = setInterval(() => {
                this.removeExpired();
            }, config.checkPeriod);
        }
    }

    set<T>(key: string, value: T, ttl?: number): void {
        const now = Date.now();
        const expiresAt = ttl ?? this.defaultTTL ? now + (ttl ?? this.defaultTTL!) : undefined;
        this.cache.set(key, { value, expiresAt });
    }

    get<T = any>(key: string): T | undefined {
        const item = this.cache.get(key);
        if (!item) return undefined;
        if (item.expiresAt && Date.now() > item.expiresAt) {
            this.cache.delete(key);
            return undefined;
        }
        return item.value;
    }

    has(key: string): boolean {
        const item = this.cache.get(key);
        if (!item) return false;
        if (item.expiresAt && Date.now() > item.expiresAt) {
            this.cache.delete(key);
            return false;
        }
        return true;
    }

    del(key: string): boolean {
        return this.cache.delete(key);
    }

    expiresAt(key: string): number | undefined {
        return this.cache.get(key)?.expiresAt;
    }

    removeExpired(): void {
        const now = Date.now();
        for (const [key, item] of this.cache.entries()) {
            if (item.expiresAt && now > item.expiresAt) {
                this.cache.delete(key);
            }
        }
    }

    flush(): void {
        this.cache.clear();
    }

    stop(): void {
        if (this.checkIntervalId) {
            clearInterval(this.checkIntervalId);
            this.checkIntervalId = undefined;
        }
    }

    size(): number {
        return this.cache.size;
    }
}
