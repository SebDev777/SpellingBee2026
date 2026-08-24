import { useGameStore } from "@/features/game/gameStore";
//import toast from "react-hot-toast";

const addWord = useGameStore.getState().addWord;
const cleanWordList = useGameStore.getState().cleanList;

export const handleFile = async (
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
};

/* 
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
*/

export const getFileFor = async (url: string): Promise<File> => {
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