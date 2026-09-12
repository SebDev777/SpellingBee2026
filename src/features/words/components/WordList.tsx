import { useMemo } from 'react';

import Controls from './Controls';
import WordItem from './WordItem';
import { useGameStore } from '@/features/game/gameStore';

export default function WordList() {
    const wordList = useGameStore((state) => state.wordList);
    const removeWord = useGameStore((state) => state.removeWord);

    const sortedWordList = useMemo(() => {
        return [...wordList].sort((a, b) =>
            a.word.localeCompare(b.word, undefined, {
                sensitivity: 'base',
            }),
        );
    }, [wordList]);

    return (
        <div className="flex w-md max-h-[80vh] flex-col gap-4 rounded-xl bg-white p-4">
            <Controls />

            <div className="max-h-[65vh] overflow-x-hidden overflow-y-auto rounded-xl border-4 border-dashed border-brand-4 p-4">
                <ul className="space-y-2">
                    {sortedWordList.map((item) => (
                        <WordItem
                            key={item.id}
                            id={item.id}
                            word={item.word}
                            onDelete={removeWord}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
}