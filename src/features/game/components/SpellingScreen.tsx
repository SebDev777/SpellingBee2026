import Item from '@/components/ui/Item';

import formatWord from '@/utils/formatWord';

import { MdRecordVoiceOver } from 'react-icons/md';
import { FaEnvelopeOpenText } from 'react-icons/fa';
import { BiHide } from 'react-icons/bi';

import { useGameStore } from '../gameStore';

import RollHistory from './RollHistory';

import { spellWord } from '@/utils/spellWord';

import SpellDisplay from './SpellDisplay';

import { SlotText } from 'slot-text/react';

import calcLevelDifficulty from '@/utils/calcLevelDifficulty';

interface SpellingScreenProps {
    startTimerFn: () => void;
}

export default function SpellingScreen({ startTimerFn }: SpellingScreenProps) {
    const currentWord = useGameStore((state) => state.currentWord);

    const spellingScreenHidden = useGameStore(
        (state) => state.spellingScreenHidden,
    );

    const startTimerAfterSpelling = useGameStore(
        (state) => state.startTimerAfterSpelling,
    );

    const setSpellingScreenHidden = useGameStore(
        (state) => state.setSpellingScreenHidden,
    );

    const formattedCurrentWord = currentWord
        ? formatWord(currentWord.word)
        : 'Welcome.';

    console.log(formattedCurrentWord.length);

    return (
        <section className="flex w-full max-w-xl flex-col items-center gap-5 rounded-4xl bg-white/90 p-4 shadow-xl shadow-brand-8/10 backdrop-blur-sm sm:gap-6 sm:p-8">
            <div className="flex w-full max-w-md items-center justify-center rounded-2xl border-2 border-dashed border-brand-7 bg-brand-6 px-3 py-3 text-2xl font-bold text-brand-8 sm:w-[80%] sm:py-4 sm:text-4xl">
                <p className="text-center">
                    Difficulty: {calcLevelDifficulty(formattedCurrentWord)}
                </p>
            </div>

            <div className="flex aspect-square w-full max-w-md flex-col items-center justify-center gap-3 rounded-3xl border-4 border-dashed border-brand-5/50 bg-brand-1 p-3 sm:gap-4 sm:p-6">
                <h1
                    className={`
                        mt-3
                        max-w-full
                        text-center
                        font-bold
                        tracking-tighter
                        text-gray-500
                        transition-all
                        duration-200
                        sm:mt-5
                        ${spellingScreenHidden ? 'opacity-0' : ''}
                        ${
                            formattedCurrentWord.length >= 10
                                ? 'text-4xl sm:text-5xl'
                                : 'text-5xl sm:text-7xl'
                        }
                    `}
                >
                    <SlotText
                        text={formattedCurrentWord}
                        className="max-w-full text-center"
                        options={{
                            direction: 'up',
                        }}
                    />
                </h1>

                <div
                    className={`
                        flex
                        flex-row
                        rounded-full
                        bg-brand-6
                        px-4
                        py-1.5
                        font-[Geist_Mono]
                        text-base
                        text-brand-8
                        transition-all
                        duration-200
                        sm:px-5
                        sm:py-2
                        sm:text-xl
                        ${spellingScreenHidden ? 'opacity-0' : ''}
                    `}
                >
                    <SpellDisplay currentWord={currentWord} />
                </div>

                <RollHistory />
            </div>

            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                <Item
                    className="bg-green-200 text-green-800"
                    text="Spell"
                    action={() => {
                        currentWord &&
                            spellWord(currentWord.word, () => {
                                console.log('Spell finalized');

                                if (startTimerAfterSpelling) {
                                    startTimerFn();
                                }
                            });
                    }}
                >
                    <MdRecordVoiceOver />
                </Item>

                <Item
                    className="bg-blue-200 text-blue-800"
                    text="Sentence (beta)"
                    action={() => {}}
                >
                    <FaEnvelopeOpenText />
                </Item>

                <Item
                    className="bg-red-200 text-red-800"
                    text="Hide"
                    action={() =>
                        setSpellingScreenHidden(!spellingScreenHidden)
                    }
                >
                    <BiHide />
                </Item>
            </div>
        </section>
    );
}