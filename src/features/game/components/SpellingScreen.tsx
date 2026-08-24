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

export default function SpellingScreen({ startTimerFn } : SpellingScreenProps ) {
    const currentWord = useGameStore((state) => state.currentWord);
    const spellingScreenHidden = useGameStore((state) => state.spellingScreenHidden)
    const startTimerAfterSpelling = useGameStore(
        (state) => state.startTimerAfterSpelling,
    );

    const setSpellingScreenHidden = useGameStore((state) => state.setSpellingScreenHidden)

    const formattedCurrentWord = currentWord ? formatWord(currentWord.word) : 'Welcome.'
console.log(formattedCurrentWord.length)

    return (
        <section className="flex w-full max-w-xl flex-col items-center gap-6 rounded-4xl bg-white/90 p-8 shadow-xl shadow-brand-8/10 backdrop-blur-sm">
            <div className="flex w-[80%] items-center justify-center rounded-2xl bg-brand-6 py-4 border-dashed border-2 border-brand-7 text-4xl font-bold text-brand-8">
                <p>Difficulty: {calcLevelDifficulty(formattedCurrentWord)}</p>
            </div>

            <div className="flex aspect-square w-full max-w-md flex-col items-center justify-center gap-4 rounded-3xl border-4 border-dashed border-brand-5/50 bg-brand-1">
                <h1
                    className={`
                        text-center
                        mt-5
                        tracking-tighter
                        font-bold
                        text-gray-500
                        transition-all
                        duration-200
                        ${spellingScreenHidden ? 'opacity-0' : ''}
                        ${formattedCurrentWord.length >= 10 ? 'text-5xl' : 'text-7xl'}
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
                    className={`rounded-full bg-brand-6 px-5 py-2 font-[Geist_Mono] text-xl text-brand-8 flex flex-row transition-all duration-200 ${spellingScreenHidden && 'opacity-0'}`}
                >
                    <SpellDisplay currentWord={currentWord} />
                </div>

                <RollHistory />
            </div>

            <div className="flex flex-wrap justify-center gap-3">
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