import { useState } from 'react';

interface TogglerOptions {
    className?: string;
    text: string;
    toggled: boolean;
    action?: (active: boolean) => void;
    defaultActive?: boolean;
}

export default function Toggler({
    action,
    className = '',
    text,
    toggled = false,
}: TogglerOptions) {
    const [active, setActive] = useState(toggled);

    const handleClick = () => {
        const newState = !active;

        setActive(newState);
        action?.(newState);
    };

    return (
        <div className="flex flex-row gap-4 items-center justify-between">
            <p>{text}</p>
            <button
                type="button"
                className={`
                relative
                h-8 w-14
                rounded-full
                p-1
                shadow-sm
                transition-colors duration-200
                ${active ? 'bg-brand-4' : 'bg-gray-300'}
                ${className}
            `}
                onClick={handleClick}
            >
                <div
                    className={`
                    aspect-square h-full
                    rounded-full
                    bg-white
                    shadow
                    transition-transform duration-200 ease-in-out
                    ${active ? 'translate-x-6' : 'translate-x-0'}
                `}
                />
            </button>
        </div>
    );
}
