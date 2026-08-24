import formatWord from "@/utils/formatWord";
import { useGameStore } from '@/features/game/gameStore';
import convertWordToSpell from "@/utils/convertWordToSpell";

export default function RollHistory() {
    const rollHistory = useGameStore((state) => state.rollHistory);
    console.log(rollHistory)
    return (
        <ul className="w-full px-4 space-y-2">
            {rollHistory.length === 0 ? (
                <p className="flex items-center justify-center font-semibold bg-red-300/30 rounded-xl">
                    No history avaiable
                </p>
            ) : (
                [...rollHistory].reverse().map((word, index) => (
                    <li key={`${word.word}-${index}`}>
                        <div
                            className={`rounded-lg bg-brand-3 px-4 py-2 transition-all duration-500 ease-in-out ${index === 0 ? 'bg-brand-7' : 'bg-brand-3'}`}
                        >
                            <div className="flex flex-row justify-between">
                                <div className="flex items-center justify-start gap-4">
                                    <div className="">{index + 1}</div>
                                    <p>{formatWord(word.word)}</p>
                                </div>
                                <p className="italic">
                                    {convertWordToSpell(word.word).map(
                                        (item, index, array) => (
                                            <span
                                                key={`${item.letter}-${index}`}
                                            >
                                                {item.spelling}
                                                {index < array.length - 1 &&
                                                    '-'}
                                            </span>
                                        ),
                                    )}
                                </p>
                            </div>
                        </div>
                    </li>
                ))
            )}
        </ul>
    );
}