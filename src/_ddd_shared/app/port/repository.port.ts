export interface Save<Entity> {
  save(entity: Entity): Promise<Entity>;
}

export interface SaveMany<Entity> {
  saveMany(entities: Entity[]): Promise<Entity[]>;
}

export interface Find<Entity> {
  find(id: string): Promise<Entity | null>;
}

export interface FindMany<Entity> {
  findMany(ids: string[]): Promise<Entity[]>;
}

export interface FindById<Entity> {
  findById(id: string): Promise<Entity | null>;
}

export interface Delete<Entity> {
  delete(entity: Entity): Promise<Entity>;
}

// export interface Cursor {
//   cursor: string;
//   limit: number;
// }

// export interface CursorMeta {
//   //...
// }

export interface RepositoryPort<Entity>
  extends Save<Entity>,
    SaveMany<Entity>,
    Find<Entity>,
    Delete<Entity> {
  setCorrelationId(correlationId: string): this;
}

export interface RepositoryProvider<Entity, R extends RepositoryPort<Entity>> {
  provide(correlationId: string): R;
}
