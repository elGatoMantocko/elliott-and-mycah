export type State<T, V = undefined> = Readonly<{ state: T; value: V }>;

export function state<T, V>(s: T): State<T, V>;
export function state<T, V>(s: T, v: V): State<T, V>;
export function state<T, V>(s: T, v?: V): State<T, V> {
  return { state: s, value: v == null ? ({} as V) : v };
}
