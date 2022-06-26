import { v4 as uuidv4 } from 'uuid';

type Brand<T, K> = T & { __brand: K };
export type UUIDv4 = Brand<string, 'uuid'>;

// ignoring for coverage because uuid doesn't work with jest and this is just a
// type wrapper around uuid
// istanbul ignore next
export const uuid = () => uuidv4() as UUIDv4;
