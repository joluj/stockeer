const cache = new Map<string, unknown>();

/**
 * Caches data
 * TODO: Clear Cache
 * TODO: Make it work for different functions with the same parameter
 * @param config
 */
export function memoize(config?: {
  /**
   * Transforms the data into a key used for caching.
   * If this function is not present, the args are JSON-stringified.
   * @param args
   */
  transform?: (...args: unknown[]) => string;
}) {
  return function (
    target: object,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const prop = descriptor.value ? 'value' : 'get';
    const originalFn = descriptor[prop];

    descriptor[prop] = function (...args: never[]) {
      const key = config?.transform?.(...args) ?? JSON.stringify(args);

      if (cache.has(key)) {
        return cache.get(key);
      }

      const result = originalFn.apply(this, args);

      cache.set(key, result);

      return result;
    };

    return descriptor;
  };
}
