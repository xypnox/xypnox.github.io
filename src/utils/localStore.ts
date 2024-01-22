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



type Path<T extends object> = Array<keyof T | number>;

interface StoredStore<T extends object> {
  get: () => T;
  set: (newValue: T) => void;
  setNested: (path: Path<T>, newValue: any) => void;
}

export const createStoredStore = <T extends object>(
  key: string, defaultValue: T
): StoredStore<T> => {

  const initialValue = localStorage ? localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key)!)
    : defaultValue : defaultValue;

  const [value, setValue] = createStore<T>(initialValue);

  const setNestedValueAndStore = (path: Path<T>, newValue: any) => {
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
    if (localStorage) localStorage.setItem(key, JSON.stringify(value));
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
