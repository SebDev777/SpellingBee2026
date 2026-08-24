import formatWord from '@/utils/formatWord';

import { useGameStore } from '@/features/game/gameStore';

import convertWordToSpell from '@/utils/convertWordToSpell';

export default function RollHistory() {
    const rollHistory = useGameStore((state) => state.rollHistory);

    return (
        <ul className="w-full min-w-0 space-y-2 px-2 sm:px-4">
            {rollHistory.length === 0 ? (
                <p className="flex items-center justify-center rounded-xl bg-red-300/30 px-2 py-1 text-center text-sm font-semibold sm:text-base">
                    No history avaiable
                </p>
            ) : (
                [...rollHistory].reverse().map((word, index) => (
                    <li
                        key={`${word.word}-${index}`}
                        className="w-full min-w-0"
                    >
                        <div
                            className={`w-full min-w-0 rounded-lg px-2 py-1.5 transition-all duration-500 ease-in-out sm:px-4 sm:py-2 ${
                                index === 0 ? 'bg-brand-7' : 'bg-brand-3'
                            }`}
                        >
                            <div className="flex w-full min-w-0 items-center justify-between gap-2">
                                <div className="flex min-w-0 flex-1 items-center gap-2">
                                    <div className="shrink-0 text-sm sm:text-base">
                                        {index + 1}
                                    </div>

                                    <p className="min-w-0 truncate text-sm sm:text-base">
                                        {formatWord(word.word)}
                                    </p>
                                </div>

                                <p className="min-w-0 shrink text-right text-xs italic sm:text-base">
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
