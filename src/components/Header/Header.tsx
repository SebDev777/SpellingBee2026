import { BeeLogo, SchoolLogo } from '../ui/Logos';
import NavItem from './NavItem';

export default function Header() {
    return (
        <header className="w-full flex flex-col items-center border-b-8 border-b-brand-4 bg-brand-1 p-4 gap-6 sm:gap-10">
            {/* Logos */}
            <div className="flex items-center justify-center gap-6">
                <BeeLogo />
                <SchoolLogo />
            </div>

            {/* Título */}
            <div className="flex flex-col items-center justify-center text-center">
                <h1 className="text-4xl sm:text-6xl text-yellow-400 mb-3 sm:mb-6 font-[Pacifico]">
                    Spelling Bee Contest
                </h1>

                <p className="text-sm sm:text-base">
                    Welcome to the{' '}
                    <span className="font-bold text-amber-600">
                        Spelling Bee Contest 2026!
                    </span>{' '}
                    - A wonderful and fun event made with love.
                </p>

                <p className="text-sm sm:text-base">
                    <span className="font-bold text-sky-500">Hosted by:</span>{' '}
                    <span className="font-semibold">
                        Mg. Adela Gaona Moscoso
                    </span>
                </p>
            </div>

            {/* Navegación */}
            <div className="flex flex-row gap-2">
                <NavItem path="settings" />
                <NavItem />
            </div>
        </header>
    );
}