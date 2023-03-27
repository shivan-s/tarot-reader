// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Locals {}
		// interface Error {}
		// interface PageData {}
		interface Platform {
			env?: {
				YOUR_KV_NAMESPACE: KVNamespace;
				YOUR_DURABLE_OBJECT_NAMESPACE: DurableObjectNamespace;
			};
			context: {
				waitUntil(promise: Promise<any>): void;
			};
			caches: CacheStorage & { default: Cache };
		}
	}
}

export {};
