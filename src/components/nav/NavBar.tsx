import HamburgerMenuIcon from "@/assets/lineIcons/hamburgerMenu.svg";
import Link from "next/link";
import LineIconButton from "@/components/LineIconButton";
import NavLink from "./NavLink";
import styles from './NavBar.module.sass'

type Props = {};

type NavLinks = {
    name: string;
    href: string;
};

const NavBar = (props: Props) => {
    const navLinks: NavLinks[] = [
        {
            name: "Home",
            href: "/",
        },
        {
            name: "Contact Us",
            href: "/contact",
        },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50`}>
            <div className={`flex items-center lg:grid grid-flow-col lg:grid-cols-3 h-14 px-3 py-2`}>
                <h1
                    className={`text-3xl text-amber-500 text-glow shadow-amber-500`}
                >
                    <Link href={`/`}>Dragon of Shuu</Link>
                </h1>

                <div className={`ml-4 gap-2 hidden md:flex justify-end lg:justify-center flex-grow`}>
                    {navLinks.map((l) => (
                        <NavLink
                            href={l.href}
                            text={l.name}
                            mobile={true}
                            key={l.name}
                        />
                    ))}
                </div>
                
                <div className={`md:hidden flex justify-end h-full flex-grow`}>
                    <LineIconButton
                        svg={HamburgerMenuIcon}
                        className={`w-14`}
                    />
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
