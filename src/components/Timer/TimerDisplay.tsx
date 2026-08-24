import { useGameStore } from '@/features/game/gameStore';
import { SlotText } from 'slot-text/react';

import bee from '@/assets/bee.png';
import { useEffect } from 'react';

export default function TimerDisplay() {
    const timerTime = useGameStore((state) => state.timerTime);

    const timeOut = timerTime <= 0;
    const almostTimeOut = timerTime > 0 && timerTime <= 3;

    useEffect(() => {
        if (timeOut) {
            const audio = new Audio("/BellRing2.mp3")
            audio.play()
        }
    }, [timeOut])

    return (
        <div className="relative flex h-24 items-center justify-center">
            <h1
                className={`
            absolute font-bold tracking-tight
            transition-all duration-300 text-brand-8 flex flex-row gap-4 items-center
            ${timeOut ? 'scale-90 opacity-0' : almostTimeOut ? 'text-orange-400' : 'scale-100 opacity-100'}
        `}
                style={{
                    fontSize: almostTimeOut
                        ? `${4.5 + (4 - timerTime) * 0.5}rem`
                        : '4.5rem',
                }}
            >
                <div className="">
                    {
                        <SlotText
                            text={String(timerTime).padStart(2, '0')}
                            options={{
                                direction: 'up',
                            }}
                        />
                    }
                    <span className="text-3xl text-brand-8">s</span>
                </div>

                {almostTimeOut && (
                    <img
                        className={`
                        h-20 w-fit
                        transition-all
                        duration-700
                        ease-out
                        ${
                            almostTimeOut
                                ? 'translate-x-0 scale-100 opacity-100'
                                : 'translate-x-8 scale-75 opacity-0'
                        }
                    `}
                        src={bee}
                        alt=""
                    />
                )}
            </h1>

            <SlotText
                className={`
                    text-5xl font-bold tracking-tight text-red-400
                    transition-all duration-300
                    ${timeOut ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}
                `}
                text={'TIME OUT!'}
                options={{
                    direction: 'up',
                }}
            />
        </div>
    );
}
