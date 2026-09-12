import { memo, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

import formatWord from '@/utils/formatWord';

interface WordItemProps {
    id: number;
    word: string;
    onDelete: (id: number) => void;
}

function WordItem({ id, word, onDelete }: WordItemProps) {
    const [removing, setRemoving] = useState(false);

    const handleRemove = () => {
        setRemoving(true);
    };

    const handleTransitionEnd = (
        event: React.TransitionEvent<HTMLLIElement>,
    ) => {
        // Evita ejecutar onDelete por transiciones de elementos hijos
        if (event.target !== event.currentTarget) return;

        if (removing) {
            onDelete(id);
        }
    };

    return (
        <li
            className={`
                overflow-hidden
                transition-[max-height,transform,opacity]
                duration-500
                ease-in-out
                ${
                    removing
                        ? 'max-h-0 translate-x-full opacity-0'
                        : 'max-h-20 translate-x-0 opacity-100'
                }
            `}
            onTransitionEnd={handleTransitionEnd}
        >
            <div className="rounded-lg bg-brand-3 px-4 py-2 transition-colors duration-200 hover:bg-brand-7">
                <div className="flex items-center justify-between">
                    <p>{formatWord(word)}</p>

                    <button
                        type="button"
                        className="
                            w-fit rounded-full bg-red-400 p-2
                            text-white
                            transition-[transform,background-color]
                            duration-200
                            hover:-translate-y-0.5
                            hover:bg-red-500
                        "
                        onClick={handleRemove}
                        disabled={removing}
                    >
                        <FaTrashAlt />
                    </button>
                </div>
            </div>
        </li>
    );
}

export default memo(WordItem);
