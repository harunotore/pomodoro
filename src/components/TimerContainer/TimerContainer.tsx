import { useEffect, useRef, useState } from "react";
import Timer from "../Timer/Timer";
import Button from "../Button/Button";
import { convertSecondsToMilliseconds } from "../../utils/utils";

export default function TimerContainer() {
    const [pomolength, setPomoLength] = useState(3)
    const [shortbreaklength, setShortbreaklength] = useState(5)
    const [longbreaklength, setLongBreakLength] = useState(10 * 60)
    const [isActive, setIsActive] = useState(false)
    const [mode, setMode] = useState('pomo')
    const [autoStart, setAutoStart] = useState(false)

    const [timeLeft, setTimeLeft] = useState(convertSecondsToMilliseconds(pomolength))
    const intervalRef = useRef<null | number>(null)
    const startRef = useRef<null | number>(null)

    useEffect(() => {
        if (mode === 'short break') {
            setTimeLeft(convertSecondsToMilliseconds(shortbreaklength))
        } else if (mode === 'pomo') {
            setTimeLeft(convertSecondsToMilliseconds(pomolength))
        }
    }, [mode])

    useEffect(() => {
        if (autoStart) {
            console.log('reseting')
            console.log(isActive)
            handleStart();
            setAutoStart(false);
        }
    }, [autoStart]);

    useEffect(() => {
        return () => clearInterval(intervalRef.current!);
    }, []);

    const handleStart = () => {
        if (!isActive) {
            console.log('handlingStart')
            setIsActive(true)
            startRef.current = Date.now()
            intervalRef.current = setInterval(() => {
                const delta = Date.now() - startRef.current!
                const newRemaining = (timeLeft - delta)
                if (newRemaining <= 0) {
                    //checkmode and switch
                    if (mode === 'pomo') {
                        setMode('short break')
                    } else if (mode === 'short break') {
                        setMode('pomo')
                    }
                    clearInterval(intervalRef.current)
                    setTimeLeft(0)
                    setIsActive(false)
                } else {
                    setTimeLeft(timeLeft - delta)
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
        //reset on dependant on mode
        setTimeLeft(convertSecondsToMilliseconds(pomolength))
        setAutoStart(true)
    }

    return (
        <div className="flex flex-col gap-8">
            <div>
                {mode}
                <TimeDisplay timeLeft={timeLeft} />
                <Button onClick={() => handleStart()}>Start</Button>
                <Button onClick={() => handleStop()}>Stop</Button>
                <Button onClick={() => handleReset()}>Reset</Button>
            </div>
        </div >
    )
}

function TimeDisplay({ timeLeft }: { timeLeft: number }) {
    const formatTime = (ms: number) => {
        const minutes = `${Math.floor(ms / 60000)}`.padStart(2, '0');
        const seconds = `${Math.floor((ms % 60000) / 1000)}`.padStart(2, '0');;
        return `${minutes} :${seconds}`
    }

    return (
        <div className="">{formatTime(timeLeft)}</div>
    )
}