import type { ReactNode } from "react";

interface ItemProps {
    text: string;
    className?: string;
    children?: ReactNode;
    action?: () => void;
}

export default function Item({ children, text, className = '', action }: ItemProps) {
    return (
        <button
            className={`
                flex items-center gap-2
                rounded-full
                px-4 py-2
                text-sm font-semibold
                shadow-sm
                transition-all duration-200
                hover:-translate-y-0.5
                hover:shadow-md
                active:translate-y-0
                ${className}
            `}
            onClick={action}
        >
            {children}
            <span>{text}</span>
        </button>
    );
}
