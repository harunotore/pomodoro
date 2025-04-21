import { useEffect, useRef, useState } from "react";
import Button from "../Button/Button";
import { convertMinutesToMilliSeconds } from "../../utils/utils";
import useTimer from "../../hooks/useTimer";
import { updateMode, updateTimeLeft } from "../../slices/timerSlice";
import { useDispatch } from "react-redux";
import { modeTypes } from "../../slices/timerSlice";

//testing 
export default function TimerContainer() {
    const timer = useTimer()
    const dispatch = useDispatch()
    const [isActive, setIsActive] = useState(false)

    // const [autoStart, setAutoStart] = useState(false)
    const intervalRef = useRef<number | undefined>(undefined)
    const endTimeRef = useRef<number | undefined>(undefined)

    useEffect(() => {
        return () => clearInterval(intervalRef.current!);
    }, []);

    const handleStart = () => {
        if (!isActive) {
            setIsActive(true)
            endTimeRef.current = Date.now() + timer.timeLeft
            intervalRef.current = setInterval(() => {
                if (endTimeRef.current != undefined) {
                    const remainingTime = endTimeRef.current - Date.now()
                    if (remainingTime <= 0) {
                        //checkmode and switch but also set time 
                        if (timer.mode === modeTypes.pomodoroMode) {
                            dispatch(updateMode(modeTypes.shortBreakMode))
                            dispatch(updateTimeLeft(convertMinutesToMilliSeconds(timer.shortBreakTimeInMinutes)))
                        } else if (timer.mode === modeTypes.shortBreakMode) {
                            dispatch(updateMode(modeTypes.pomodoroMode))
                            dispatch(updateTimeLeft(convertMinutesToMilliSeconds(timer.pomodoroTimeInMinutes)))
                        }
                        clearInterval(intervalRef.current)
                        setIsActive(false)
                    } else {
                        dispatch(updateTimeLeft(remainingTime))
                    }
                }

            }, 100)
        }
    }

    const handleStop = () => {
        setIsActive(false)
        clearInterval(intervalRef.current)
    }


    const handleReset = () => {
        setIsActive(false)
        clearInterval(intervalRef.current)
        checkMode()
        // setAutoStart(true)
    }

    const checkMode = () => {
        if (timer.mode === modeTypes.pomodoroMode) {
            dispatch(updateTimeLeft(convertMinutesToMilliSeconds(timer.pomodoroTimeInMinutes)))
        } else if (timer.mode === modeTypes.shortBreakMode) {
            dispatch(updateTimeLeft(convertMinutesToMilliSeconds(timer.shortBreakTimeInMinutes)))
        }
    }
    
    const handleChangeMode = (mode: string) => {
        setIsActive(false)
        dispatch(updateMode(mode))
        clearInterval(intervalRef.current)
        
    }

    return (
        <div className="flex flex-col gap-8">
            <div>
                <Button onClick={() => handleChangeMode(modeTypes.pomodoroMode)}>Pomodoro</Button>
                <Button onClick={() => handleChangeMode(modeTypes.shortBreakMode)}>Short Break</Button>
                <Button onClick={() => handleChangeMode(modeTypes.longBreakMode)}>Long Break</Button>

            </div>
            <div>
                {timer.mode}
                <TimeDisplay timeLeft={timer.timeLeft} />
                <Button onClick={() => handleStart()}>Start</Button>
                <Button onClick={() => handleStop()}>Stop</Button>
                <Button onClick={() => handleReset()}>Reset</Button>
            </div>
        </div >
    )
}

function TimeDisplay({ timeLeft }: { timeLeft: number }) {
    const formatTime = (ms: number) => {
        const minutes = `${Math.floor(ms % (1000*60*60)/ 60000)}`.padStart(2, '0');
        const seconds = `${Math.floor((ms % (1000 * 60)) / 1000)}`.padStart(2, '0');;
        return `${minutes} :${seconds}`
    }

    return (
        <div className="">{formatTime(timeLeft)}</div>
    )
}