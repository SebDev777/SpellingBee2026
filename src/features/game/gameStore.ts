import toast from 'react-hot-toast';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const defaultWordList = [
    { id: 1, word: 'apple' },
    { id: 2, word: 'banana' },
    { id: 3, word: 'cherry' },
    { id: 4, word: 'elephant' },
    { id: 5, word: 'giraffe' },
    { id: 6, word: 'honey' },
    { id: 7, word: 'butterfly' },
    { id: 8, word: 'sunflower' },
    { id: 9, word: 'rainbow' },
    { id: 10, word: 'adventure' },
];

export const useGameStore = create<GameState>()(
    persist(
        (set) => ({
            // Word state management
            wordList: defaultWordList,
            rollHistory: [],
            // Controls timer states
            selectedTimerTime: 25,
            timerTime: 25,
            timerOptions: [10, 15, 20, 25, 30],
            timerActive: false,
            // Controls screen states
            spellingScreenHidden: false,
            currentSpellingLetter: null,
            currentWord: null,
            // Game states / config
            specialCharactersEnabled: false,
            startTimerAfterSpelling: false,
            playBackSpeed: 1,

            //-------------------- Word management
            addWord: (word) =>
                set((state) => ({
                    wordList: [
                        ...state.wordList,
                        {
                            id: Date.now(),
                            word,
                        },
                    ],
                })),

            removeWord: (id) =>
                set((state) => ({
                    wordList: state.wordList.filter((word) => word.id !== id),
                })),

            resetList: () =>
                set(() => ({
                    wordList: defaultWordList,
                })),
            
            cleanList: () =>
                set(() => ({
                    wordList: []
                })),

            resetHistory: () =>
                set(() => ({
                    rollHistory: [],
                })),

            rollWord: () =>
                set((state) => {
                    if (state.wordList.length === 0) {
                        toast.error('No words available. Go to settings.');
                        return state;
                    }

                    const availableWords = state.wordList.filter(
                        (word) =>
                            !state.rollHistory.some(
                                (historyWord) => historyWord.id === word.id,
                            ),
                    );

                    // Si todas las palabras están en el historial,
                    // permitimos volver a elegir cualquiera.
                    const pool =
                        availableWords.length > 0
                            ? availableWords
                            : state.wordList;

                    const random =
                        pool[Math.floor(Math.random() * pool.length)];

                    return {
                        currentWord: random,
                        rollHistory: [...state.rollHistory, random].slice(-5),
                    };
                }),

            //-------------------- Timer states
            setTimerActive: (toggle: boolean) =>
                set(() => ({
                    timerActive: toggle
                })),

            setSelectedTimerTime: (time: number) =>
                set((state) => ({
                    selectedTimerTime: time,
                    timerTime: state.timerActive ? state.timerTime : time
                })),

            setTimerTime: (time: number) =>
                set(() => ({
                    timerTime: time
                })),

            addTimerOption: (time: number) =>
                set((state) => ({
                    timerOptions: [
                        ...state.timerOptions,
                        time
                    ]
                })),

            //-------------------- SpellingScreen states
            setSpellingScreenHidden: (toggle: boolean) =>
                set(() => ({
                    spellingScreenHidden: toggle
                })),

            setCurrentSpellingLetter: (letter: number | null) =>
                set(() => ({
                    currentSpellingLetter: letter
                })),


            //-------------------- Game variables
            setPlayBackSpeed: (speed: number) =>
                set(() => ({
                    playBackSpeed: speed
                })),

            setStartTimerAfterSpelling: (toggle: boolean) =>
                set(() => ({
                    startTimerAfterSpelling: toggle
                })),

            setSpecialCharactersEnabled: (toggle: boolean) =>
                set(() => ({
                    specialCharactersEnabled: toggle
                }))
        }),
        {
            name: 'spelling-bee-storage',
        },
    ),
);
