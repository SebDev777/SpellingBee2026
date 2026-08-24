import SpellingScreen from '@/features/game/components/SpellingScreen';

import TimerDisplay from '@/components/Timer/TimerDisplay';
import TimerButton from '@/components/Timer/TimerButton';
import RollButton from '@/features/game/components/RollButton';
import RoundedButton from '@/components/ui/RoundedButton';

import { useTimer } from '@/hooks/useTimer';
import { useGameStore } from '@/features/game/gameStore';
import { useEffect } from 'react';

// Icons
import { CiPlay1 } from 'react-icons/ci';
import { CiPause1 } from 'react-icons/ci';
import { LuTimerReset } from 'react-icons/lu';

const TimerSound = new Audio('/TimerSound.mp3');

export default function Main() {
    const selectedTimerTime = useGameStore((state) => state.selectedTimerTime);

    const currentSpellingLetter = useGameStore(
        (state) => state.currentSpellingLetter,
    );

    const timerOptions = useGameStore((state) => state.timerOptions);

    const setTimerActive = useGameStore((state) => state.setTimerActive);

    const setTimerTime = useGameStore((state) => state.setTimerTime);

    const { time, running, start, addTime, pause, restart } =
        useTimer(selectedTimerTime);

    const isHardTime = time >= 0 && time <= 15;

    useEffect(() => {
        setTimerTime(time);
    }, [time]);

    useEffect(() => {
        setTimerActive(running);

        if (running && TimerSound.paused) {
            TimerSound.play();
        } else {
            TimerSound.pause();
        }
    }, [running]);

    return (
        <div className="flex-1">
            <main>
                <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-6 sm:gap-12 sm:px-8 sm:py-10 lg:flex-row">
                    {/* Spelling */}
                    <div className="flex w-full flex-1 justify-center">
                        <SpellingScreen startTimerFn={start} />
                    </div>

                    {/* Controls */}
                    <div className="flex w-full max-w-md flex-1 flex-col gap-6">
                        {/* Timer */}
                        <section className="rounded-4xl bg-white/90 p-4 shadow-xl shadow-brand-8/10 backdrop-blur-sm sm:p-6">
                            <div className="flex flex-col items-center gap-5">
                                {/* Display */}
                                <div
                                    className={`flex w-full items-center justify-center rounded-2xl border-2 border-dashed py-8 transition-all duration-600 ease-in-out ${
                                        isHardTime
                                            ? 'border-red-400 bg-red-100'
                                            : 'border-brand-7 bg-brand-6'
                                    }`}
                                >
                                    <TimerDisplay />
                                </div>

                                {/* Timer presets */}
                                <div className="flex w-full justify-center gap-2">
                                    {timerOptions.map((timeOption) => (
                                        <TimerButton
                                            key={timeOption}
                                            time={timeOption}
                                        />
                                    ))}
                                </div>

                                {/* Controls */}
                                <div className="flex flex-wrap justify-center gap-2">
                                    <RoundedButton
                                        className="bg-green-200 text-green-800"
                                        action={start}
                                        disabled={
                                            currentSpellingLetter !== null
                                        }
                                    >
                                        <CiPlay1 />
                                    </RoundedButton>

                                    <RoundedButton
                                        className="bg-gray-200 text-gray-700"
                                        action={pause}
                                        disabled={
                                            currentSpellingLetter !== null
                                        }
                                    >
                                        <CiPause1 />
                                    </RoundedButton>

                                    <RoundedButton
                                        className="bg-red-200 text-red-800"
                                        action={restart}
                                        disabled={
                                            currentSpellingLetter !== null
                                        }
                                    >
                                        <LuTimerReset />
                                    </RoundedButton>

                                    <RoundedButton
                                        className="bg-sky-200 text-sky-800"
                                        action={() => addTime(5)}
                                        disabled={
                                            currentSpellingLetter !== null
                                        }
                                    >
                                        +5
                                    </RoundedButton>

                                    <RoundedButton
                                        className="bg-sky-200 text-sky-800"
                                        action={() => addTime(-5)}
                                        disabled={
                                            currentSpellingLetter !== null
                                        }
                                    >
                                        -5
                                    </RoundedButton>
                                </div>
                            </div>
                        </section>

                        {/* Roll */}
                        <section className="rounded-4xl bg-white/90 p-4 shadow-xl shadow-brand-8/10 backdrop-blur-sm sm:p-6">
                            <RollButton />
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}
