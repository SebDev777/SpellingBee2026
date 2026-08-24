interface Word {
    id: number;
    word: string;
}

interface GameState {
    // Word state management
    wordList: Word[];
    rollHistory: Word[]

    addWord: (word: string) => void;
    resetList: () => void;
    resetHistory: () => void;
    removeWord: (id: number) => void;
    rollWord: () => void;
    cleanList: () => void;

     // Controls timer states
    selectedTimerTime: number;
    timerTime: number;
    timerActive: boolean;
    timerOptions: number[];

    setTimerTime: (time: number) => void;
    setTimerActive: (toggle: boolean) => void
    setSelectedTimerTime: (time: number) => void
    addTimerOption: (time: number) => void

     // Controls screen states
    currentSpellingLetter: number | null;
    currentWord: Word | null;
    spellingScreenHidden: boolean;

    setSpellingScreenHidden: (toggle: boolean) => void;
    setCurrentSpellingLetter: (letter: number | null) => void;
    // Voice speed
    playBackSpeed: number;
    startTimerAfterSpelling: boolean;
    specialCharactersEnabled: boolean;

    setSpecialCharactersEnabled: (toggle: boolean) => void;
    setStartTimerAfterSpelling: (toggle: boolean) => void;
    setPlayBackSpeed: (speed: number) => void;
}