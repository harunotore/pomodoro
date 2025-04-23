import { useEffect, useRef, useState } from "react";
import { convertMinToMs, convertMsToMin } from "../../utils/utils";
import useTimer from "../../hooks/useTimer";
import { updateMode, updateTimeLeft } from "../../slices/timerSlice";
import { useDispatch } from "react-redux";
import { modeTypes } from "../../slices/timerSlice";
import clsx from "clsx";
import { ButtonMode } from "../ButtonMode/ButtonMode";

export default function TimerContainer() {
    const timer = useTimer()
    const dispatch = useDispatch()
    const [isActive, setIsActive] = useState(false)
    // const [autoStart, setAutoStart] = useState(false)
    const intervalRef = useRef<number | undefined>(undefined)
    // const clickPath = useRef(`/sounds/clicks/mouse-click.mp3`)
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const tickSoundRef = useRef<HTMLAudioElement | null>(null);
    // const lastSecondRef = useRef<number | null>(null);

    useEffect(() => {
        tickSoundRef.current = new Audio("/sounds/clicks/mouse-click.mp3");
        tickSoundRef.current.volume = 0.2;
    }, []);

    useEffect(() => {
        audioRef.current = new Audio("/sounds/clicks/ui-game-click.mp3");
        audioRef.current.volume = 0.5;
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
            const endTime = Date.now() + timer.timeLeft
            intervalRef.current = setInterval(() => intervalCallBack(endTime), 100)
        }
    }

    const intervalCallBack = (endTime: number) => {
        const distance = endTime - Date.now()
        // playTickSound(remainingTime)
        if (distance <= 0) {
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
            dispatch(updateTimeLeft(distance))
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

    const checkMode = (mode: string) => {
        switch (mode) {
            case modeTypes.pomodoroMode: {
                const ms = convertMinToMs(timer.pomodoroTimeInMinutes)
                console.log(ms)
                console.log(convertMsToMin(ms))

                dispatch(updateTimeLeft(convertMinToMs(timer.pomodoroTimeInMinutes)))
                break
            }
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
        <div className='font-arialrounded flex justify-center py-8'>
            <div className="flex flex-col border items-center rounded-xl py-12 px-12">
                <div className="flex gap-4">
                    <ButtonMode className={`${timer.mode === modeTypes.pomodoroMode && 'bg-blue-500'} `}
                        onClick={() => handleChangeMode(modeTypes.pomodoroMode)}>
                        Pomodoro
                    </ButtonMode>
                    <ButtonMode className={`${timer.mode === modeTypes.shortBreakMode && 'bg-green-500'}`}
                        onClick={() => handleChangeMode(modeTypes.shortBreakMode)}>
                        Short Break
                    </ButtonMode>
                    <ButtonMode className={`${timer.mode === modeTypes.longBreakMode && 'bg-purple-500'}`}
                        onClick={() => handleChangeMode(modeTypes.longBreakMode)}>
                        Long Break
                    </ButtonMode>
                </div>
                <div className="flex flex-col w-full items-center gap-4">
                    <div>
                        {timer.mode}
                    </div>
                    <TimeDisplay timeLeft={timer.timeLeft} />
                    <div>
                        <StartPauseButton className={`${isActive ? 'button-active' : 'button'}`}
                            onClick={() => handleStartStop()} isActive={isActive}>
                        </StartPauseButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface StartPauseButtonProps {
    onClick?: () => void
    isActive: boolean
    className: string
}

const StartPauseButton = ({ onClick, isActive, className }: StartPauseButtonProps) => {
    return (
        <button className={clsx(className)} onClick={onClick}>{isActive ? 'PAUSE' : 'START'}</button>
    )
}


function TimeDisplay({ timeLeft }: { timeLeft: number }) {
    const formatTime = (ms: number) => {
        console.log(timeLeft)
        const minutes = `${Math.floor(ms % (1000 * 60 * 60) / 60000)}`.padStart(2, '0');
        const seconds = `${Math.floor((ms % (1000 * 60)) / 1000)}`.padStart(2, '0');;
        return `${minutes}:${seconds}`
    }

    return (
        <div className="text-8xl w-full flex justify-center">{formatTime(timeLeft)}</div>
    )
}