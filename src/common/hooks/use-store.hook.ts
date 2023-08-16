import { useEffect, useState } from 'react';
import { Observable } from 'rxjs';

export function useStore<T>(store$: Observable<T>): T | undefined {
  const [storeValue, setStoreValue] = useState<T>();

  useEffect(() => {
    const subscription = store$.subscribe((value) => {
      setStoreValue(value);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [store$]);

  return storeValue;
}
