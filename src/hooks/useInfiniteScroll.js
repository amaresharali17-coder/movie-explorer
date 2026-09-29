import { useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for infinite scrolling using IntersectionObserver
 * @param {Function} onIntersect - Callback fired when sentinel becomes visible
 * @param {boolean} hasMore - Whether there are more items to fetch
 * @param {boolean} isLoading - Whether a request is currently in progress
 * @param {Object} options - IntersectionObserver options
 * @returns {React.RefObject} - Ref to attach to the sentinel element
 */
export const useInfiniteScroll = (
  onIntersect,
  hasMore,
  isLoading,
  options = { root: null, rootMargin: '250px', threshold: 0.1 }
) => {
  const sentinelRef = useRef(null);
  const observerRef = useRef(null);

  // Keep latest callback in ref to prevent stale closures
  const callbackRef = useRef(onIntersect);
  useEffect(() => {
    callbackRef.current = onIntersect;
  }, [onIntersect]);

  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !isLoading) {
        if (typeof callbackRef.current === 'function') {
          callbackRef.current();
        }
      }
    },
    [hasMore, isLoading]
  );

  useEffect(() => {
    const targetElement = sentinelRef.current;
    if (!targetElement) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    if (!hasMore) return;

    observerRef.current = new IntersectionObserver(handleObserver, {
      root: options.root || null,
      rootMargin: options.rootMargin || '250px',
      threshold: options.threshold ?? 0.1,
    });

    observerRef.current.observe(targetElement);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver, hasMore, options.root, options.rootMargin, options.threshold]);

  return sentinelRef;
};

export default useInfiniteScroll;
