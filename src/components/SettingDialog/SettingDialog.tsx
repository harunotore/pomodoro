import { Settings } from "lucide-react";
import { Dialog } from "radix-ui";
import { Cross2Icon } from "@radix-ui/react-icons";
import styles from "./SettingDialog.module.css";
import useTimer from "../../hooks/useTimer";
import { useDispatch } from "react-redux";
import { modeTypes, updateLongBreakTime, updatePomodoroTime, updateShortBreakTime, updateTimeLeft } from "../../slices/timerSlice";
import { ChangeEvent } from "react";
import { convertMinToMs } from "../../utils/utils";

export default function SettingDialog() {
    const timer = useTimer()
    const dispatch = useDispatch()

    const handleUpdate = (e: ChangeEvent<HTMLInputElement>, mode: string) => {
        const min = Number(e.target.value)
        switch (mode) {
            case modeTypes.pomodoroMode:
                dispatch(updatePomodoroTime(min))
                break;
            case modeTypes.shortBreakMode:
                dispatch(updateShortBreakTime(min))
                break;
            case modeTypes.longBreakMode:
                dispatch(updateLongBreakTime(min))
                break;
        }

        const ms = convertMinToMs(min)
        if (timer.mode == mode) {
            dispatch(updateTimeLeft(ms))
        }
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <div className={"flex gap-2"}>
                    <span><Settings size={24}></Settings></span>
                    <span>Settings</span>
                </div>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className={styles.Overlay} />
                <Dialog.Content className={styles.Content}>
                    <Dialog.Title className={styles.Title}>Settings</Dialog.Title>
                    <Dialog.Description className={styles.Description}>
                        Editing your settings here
                    </Dialog.Description>
                    <div>
                        <div>Time (in minutes)</div>
                        <div className="flex justify-between gap-8">
                            <fieldset className={styles.Fieldset}>
                                <label className="flex-1">Pomodoro</label>
                                <input className={styles.InputNumber} type="number" pattern="[0-9]{1,5}" min={1}
                                    max={999} value={timer.pomodoroTimeInMinutes} onChange={(e) => handleUpdate(e, modeTypes.pomodoroMode)}></input>
                            </fieldset>
                            <fieldset className={styles.Fieldset}>
                                <label className="flex-1">Short Break</label>
                                <input className={styles.InputNumber} type="number" min={1}
                                    max={100} value={timer.shortBreakTimeInMinutes} onChange={(e) => handleUpdate(e, modeTypes.shortBreakMode)} ></input>
                            </fieldset>
                            <fieldset className={styles.Fieldset}>
                                <label className="flex-1">Long Break</label>
                                <input className={styles.InputNumber} type="number" min={1}
                                    max={100} value={timer.longBreakTimeInMinutes} onChange={(e) => handleUpdate(e, modeTypes.longBreakMode)}></input>
                            </fieldset>
                        </div>
                    </div>
                    <div className="flex mt-8 justify-end">
                        <Dialog.Close asChild>
                            <button className={`${styles.Button} green`}>Save changes</button>
                        </Dialog.Close>
                    </div>
                    <Dialog.Close asChild>
                        <button className={styles.IconButton} aria-label="Close">
                            <Cross2Icon />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>

    )
}
