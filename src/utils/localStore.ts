import { createSignal, type Signal, createEffect } from "solid-js";
import { createStore } from "solid-js/store";

export function createStoredSignal<T>(
  key: string,
  defaultValue: T,
  storage = localStorage
): Signal<T> {

  const initialValue: T = storage.getItem(key)
    ? JSON.parse(storage.getItem(key) ?? '') as T
    : defaultValue;

  const [value, setValue] = createSignal<T>(initialValue);

  const setValueAndStore = ((arg) => {
    const v = setValue(arg);
    storage.setItem(key, JSON.stringify(v));
    return v;
  }) as typeof setValue;

  return [value, setValueAndStore];
}


export const parseLocalStorage = <T>(
  key: string,
  defaultValue: T,
  saveIfMissing = false
): T => {
  // check if running in astro or browser
  if (typeof localStorage === 'undefined') return defaultValue;
  if (!localStorage) return defaultValue;
  if (!localStorage.getItem(key) && saveIfMissing) {
    setLocalStorage(key, defaultValue);
  }
  return localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key)!)
    : defaultValue;
}

export const setLocalStorage = <T>(key: string, value: T) => {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(value))
}




type Path<T extends object> = Array<keyof T | number>;

interface StoredStore<T extends object> {
  get: () => T;
  set: (newValue: T) => void;
  setNested: (path: Path<T>, newValue: any) => void;
}

export const createStoredStore = <T extends object>(
  key: string, defaultValue: T
): StoredStore<T> => {

  const initialValue = typeof localStorage === undefined ? defaultValue : parseLocalStorage(key, defaultValue, true);
  const [value, setValue] = createStore<T>(initialValue);

  const setNestedValueAndStore = (path: Path<T>, newValue: any) => {
    // TODO Check
    setValue((prevValue: any) => {
      const copy = JSON.parse(JSON.stringify(prevValue));
      let current = copy;
      const lastIndex = path.length - 1;
      for (let i = 0; i < lastIndex; ++i) {
        current = current[path[i]];
      }
      current[path[lastIndex]] = newValue;
      return copy;
    });
    if (localStorage) setLocalStorage(key, value);
  };

  createEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  });

  return {
    get: () => value,
    set: setValue,
    setNested: setNestedValueAndStore
  };
}
