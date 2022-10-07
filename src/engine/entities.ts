export type Entity = number;

let nextEntityId = 1;

export function getNextEntityId() {
  return nextEntityId++;
}

type ComponentMap<T> = {
  [key in keyof T]?: T[key];
};

export class EntityManager<C> {
  components: Map<Entity, ComponentMap<C>>;

  constructor() {
    this.components = new Map();
  }

  reset() {
    this.components = new Map();
  }

  addEntity(components: ComponentMap<C>) {
    const entityId = getNextEntityId();
    this.components.set(entityId, components);

    return entityId;
  }

  getEntities(components: (keyof C)[]) {
    let matches: Entity[] = [];

    for (let entry of this.components.entries()) {
      const [entity, entityComponents] = entry;

      if (components.every((c) => c in entityComponents)) {
        matches.push(entity);
      }
    }

    return matches.map((entityId) => ({
      component: <K extends keyof C>(key: K): C[K] | undefined => {
        return this.components.get(entityId)?.[key];
      },
      addComponent: <K extends keyof C>(key: K, value: C[K]) => {
        this.components.get(entityId)![key] = value;
      },
      removeComponent: <K extends keyof C>(key: K) => {
        this.removeComponent(entityId, key);
      },
      delete: () => {
        this.components.delete(entityId);
      },
    }));
  }

  addComponent<K extends keyof C>(entity: Entity, key: K, value: C[K]) {
    if (this.components.has(entity)) {
      this.components.get(entity)![key] = value;
    }
  }

  removeComponent(entity: Entity, key: keyof C) {
    if (this.components.has(entity)) {
      delete this.components.get(entity)![key];
    }
  }
}
