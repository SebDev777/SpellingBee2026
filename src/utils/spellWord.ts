import { useGameStore } from "@/features/game/gameStore";

let spellController: AbortController | null = null;

export async function spellWord(word: string, onCompletedCallback?: () => void) {
    // Cancela el spell anterior
    const setCurrentSpellingLetter = useGameStore.getState().setCurrentSpellingLetter;
    const playBackSpeed = useGameStore.getState().playBackSpeed;

    spellController?.abort();

    const controller = new AbortController();
    spellController = controller;

    for (const [index, letter] of word.toLowerCase().split("").entries()) {
        if (controller.signal.aborted) return;

        setCurrentSpellingLetter(index);
        const audio = new Audio(`/pronunciation/${letter}.mp3`);

        await new Promise<void>((resolve) => {
            if (controller.signal.aborted) {
                resolve();
                return;
            }


            audio.onloadedmetadata = () => {
                audio.playbackRate = 1 * playBackSpeed;

                const adjustedDuration = audio.duration / audio.playbackRate;
                const time = adjustedDuration * 1000 * 0.65;

                audio.play();

                setTimeout(() => {
                    resolve();
                }, time);
            };


            audio.onerror = () => resolve();

            controller.signal.addEventListener(
                'abort',
                () => {
                    audio.pause();
                    audio.currentTime = 0;
                    resolve();
                },
                { once: true },
            );
        });

        if (controller.signal.aborted) return;
    }

    if (onCompletedCallback) {
        onCompletedCallback();
    }

    setCurrentSpellingLetter(null);
}
