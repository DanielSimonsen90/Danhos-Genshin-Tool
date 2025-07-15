import { useCallback, useEffect, useRef, useState } from 'react';

type IntervalReturn = {
  start(): void;
  restart(): void;
  stop(): void;
};

export default function useInterval(
  callback: () => void,
  delay: number | null,
  startImmediately: boolean = true
): IntervalReturn {
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);  
  
  const start = useCallback(() => {
    if (intervalId || delay === null) return;
    const id = setInterval(() => callbackRef.current(), delay);
    setIntervalId(id);
  }, [intervalId, delay]);

  const restart = useCallback(() => {
    stop();
    if (delay !== null) {
      const id = setInterval(() => callbackRef.current(), delay);
      setIntervalId(id);
    }
  }, [delay]);  
  
  const stop = useCallback(() => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  }, [intervalId]);

  // Start the interval immediately if specified
  useEffect(() => {
    if (startImmediately) {
      start();
    }
  }, [startImmediately, start]);

  return { start, restart, stop };
}
