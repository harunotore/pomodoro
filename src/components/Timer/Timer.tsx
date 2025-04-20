import { useEffect, useRef, useState } from "react"
import clsx from "clsx"

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}
const Button = ({ children, onClick, className }: ButtonProps) => {
  return (
    <button className={clsx('py-4 px-8 bg-blue-500 ', className)} onClick={onClick}>
      {children}
    </button>
  )
}

export default function Timer({ totalTime = 10000 }) {
  const [remainingTime, setRemainingTime] = useState(totalTime);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef(null);
  const startTimeRef = useRef(null)
  const saveTimeRef = useRef(totalTime)

  const handleStart = () => {
    startTimeRef.current = Date.now()
    if (!isRunning) {
      intervalRef.current = setInterval(() => {
        console.log(saveTimeRef.current)
        const difference = Date.now() - startTimeRef.current
        const newRemainingTime = saveTimeRef.current - difference
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
    saveTimeRef.current = remainingTime
    setIsRunning(false);
  }

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setRemainingTime(totalTime)
    saveTimeRef.current = totalTime;
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
      <div className="text-8xl">
        {formatTime(remainingTime)}
      </div>
      <div>
        <Button className='bg-red-500' onClick={handleStart}>start</Button>
        <Button onClick={handlePause}>stop</Button>
      </div>
    </div>
  )
}