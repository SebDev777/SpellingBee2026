import { useEffect, useState } from 'react';

const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

export function useTimer(initialTime: number) {
    const [time, setTime] = useState(initialTime);
    const [running, setRunning] = useState(false);

    useEffect(() => {
        if (!running) {
            setTime(initialTime);
        }
    }, [initialTime]);

    useEffect(() => {
        if (!running || time <= 0) {
            if (time <= 0) {
                setRunning(false);
            }

            return;
        }

        const interval = setInterval(() => {
            setTime((current) => current - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [running, time]);

    const start = () => {
        if (time <= 0) {
            setTime(initialTime);
        }

        setRunning(true);
    };

    const pause = () => {
        setRunning(false);
    };

    const restart = () => {
        setTime(initialTime);
        setRunning(false);
    };

    const addTime = (adTime: number) => {
        const afterCalc = time + adTime;
        setTime(clamp(afterCalc, 0, Infinity));
    }

    return {
        time,
        running,
        addTime,
        start,
        pause,
        restart,
    };
}
