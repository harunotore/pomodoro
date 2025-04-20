import { useRef, useState } from "react"
import Button from "../Button/Button"
import { convertMinutesToMilliSeconds } from "../../utils/utils"
import useTimer from "../../hooks/useTimer"
import { useDispatch } from "react-redux"
import { update } from "../../slices/timerSlice"

export default function Timer() {
  const timer = useTimer()
  const dispatch = useDispatch()
  const timeInMilliseconds = convertMinutesToMilliSeconds(timer.timeInMinutes)

  const [remainingTime, setRemainingTime] = useState(timeInMilliseconds)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef<number>(null!)
  const startTimeRef = useRef<number>(null!)
  const saveTimeRef = useRef(timeInMilliseconds)

  const handleStart = () => {
    if (!isRunning) {
      startTimeRef.current = Date.now()
      intervalRef.current = setInterval(() => {
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

  const formatTime = (ms: number) => {
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const handleUpdate = (timerLength: number) => {
    dispatch(update(timerLength))
    const updateTime = convertMinutesToMilliSeconds(timerLength)
    clearInterval(intervalRef.current);
    setRemainingTime(updateTime)
    saveTimeRef.current = updateTime;
    setIsRunning(false);
  }

  const handleClick = () => {
    if (isRunning) {
      handlePause()
    } else {
      handleStart()
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-8">
        <div className="flex gap-4">
          <Button onClick={() => handleUpdate(25)}>Pomodoro</Button>
          <Button onClick={() => handleUpdate(5)}>Short Break</Button>
          <Button onClick={() => handleUpdate(10)}>Long Break</Button>
        </div>
      </div >

      <div className="text-8xl">
        {formatTime(remainingTime)}
      </div>

      <div>
        <Button className='bg-red-500' onClick={handleClick}>{isRunning ? 'stop' : 'start'}</Button>
      </div>
    </div>
  )
}