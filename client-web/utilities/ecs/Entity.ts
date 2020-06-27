let idSeed = 0;

export type Entity = number;

export function createEntity(): Entity {
  return idSeed++;
}
