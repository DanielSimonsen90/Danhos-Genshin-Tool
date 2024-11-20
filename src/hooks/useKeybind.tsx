import { useEffect } from "react";

export default function useKeybind(key: string, eventOptions: Partial<KeyboardEvent>, callback: (e: KeyboardEvent) => void) {
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      const optionsMet = Object.keys(eventOptions).every(option => eventOptions[option as keyof typeof eventOptions] === e[option as keyof KeyboardEvent]);
      if (e.key === key && optionsMet) {
        e.preventDefault();
        callback(e);
      }
    };
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, [key, callback]);
}