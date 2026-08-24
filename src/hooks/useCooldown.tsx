import { useState } from 'react';

export function useCooldown(duration: number) {
    const [cooldown, setCooldown] = useState(false);

    const startCooldown = () => {
        if (cooldown) return false;

        setCooldown(true);

        setTimeout(() => {
            setCooldown(false);
        }, duration);

        return true;
    };

    return {
        cooldown,
        startCooldown,
    };
}
