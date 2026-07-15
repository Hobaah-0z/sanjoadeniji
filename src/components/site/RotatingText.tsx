import { useEffect, useState } from "react";

type Props = {
  words: string[];
  interval?: number;
};

export function RotatingText({
  words,
  interval = 5000,
}: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [interval, words.length]);

  return (
    <span className="block">
      {words[index]}
    </span>
  );
}