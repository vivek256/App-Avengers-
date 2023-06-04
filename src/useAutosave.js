import { useEffect, useRef, useState } from "react";
import equals from "fast-deep-equal";

export default function useAutoSave(storageId, data, delay = 1000) {
  const prevData = useRef(data);
  const [hasDataChanged, setHasDataChanged] = useState(false);

  useEffect(() => {
    if (!equals(prevData.current, data)) {
      prevData.current = data;
      setHasDataChanged(true);
    }
  }, [data]);

  useEffect(() => {
    if (hasDataChanged) {
      const timeoutId = setTimeout(() => {
        console.log("saving");

        localStorage.setItem(storageId, JSON.stringify(prevData.current));
        setHasDataChanged(false);
      }, delay);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [delay, hasDataChanged, storageId]);
}
