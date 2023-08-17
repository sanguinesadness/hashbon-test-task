import { useEffect, useState } from 'react';
import { Observable } from 'rxjs';

export function useStore<T>(store$: Observable<T>, defaultValue: T): T {
  const [storeValue, setStoreValue] = useState<T>(defaultValue);

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
