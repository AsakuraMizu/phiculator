import localforage from 'localforage';
import { writable, type Writable } from 'svelte/store';

export default function persistent<T>(key: string): Writable<T> {
  const store = writable<T>();
  localforage.getItem(key).then((value) => {
    if (value !== null) {
      store.set(value as T);
    }
    store.subscribe((value) =>
      value !== undefined && value !== null
        ? localforage.setItem(key, value)
        : localforage.removeItem(key)
    );
  });
  return store;
}
