import Toggler from '@/components/ui/Toggler';
import { useGameStore } from '@/features/game/gameStore';
import { useState } from 'react';
import toast from 'react-hot-toast';
import RoundedStyledButton from '@/components/ui/RoundedStyledButton';

const addWord = useGameStore.getState().addWord;
const cleanWordList = useGameStore.getState().cleanList;

const handleFile = async (
    file: File | undefined,
    setFileData: (file: File | undefined) => void,
) => {
    if (!file) return;

    const text = await file.text();

    const words = text
        .split(/\r?\n/)
        .map((word) => word.trim())
        .filter(Boolean);

    cleanWordList();
    setFileData(file);

    words.forEach((word) => addWord(word));

    toast.custom(
        (t) => (
            <div
                className={`
                    ${
                        t.visible
                            ? 'animate-in fade-in slide-in-from-top-2'
                            : 'animate-out fade-out slide-out-to-top-2'
                    }
                    w-80
                    rounded-2xl
                    border
                    border-brand-4/20
                    bg-white
                    p-4
                    shadow-xl
                `}
            >
                <div className="mb-3 flex items-center justify-between">
                    <div>
                        <p className="font-bold text-brand-8">Words imported</p>

                        <p className="text-sm text-brand-8/60">
                            {words.length} words added
                        </p>
                    </div>
                </div>

                <div className="max-h-100 overflow-y-auto rounded-xl bg-brand-1 p-3">
                    <div className="flex flex-wrap gap-2">
                        {[...words]
                            .sort((a, b) =>
                                a.localeCompare(b, undefined, {
                                    sensitivity: 'base',
                                }),
                            )
                            .map((word, index) => (
                                <span
                                    key={`${word}-${index}`}
                                    className="
                                        rounded-lg
                                        bg-brand-3
                                        px-2.5
                                        py-1
                                        text-sm
                                        font-semibold
                                        text-brand-8
                                    "
                                >
                                    {word}
                                </span>
                            ))}
                    </div>
                </div>
            </div>
        ),
        {
            duration: 2000,
        },
    );
};

const getFileFor = async (url: string): Promise<File> => {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Could not load file: ${url}`);
    }

    const blob = await response.blob();

    const fileName = url.split('/').pop() ?? 'file.txt';

    return new File([blob], fileName, {
        type: blob.type || 'text/plain',
    });
};

export default function WordConfig() {
    const startTimerAfterSpelling = useGameStore(
        (state) => state.startTimerAfterSpelling,
    );

    const specialCharactersEnabled = useGameStore(
        (state) => state.specialCharactersEnabled,
    );

    const setStartTimerAfterSpelling = useGameStore(
        (state) => state.setStartTimerAfterSpelling,
    );

    const setSpecialCharactersEnabled = useGameStore(
        (state) => state.setSpecialCharactersEnabled,
    );

    const [fileData, setFileData] = useState<File | undefined>();

    const importFile = async (file: File | undefined) => {
        await handleFile(file, setFileData);
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4 font-semibold">
            <Toggler
                text="Start timer after spelling"
                toggled={startTimerAfterSpelling}
                action={(active: boolean) => setStartTimerAfterSpelling(active)}
            />

            <Toggler
                text="Special characters enabled"
                toggled={specialCharactersEnabled}
                action={(active: boolean) =>
                    setSpecialCharactersEnabled(active)
                }
            />

            <div>
                <label
                    className="
                        group
                        flex
                        cursor-pointer
                        flex-col
                        items-center
                        justify-center
                        gap-2
                        rounded-2xl
                        border-2
                        border-dashed
                        border-brand-4/40
                        bg-brand-1
                        px-8
                        py-6
                        text-center
                        transition-all
                        duration-200
                        hover:-translate-y-0.5
                        hover:border-brand-4
                        hover:bg-brand-2
                        hover:shadow-md
                    "
                >
                    <input
                        type="file"
                        accept=".txt"
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files?.[0];

                            importFile(file);

                            // Permite seleccionar el mismo archivo otra vez
                            e.target.value = '';
                        }}
                    />

                    <span className="text-3xl transition-transform duration-200 group-hover:scale-110">
                        📄
                    </span>

                    <span className="font-bold text-brand-8">Import words</span>

                    <span className="text-sm text-brand-8/60">
                        {fileData
                            ? `Selected file: ${fileData.name}`
                            : 'Select a .txt file'}
                    </span>
                </label>

                {fileData && (
                    <RoundedStyledButton
                        text="Load words from selected file"
                        className="mt-4 bg-brand-6"
                        onClick={() => importFile(fileData)}
                    />
                )}
            </div>

            <div
                className="
                    flex
                    flex-col
                    items-center
                    justify-center
                    gap-4
                    rounded-2xl
                    border-2
                    border-dashed
                    border-brand-4/40
                    bg-brand-1
                    p-6
                    text-center
                "
            >
                <span className="font-bold text-brand-8">
                    Default templates:
                </span>

                <RoundedStyledButton
                    text="Load Spelling-bee Category A"
                    className="
                        bg-sky-200
                        text-sky-700
                        border-sky-800
                        hover:border-sky-900
                        hover:bg-sky-300
                    "
                    onClick={async () => {
                        const file = await getFileFor(
                            '/Lists/SpellingBee-CatA.txt',
                        );

                        importFile(file);
                    }}
                />

                <RoundedStyledButton
                    text="Load Spelling-bee Category B"
                    className="
                        bg-red-200
                        text-red-700
                        border-red-800
                        hover:border-red-900
                        hover:bg-red-300
                    "
                    onClick={async () => {
                        const file = await getFileFor(
                            '/Lists/SpellingBee-CatB.txt',
                        );

                        importFile(file);
                    }}
                />
            </div>
        </div>
    );
}
