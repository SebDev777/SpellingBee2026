import WordConfig from '@/features/words/components/WordConfig';
import WordList from '@/features/words/components/WordList';

export default function Config() {
    return (
        <div className="flex min-h-dvh min-w-dvw flex-col items-center justify-center gap-4 lg:flex-row">
            <div className="flex h-[80dvh] w-full max-w-md flex-col items-center rounded-xl bg-white p-4">
                <h1 className="mb-4 text-2xl font-bold">WordList</h1>

                <WordList />
            </div>

            <div className="flex h-fit w-full max-w-md flex-col items-center rounded-xl bg-white p-4">
                <WordConfig />
            </div>
        </div>
    );
}