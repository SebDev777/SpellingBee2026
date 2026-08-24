import RoundedButton from '@/components/ui/RoundedButton';
import { useGameStore } from '@/features/game/gameStore';


export default function Controls() {
    const resetList = useGameStore((state) => state.resetList);
    const wordList = useGameStore((state) => state.wordList);

    return (
        <div className="flex flex-col gap-4 items-center justify-center font-semibold">
            <p>Total words: {wordList.length}</p>
            <RoundedButton
                className="bg-red-400 text-white"
                action={resetList}
            >
                Reset List
            </RoundedButton>
        </div>
    );
}