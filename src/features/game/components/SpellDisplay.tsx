import { useGameStore } from "../gameStore";

import convertWordToSpell from '@/utils/convertWordToSpell';

export default function SpellDisplay({ currentWord } : { currentWord: Word | null }) {
    const currentSpellingLetter = useGameStore(
            (state) => state.currentSpellingLetter,
        );
    
    const specialCharactersEnabled = useGameStore((state) => state.specialCharactersEnabled)

    return (
        <>
            {convertWordToSpell(currentWord?.word ?? 'Welcome').map(
                (item, index, array) => {
                    if (item.isSpecialCharacter && !specialCharactersEnabled) return;

                    return (
                        <span
                            className="font-[Fira_Code] italic"
                            key={`${item.letter}-${index}`}
                        >
                            <span
                                className={
                                    currentSpellingLetter === index
                                        ? 'font-bold text-3xl text-brand-7 p-2 bg-amber-700 rounded-full'
                                        : item.isSpecialCharacter
                                          ? 'text-fuchsia-400 font-bold'
                                          : ''
                                }
                            >
                                {item.spelling}
                            </span>

                            {index < array.length - 1 && '-'}
                        </span>
                    );
                },
            )}
        </>
    );
}