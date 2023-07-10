export type State<T, V = undefined> = Readonly<{ state: T; value: V }>;

/**
 * Function to get a stateful type.
 * @param s state name to associate with this value.
 * @param v value associated with the state type.
 * @returns State object able to be coerced with state types.
 */
export function state<T, V>(s: T, v?: V): State<T, V> {
  return { state: s, value: v == null ? ({} as V) : v };
}
