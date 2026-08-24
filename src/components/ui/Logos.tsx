import bee from '@/assets/bee.png';
import schoolLogo from '@/assets/schoolLogo.png';

export function BeeLogo() {
    return (
        <div className="bg-white rounded-3xl -rotate-12 p-2 flex items-center justify-center border-4 border-brand-7">
            <img src={bee} alt="Bee Logo" className="w-fit h-20" />
        </div>
    );
}

export function SchoolLogo() {
    return (
        <div className="bg-white rounded-full p-2 flex items-center justify-center border-4 border-brand-7">
            <img src={schoolLogo} alt="School Logo" className="w-fit h-40" />
        </div>
    );
}
