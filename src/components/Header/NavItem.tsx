import formatWord from "@/utils/formatWord";
import { NavLink } from "react-router-dom";

interface Props {
    path?: string
}

export default function NavItem({ path } : Props) {
    return (
        <NavLink
            to={`/${path ? path : ""}`}
            end
            className={({ isActive }) =>
                `item font-bold bg-gray-900 justify-self-start ${
                    isActive ? 'text-brand-4' : 'text-white'
                }`
            }
        >
            {path ? formatWord(path) : "Game"}
        </NavLink>
    );
}