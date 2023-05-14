import { useEffect, useRef } from 'react';

export function useRenderCount() {
  const countRef = useRef(0);

  useEffect(() => {
    countRef.current += 1;
  });

  return countRef.current;
}
