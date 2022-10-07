export class ResourceManager<R> {
  pool: {
    [key in keyof R]?: R[key] | undefined;
  } = {};

  get<K extends keyof R>(key: K) {
    return this.pool[key];
  }

  set<K extends keyof R>(key: K, value: R[K] | undefined) {
    this.pool[key] = value;
  }

  reset() {
    this.pool = {};
  }
}
