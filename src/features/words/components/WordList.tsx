import Controls from './Controls';
import { useGameStore } from '@/features/game/gameStore';
import WordItem from './WordItem';

// TODO: fix word list key & rendering

export default function WordList() {
    const wordList = useGameStore((state) => state.wordList);
    const removeWord = useGameStore((state) => state.removeWord);

    return (
        <div className="w-md max-h-[80vh] rounded-xl bg-white p-4 flex flex-col gap-4">
            <Controls />

            <div className="max-h-[65vh] overflow-y-auto overflow-x-hidden rounded-xl border-4 border-dashed border-brand-4 p-4">
                <ul className="space-y-2">
                    {[...wordList]
                        .sort((a, b) =>
                            a.word.localeCompare(b.word, undefined, {
                                sensitivity: 'base',
                            }),
                        )
                        .map((item, index) => (
                            <WordItem
                                key={`${item.id}-${index}-${item.word}`}
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
