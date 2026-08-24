import { BeeLogo, SchoolLogo } from "../ui/Logos";
import NavItem from "./NavItem";

export default function Header() {
    return (
        <header className="w-full h-full flex items-center justify-center gap-12 p-4 border-b-8 border-b-brand-4 bg-brand-1 py-10">
            <div className="flex flex-row gap-2">
                <NavItem path={"settings"} />
                <NavItem />
            </div>
            <BeeLogo />
            <div className="flex flex-col items-center justify-center text-center">
                <h1 className="text-6xl text-yellow-400 mb-6 font-[Pacifico]">
                    Spelling Bee Contest
                </h1>
                <p>
                    Welcome to the{' '}
                    <span className="font-bold text-amber-600">
                        Spelling Bee Contest 2026!
                    </span>{' '}
                    - A wonderful and fun event made with love.
                </p>
                <p>
                    <span className="font-bold text-sky-500">Hosted by:</span>{' '}
                    <span className="font-semibold">
                        Mg. Adela Gaona Moscoso
                    </span>
                </p>
            </div>
            <SchoolLogo />
        </header>
    );
}