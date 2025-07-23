# @shishirsubedi/mini-cache

> A minimal in-memory singleton cache with TTL, expiration cleanup, and no dependencies.

## 📦 Install

```bash
npm install @shishirsubedi/mini-cache
```

--- 

## Usage

```ts
import * as cache from '@shishirsubedi/mini-cache';

// Optional: Configure default TTL and background cleanup interval
cache.configure({
  defaultTTL: 3000,       // Default TTL for all .set() calls in ms (3 seconds)
  checkPeriod: 5000       // Auto-cleanup interval in ms
});

// set(key, value, ttl?)
cache.set('user:123', { name: 'Alice' }, 5000); // expires in 5s
cache.set('user:456', { name: 'Bob' });         // expires in defaultTTL (3s)

// get(key): T | undefined
const user = cache.get<{ name: string }>('user:123');
console.log(user?.name); // "Alice"

// del(key)
cache.del('user:123'); // Deletes key if it exists

// has(key): boolean
if (cache.has('user:456')) {
  console.log('User is cached!');
}

// expiresAt(key): number | undefined
const ts = cache.expiresAt('user:123');
console.log(ts); // e.g., 1721456789453 (UNIX ms timestamp)

// removeExpired()
cache.removeExpired(); // Manually remove all expired items

// flush()
cache.flush(); // Clears the entire cache

// stop()
cache.stop(); // Stops the automatic expiration check interval

// size(): number
console.log(`Cache size: ${cache.size()}`);

// configure(options)
cache.configure({
  defaultTTL: 10000,  // 10 seconds
  checkPeriod: 3000   // cleanup expired entries every 3s
});

//Example:
import * as cache from '@shishirsubedi/mini-cache';

cache.configure({ defaultTTL: 2000, checkPeriod: 5000 });

cache.set('token', 'abc123');
console.log(cache.get('token'));        // 'abc123'

setTimeout(() => {
  console.log(cache.get('token'));     // undefined (expired)
}, 2500);

```