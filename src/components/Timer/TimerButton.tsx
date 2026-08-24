import { useGameStore } from "@/features/game/gameStore";

interface TimerButtonProps {
    time: number;
    className?: string;
}

export default function TimerButton({
    time,
    className = '',
}: TimerButtonProps) {
    const selectedTimerTime = useGameStore((state) => state.selectedTimerTime);
    const timerActive = useGameStore((state) => state.timerActive);
    const currentSpellingLetter = useGameStore(
        (state) => state.currentSpellingLetter,
    );

    const setSelectedTimerTime = useGameStore(
        (state) => state.setSelectedTimerTime,
    );

    return (
        <button
            className={`
                min-w-16
                rounded-xl
                px-4 py-2
                text-sm font-bold
                transition-all duration-200
                hover:-translate-y-0.5
                hover:shadow-md
                active:translate-y-0
                ${
                    selectedTimerTime === time
                        ? 'bg-brand-4 text-white shadow-md scale-105'
                        : 'bg-brand-2 text-brand-8 hover:bg-brand-3'
                }
                ${className}
            `}
            disabled={timerActive || currentSpellingLetter !== null }
            onClick={() => setSelectedTimerTime(time)}
        >
            {time}s
        </button>
    );
}
