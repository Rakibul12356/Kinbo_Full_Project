import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/** False during SSR and hydration, true afterwards — gate localStorage-backed UI with it. */
export function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
