import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function useTimer() {
    const timer = useSelector((state: RootState) => state.timer)
    return timer
}