import type { ReactNode } from "react";

interface RoundedButtonProps {
    className?: string;
    action?: () => void;
    disabled?: boolean;
    children?: ReactNode;
}

export default function RoundedButton({
    className = '',
    action,
    disabled = false,
    children,
}: RoundedButtonProps) {
    return (
        <button
            className={`
                rounded-full
                px-5 py-2.5
                text-sm font-bold
                shadow-sm
                transition-all duration-200
                hover:-translate-y-0.5
                hover:shadow-md
                active:translate-y-0
                ${className}
            `}
            disabled={disabled}
            onClick={action}
        >
            {children}
        </button>
    );
}
