"use client";
import { useCallback, useSyncExternalStore } from "react";

const KEY = "6x7:opened";
const EVT = "6x7:opened-changed";

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function write(list: string[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent(EVT, { detail: list }));
  } catch {}
}

const EMPTY: readonly string[] = Object.freeze([]) as readonly string[];

let cachedSnapshot: string[] = EMPTY as string[];
let cachedSerialized = "[]";

function getSnapshot(): string[] {
  const fresh = read();
  const serialized = JSON.stringify(fresh);
  if (serialized !== cachedSerialized) {
    cachedSerialized = serialized;
    cachedSnapshot = fresh;
  }
  return cachedSnapshot;
}

function getServerSnapshot(): string[] {
  return EMPTY as string[];
}

function subscribe(cb: () => void) {
  const handler = () => cb();
  window.addEventListener(EVT, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(EVT, handler);
    window.removeEventListener("storage", handler);
  };
}

export function useOpenedProjects() {
  const opened = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const open = useCallback((slug: string) => {
    const list = read();
    if (!list.includes(slug)) {
      list.push(slug);
      write(list);
    }
  }, []);

  const reset = useCallback(() => write([]), []);

  return { opened, open, reset, count: opened.length };
}
