import { useEffect } from 'react';
import type { EffectCallback, DependencyList } from 'react';

export default function useDebouncedEffect(
  effect: EffectCallback,
  delay: number,
  deps?: DependencyList
) {
  useEffect(() => {
    const handler = setTimeout(() => effect(), delay);

    return () => clearTimeout(handler);
    // using || operator because
    // if its optional then it can be undefined.
  }, [...(deps || []), delay]);
}
