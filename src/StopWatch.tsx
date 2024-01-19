import React, { useEffect } from 'react'
import { useState } from 'react'
import StopWatchButton from './StopWatchButton';

function displayTimerValue(value:number) {
    return value.toString().padStart(2, "0")
}

function formatTime(time:number) {
    let milliseconds = time % 100;
    time = (time - milliseconds) / 100;
    let seconds = time % 60;
    time = (time - seconds) / 60;
    let minutes = time % 60;
    let hours = (time - minutes) / 60;

    return `${displayTimerValue(hours)}:${displayTimerValue(minutes)}:${displayTimerValue(seconds)}.${displayTimerValue(milliseconds)}`
}

export default function StopWatch() {
    const [time, setTime] = useState(0);
    const [active, setActive] = useState(false);

    const startClicked = () => {
        setActive(true);
    }

    useEffect(() => {
        let addTime: NodeJS.Timeout;
        if (active) {
            addTime = setInterval(() => setTime(time + 1), 10);
        }
        return () => clearInterval(addTime)
    }, [time, active]);

    return(
        <div>
            <p>{formatTime(time)}</p>
            <StopWatchButton startClicked={startClicked} buttonValue="start" />
        </div>
    )
}