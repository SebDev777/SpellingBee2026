import type { ButtonHTMLAttributes } from 'react';

interface RoundedStyleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
}

export default function RoundedStyledButton({
    text,
    className = '',
    ...props
}: RoundedStyleButtonProps) {
    return (
        <button
            className={`
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
                px-8
                py-6
                text-center
                text-brand-8
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:shadow-md
                ${className}
            `}
            {...props}
        >
            {text}
        </button>
    );
}
