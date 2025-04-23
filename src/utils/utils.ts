export const convertMinToMs = (minutes: number) => {
    const milliseconds = minutes * 60 * 1000;
    return milliseconds
}

export const convertSecondsToMilliseconds = (seconds: number) => {
    const milliseconds = seconds * 1000;
    return milliseconds
}

export const convertMsToMin = (ms: number) => {
    const minutes = ms / (60 * 1000);
    return minutes 
}