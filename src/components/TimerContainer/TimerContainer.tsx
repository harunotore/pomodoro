import { useDispatch, useSelector } from "react-redux";
import useTimer from "../../hooks/useTimer";
import { convertMinutesToMilliSeconds } from "../../utils/utils";
import Button from "../Button/Button";
import Timer from "../Timer/Timer";
import { update } from "../../slices/timerSlice";
import { useRef, useState } from "react";


export default function TimerContainer() {

    return (
        <div className="flex flex-col gap-8">
            <div>
                <Timer/>
            </div>
        </div >
    )
}