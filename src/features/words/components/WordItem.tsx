import formatWord from "@/utils/formatWord";
import { useState } from "react";
import { FaTrashAlt } from 'react-icons/fa';

interface WordItemProps {
    id: number;
    word: string;
    onDelete: (id: number) => void;
}

export default function WordItem({ id, word, onDelete }: WordItemProps) {
    const [removing, setRemoving] = useState(false);

    return (
        <li
            className={`
                overflow-hidden
                transition-all duration-500 ease-in-out
                ${
                    removing
                        ? 'max-h-0 translate-x-full opacity-0 m-0 p-0'
                        : 'max-h-20 translate-x-0 opacity-100'
                }
            `}
            onTransitionEnd={() => {
                if (removing) {
                    onDelete(id);
                }
            }}
        >
            <div className="rounded-lg bg-brand-3 px-4 py-2 hover:bg-brand-7 transition-all duration-500 ease-in-out">
                <div className="flex items-center justify-between">
                    <p>{formatWord(word)}</p>

                    <button
                        className="
                            w-fit rounded-full bg-red-400 p-2
                            text-white
                            transition-all duration-200
                            hover:-translate-y-0.5
                            hover:bg-red-500
                        "
                        onClick={() => setRemoving(true)}
                    >
                        <FaTrashAlt />
                    </button>
                </div>
            </div>
        </li>
    );
}
