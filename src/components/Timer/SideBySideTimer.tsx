import React, { useState, useEffect, useRef } from "react";

export default function SideBySideTimer({ totalTime = 10000 }) {
  // ---------- Version A (stale state) ----------
  const [timeA, setTimeA] = useState(totalTime);
  const intervalARef = useRef(null);
  const startARef = useRef(null);
  const [runningA, setRunningA] = useState(false);

  const handleStartA = () => {
    if (runningA) return;
    startARef.current = Date.now();
    intervalARef.current = setInterval(() => {
      const elapsed = Date.now() - startARef.current;
      setTimeA(timeA - elapsed); // ❌ uses stale timeA
    }, 100);
    setRunningA(true);
  };

  const handleStopA = () => {
    clearInterval(intervalARef.current);
    setRunningA(false);
  };

  // ---------- Version B (ref + Date.now) ----------
  const [timeB, setTimeB] = useState(totalTime);
  const intervalBRef = useRef(null);
  const startBRef = useRef(null);
  const savedTimeBRef = useRef(totalTime);
  const [runningB, setRunningB] = useState(false);

  const handleStartB = () => {
    if (runningB) return;
    startBRef.current = Date.now();
    intervalBRef.current = setInterval(() => {
      const elapsed = Date.now() - startBRef.current;
      const newRemaining = savedTimeBRef.current - elapsed;
      if (newRemaining <= 0) {
        clearInterval(intervalBRef.current);
        setTimeB(0);
        setRunningB(false);
      } else {
        setTimeB(newRemaining);
      }
    }, 100);
    setRunningB(true);
  };

  const handleStopB = () => {
    clearInterval(intervalBRef.current);
    savedTimeBRef.current = timeB;
    setRunningB(false);
  };

  const format = (ms) => {
    const sec = Math.floor(ms / 1000);
    const msLeft = Math.floor((ms % 1000) / 100);
    return `${sec}s ${msLeft * 100}ms`;
  };

  return (
    <div style={{ display: "flex", gap: "3rem", padding: "2rem" }}>
      {/* Version A */}
      <div>
        <h3>❌ Version A — Stale State</h3>
        <div>{format(timeA)}</div>
        <button onClick={handleStartA}>Start</button>
        <button onClick={handleStopA}>Stop</button>
      </div>

      {/* Version B */}
      <div>
        <h3>✅ Version B — Ref + Date.now()</h3>
        <div>{format(timeB)}</div>
        <button onClick={handleStartB}>Start</button>
        <button onClick={handleStopB}>Stop</button>
      </div>
    </div>
  );
}
