"use client";

import { useState, useEffect } from "react";

export function EarlyAdopterCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/waitlist/count")
      .then((res) => res.json())
      .then((data) => setCount(data.total ?? 0))
      .catch(() => setCount(0));
  }, []);

  if (count === null) return <span>early adopters</span>;
  return <span>{count}+ early adopters</span>;
}
