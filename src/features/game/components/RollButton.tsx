import { useCooldown } from "@/hooks/useCooldown";

import { useGameStore } from "@/features/game/gameStore";

export default function RollButton() {
    const { cooldown, startCooldown } = useCooldown(1000);
    const rollWord = useGameStore((state) => state.rollWord);
    const currentSpellingLetter = useGameStore((state) => state.currentSpellingLetter);

    const handleRoll = () => {
        if (!startCooldown()) return;

        console.log('ROLL');
        rollWord();

        console.log('ROLL BUTTON:', useGameStore.getState().rollHistory);
    };

    const isDisabled = cooldown || currentSpellingLetter !== null;

    return (
        <button
            className="
                group
                w-full
                rounded-2xl
                bg-brand-4
                px-8 py-6
                text-5xl font-bold
                text-brand-1
                shadow-[0_6px_0_#d5aa17]
                transition-all duration-150
                hover:-translate-y-1
                hover:shadow-[0_8px_0_#d5aa17]
                active:translate-y-1
                active:shadow-[0_2px_0_#d5aa17]
            "

            disabled={isDisabled}
            onClick={handleRoll}
        >
            <span className="transition-transform duration-200 group-hover:scale-105">
                {isDisabled ? '...' : 'ROLL!'}
            </span>
        </button>
    );
}