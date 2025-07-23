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
// or const cache = require('@shishirsubedi/mini-cache')

// 1. Configure the cache (optional)
cache.configure({
  defaultTTL: 3000,    // Default TTL of 3 seconds for every .set() (if not overridden)
  checkPeriod: 5000    // Automatically removes expired keys every 5 seconds
});

// 2. Store data in the cache
cache.set('user:1', { name: 'Alice' }, 5000); // Expires in 5 seconds
cache.set('user:2', { name: 'Bob' });         // Uses defaultTTL (3 seconds)

// 3. Retrieve data
const user1 = cache.get<{ name: string }>('user:1');
console.log('User1:', user1?.name); // → Alice

// 4. Check existence
if (cache.has('user:2')) {
  console.log('User2 is cached.');
}

// 5. See when a key will expire
const expiry = cache.expiresAt('user:1');
if (expiry) {
  console.log('User1 expires at:', new Date(expiry).toLocaleString()); //normally it returns the expiration timestamp (in ms) for a key.
}

// 6. Manually remove expired items
setTimeout(() => {
  cache.removeExpired();
  console.log('Expired keys cleaned up.');
}, 6000);

// 7. Delete a specific key
cache.del('user:2');

// 8. Flush the entire cache
cache.flush();

// 9. Stop the internal cleanup timer (optional cleanup)
process.on('SIGINT', () => {
  cache.stop();
  console.log('Cache cleanup stopped. Exiting...');
  process.exit();
});

// 10. Print cache size
console.log(`Cache size: ${cache.size()}`);

```

---

This library is conceptually inspired by node-cache, but with a lighter footprint, singleton access, and full TypeScript typings.

---