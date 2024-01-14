import React, { useEffect, useRef, useState } from "react";

export default function useTimer(initPeriodInSeconds) {
    const timerRef = useRef(null);
    const [time, setTime] = useState(initPeriodInSeconds);

    function resetTimer() {
        clearInterval(timerRef.current);
        setTime(initPeriodInSeconds);
    }

    useEffect(() => {
        // if (time === initPeriodInSeconds) {
            timerRef.current = setInterval(() => {
                setTime(sec => {
                    if (sec <= 1) {
                        clearInterval(timerRef.current);
                        return 0;
                    }
                    return sec - 1;
                });
            }, 1000);
        // }
        
        return () => clearInterval(timerRef.current);
    }, [time, initPeriodInSeconds]);

    return [time, resetTimer];
}
