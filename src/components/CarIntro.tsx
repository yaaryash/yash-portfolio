import { useEffect, useState } from "react";
import { PROFILE } from "@/lib/profile";

const MESSAGE_PARTS: { text: string; className?: string }[] = [
  { text: "Welcome to " },
  { text: `${PROFILE.firstName}'s`, className: "text-yellow-500" },
  { text: " Portfolio Terminal" },
];

const FULL_MESSAGE = MESSAGE_PARTS.map((p) => p.text).join("");
const STEP_DELAY = 70;
const PUFF_SPAWN_INTERVAL = 80;
const PUFF_LIFESPAN = 700;

const CAR_EMOJIS = ["🏎️", "🚓", "🛻", "🚙", "🚗", "🚕"];

interface Puff {
  id: number;
}

export const CarLoop = () => {
  const [cycle, setCycle] = useState(0);
  const [revealedCount, setRevealedCount] = useState(0);
  const [puffs, setPuffs] = useState<Puff[]>([]);

  // Pick a car for this cycle — cycles through the list in order.
  // Swap to CAR_EMOJIS[Math.floor(Math.random() * CAR_EMOJIS.length)] for fully random instead of sequential.
  const currentCar = CAR_EMOJIS[cycle % CAR_EMOJIS.length];

  useEffect(() => {
    setRevealedCount(0);
    const stepInterval = setInterval(() => {
      setRevealedCount((prev) => {
        if (prev >= FULL_MESSAGE.length) {
          clearInterval(stepInterval);
          return prev;
        }
        return prev + 1;
      });
    }, STEP_DELAY);
    return () => clearInterval(stepInterval);
  }, [cycle]);

  useEffect(() => {
    let puffCounter = 0;
    const spawnInterval = setInterval(() => {
      puffCounter++;
      const id = puffCounter;
      setPuffs((prev) => [...prev, { id }]);
      setTimeout(() => {
        setPuffs((prev) => prev.filter((p) => p.id !== id));
      }, PUFF_LIFESPAN);
    }, PUFF_SPAWN_INTERVAL);
    return () => clearInterval(spawnInterval);
  }, [cycle]);

  useEffect(() => {
    const loopInterval = setInterval(() => setCycle((c) => c + 1), 5000);
    return () => clearInterval(loopInterval);
  }, []);

  let charsLeft = revealedCount;
  const isDone = revealedCount >= FULL_MESSAGE.length;

  return (
    <div
      key={cycle}
      className="mb-3 whitespace-nowrap text-lg md:text-xl"
      style={{ height: "1.8rem" }}
    >
      {MESSAGE_PARTS.map((part, i) => {
        const visible = part.text.slice(0, Math.max(0, charsLeft));
        charsLeft -= part.text.length;
        return (
          <span key={i} className={part.className}>
            {visible}
          </span>
        );
      })}

      <span className="relative inline-block" style={{ width: "1.4rem" }}>
        {!isDone &&
          puffs.map((puff) => (
            <span
              key={puff.id}
              className="absolute bottom-0 text-xs smoke-puff"
              style={{
                left: `${-4 - Math.random() * 8}px`,
                fontSize: `${10 + Math.random() * 6}px`,
              }}
            >
              💨
            </span>
          ))}
        <span className={`text-2xl ${isDone ? "invisible" : ""}`}>
          {currentCar}
        </span>
      </span>
    </div>
  );
};
