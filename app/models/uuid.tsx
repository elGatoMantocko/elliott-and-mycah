import { v4 as uuidv4 } from 'uuid';
type Brand<T, K> = T & { __brand: K };
export type UUIDv4 = Brand<string, 'uuid'>;

export const uuid = () => uuidv4() as UUIDv4;
