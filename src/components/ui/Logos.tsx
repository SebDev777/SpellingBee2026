import bee from '@/assets/bee.png';
import schoolLogo from '@/assets/schoolLogo.png';

export function BeeLogo() {
    return (
        <div className="bg-white w-fit rounded-3xl -rotate-12 p-1.5 sm:p-2 flex items-center justify-center border-2 sm:border-4 border-brand-7">
            <img
                src={bee}
                alt="Bee Logo"
                className="h-14 sm:h-20 w-auto object-contain"
            />
        </div>
    );
}

export function SchoolLogo() {
    return (
        <div className="bg-white w-28 h-28 sm:w-44 sm:h-44 rounded-full p-2 flex items-center justify-center border-4 border-brand-7">
            <img
                src={schoolLogo}
                alt="School Logo"
                className="max-w-full max-h-full object-contain"
            />
        </div>
    );
}