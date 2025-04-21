import { useEffect, useRef, useState } from "react";
import Button from "../Button/Button";
import { convertMinToMs } from "../../utils/utils";
import useTimer from "../../hooks/useTimer";
import { updateMode, updateTimeLeft } from "../../slices/timerSlice";
import { useDispatch } from "react-redux";
import { modeTypes } from "../../slices/timerSlice";

export default function TimerContainer() {
    const timer = useTimer()
    const dispatch = useDispatch()
    const [isActive, setIsActive] = useState(false)
    // const [autoStart, setAutoStart] = useState(false)
    const intervalRef = useRef<number | undefined>(undefined)
    const endTimeRef = useRef<number | undefined>(undefined)
    // const clickPath = useRef(`/sounds/clicks/mouse-click.mp3`)
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const tickSoundRef = useRef<HTMLAudioElement | null>(null);
    // const lastSecondRef = useRef<number | null>(null);

    useEffect(() => {
        tickSoundRef.current = new Audio("/sounds/clicks/mouse-click.mp3");
        tickSoundRef.current.volume = 0.2;
    }, []);


    useEffect(() => {
        audioRef.current = new Audio("/sounds/clicks/light-switch.mp3");
        audioRef.current.volume = 0.1;
    }, [])

    const playSound = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    }

    useEffect(() => {
        return () => clearInterval(intervalRef.current);
    }, []);

    const handleStart = () => {
        if (!isActive) {
            setIsActive(true)
            endTimeRef.current = Date.now() + timer.timeLeft
            intervalRef.current = setInterval(() => {
                if (endTimeRef.current != undefined) {
                    const remainingTime = endTimeRef.current - Date.now()
                    // playTickSound(remainingTime)
                    if (remainingTime <= 0) {
                        if (timer.mode === modeTypes.pomodoroMode) {
                            dispatch(updateMode(modeTypes.shortBreakMode))
                            dispatch(updateTimeLeft(convertMinToMs(timer.shortBreakTimeInMinutes)))
                        } else if (timer.mode === modeTypes.shortBreakMode) {
                            dispatch(updateMode(modeTypes.pomodoroMode))
                            dispatch(updateTimeLeft(convertMinToMs(timer.pomodoroTimeInMinutes)))
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

    // const _playTickSound = (remainingTime: number) => {
    //     const currentSecond = Math.floor(remainingTime / 1000);
    //     if (lastSecondRef.current !== currentSecond && currentSecond >= 0) {
    //         lastSecondRef.current = currentSecond;
    //         tickSoundRef.current?.play();
    //     }
    // }

    const handleStop = () => {
        setIsActive(false)
        clearInterval(intervalRef.current)
    }

    const handleReset = () => {
        setIsActive(false)
        clearInterval(intervalRef.current)
        checkMode(timer.mode)
    }

    const checkMode = (mode: string) => {
        switch (mode) {
            case modeTypes.pomodoroMode:
                dispatch(updateTimeLeft(convertMinToMs(timer.pomodoroTimeInMinutes)))
                break
            case modeTypes.shortBreakMode:
                dispatch(updateTimeLeft(convertMinToMs(timer.shortBreakTimeInMinutes)))
                break
            case modeTypes.longBreakMode:
                dispatch(updateTimeLeft(convertMinToMs(timer.longBreakTimeInMinutes)))
                break
            default:
        }
    }

    const handleChangeMode = (mode: string) => {
        handleStop()
        dispatch(updateMode(mode))
        checkMode(mode)
    }

    const handleStartStop = () => {
        playSound()
        if (isActive) {
            handleStop()
        } else {
            handleStart()
        }
    }

    return (
        <div className='flex justify-center py-8'>
            <div className="flex flex-col border items-center rounded-xl py-12 px-12">
                <div className="flex gap-4">
                    <button className={`${timer.mode === modeTypes.pomodoroMode && 'border'}`} onClick={() => handleChangeMode(modeTypes.pomodoroMode)}>Pomodoro</button>
                    <button className={`${timer.mode === modeTypes.shortBreakMode && 'border'}`} onClick={() => handleChangeMode(modeTypes.shortBreakMode)}>Short Break</button>
                    <button className={`${timer.mode === modeTypes.longBreakMode && 'border'}`} onClick={() => handleChangeMode(modeTypes.longBreakMode)}>Long Break</button>
                </div>
                <div className="flex flex-col w-full items-center gap-4">
                    <div>{timer.mode}</div>
                    <TimeDisplay timeLeft={timer.timeLeft} />
                    <div className="">
                        <Button className='pushable ' onClick={() => handleStartStop()}><span className={`front ${isActive && 'pushableactive'}`}>{isActive ? 'PAUSE' : 'START'}</span></Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function TimeDisplay({ timeLeft }: { timeLeft: number }) {
    const formatTime = (ms: number) => {
        const minutes = `${Math.floor(ms % (1000 * 60 * 60) / 60000)}`.padStart(2, '0');
        const seconds = `${Math.floor((ms % (1000 * 60)) / 1000)}`.padStart(2, '0');;
        return `${minutes}:${seconds}`
    }

    return (
        <div className="text-8xl w-full flex justify-center">{formatTime(timeLeft)}</div>
    )
}