"use client";

import { useEffect, useState } from "react";

export const CurrentTime: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <time className="text-2xl font-semibold" suppressHydrationWarning>
      {currentTime.toLocaleString()}
    </time>
  );
};
