import { useEffect, useRef, useState } from "react"
//
//remaing time in miloseconds
export default function Timer({ totalTime = 10000 }) {
    const [remainingTime, setRemainingTime] = useState(totalTime);
    const [isRunning, setIsRunning] = useState(false);

    const intervalRef = useRef(null);
    const startTimeRef = useRef(null)

    const handleStart = () => {
        startTimeRef.current = Date.now()

        if (!isRunning) {
            intervalRef.current = setInterval(() => {
                console.log("In interval:", remainingTime); // 🔥 stays the same
                const difference = Date.now() - startTimeRef.current
                const newRemainingTime = remainingTime - difference
                if (newRemainingTime <= 0) {
                    clearInterval(intervalRef.current)
                    setRemainingTime(0)
                } else {
                    setRemainingTime(newRemainingTime)
                }
            }, 10)
        }
        setIsRunning(true);
    }

    const handlePause = () => {
        clearInterval(intervalRef.current)
        setIsRunning(false);
    }

    const handleReset = () => {
        clearInterval(intervalRef.current);
        setRemainingTime(totalTime)
        setIsRunning(false);
    }

    const formatTime = (ms) => {
        const hours = Math.floor(
            (ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        )
        const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((ms % (1000 * 60)) / 1000);
        const milliseconds = Math.floor((ms % 1000) / 10); // hundredths

        return `${minutes}:${seconds.toString().padStart(2, "0")}.${milliseconds
            .toString()
            .padStart(2, "0")}`;
    }

    return (
        <div>
            <div>
                {formatTime(remainingTime)}
            </div>
            <button onClick={handleStart}>start</button>
            <button onClick={handlePause}>stop</button>

        </div>
    )
}