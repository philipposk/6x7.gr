"use client";
import { useSyncExternalStore } from "react";

function subscribeMq(query: string) {
  return (cb: () => void) => {
    const mq = window.matchMedia(query);
    mq.addEventListener("change", cb);
    return () => mq.removeEventListener("change", cb);
  };
}

function getMq(query: string) {
  return () => window.matchMedia(query).matches;
}

const REDUCED_Q = "(prefers-reduced-motion: reduce)";
const MOBILE_Q = "(max-width: 768px)";

export function useReducedMotion() {
  return useSyncExternalStore(
    subscribeMq(REDUCED_Q),
    getMq(REDUCED_Q),
    () => false,
  );
}

export function useIsMobile() {
  return useSyncExternalStore(
    subscribeMq(MOBILE_Q),
    getMq(MOBILE_Q),
    () => false,
  );
}
